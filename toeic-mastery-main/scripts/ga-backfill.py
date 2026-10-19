#!/usr/bin/env python3
"""Replay real page views from nginx access logs into a GA4 property via the
Measurement Protocol, for a window the property missed (e.g. the linked
destination G-CCTBJ73HK1 wasn't receiving hits).

Only real log lines are sent: one page_view per HTML page request, visitors
keyed by IP + User-Agent, sessions split on 30 minutes of inactivity. GA4 only
accepts timestamps up to 72 hours old.

Usage (on the VPS, stdlib only):
  python3 ga-backfill.py --from "2026-10-16 00:00" --to "2026-10-17 00:00" \
      /var/log/nginx/access.log /var/log/nginx/access.log.1          # dry run: prints a summary
  ... --validate   # sends a sample to GA's debug endpoint and prints its verdict
  ... --send       # actually sends

Env: GA4_LINKED_API_SECRET (Measurement Protocol API secret of the target stream).
Pass only the window the property was really missing, otherwise visits it did
record get counted twice.
"""
import argparse, gzip, hashlib, json, os, re, sys, time, urllib.error, urllib.parse, urllib.request
from datetime import datetime, timedelta, timezone

MEASUREMENT_ID = "G-CCTBJ73HK1"
SITE = "https://toeicmastery.click"
SESSION_GAP = timedelta(minutes=30)
MAX_AGE = timedelta(hours=72)

# nginx "combined" log format.
LINE = re.compile(
    r'(?P<ip>\S+) \S+ \S+ \[(?P<time>[^\]]+)\] "(?P<method>\S+) (?P<path>\S+) [^"]*" '
    r'(?P<status>\d{3}) \S+ "(?P<ref>[^"]*)" "(?P<ua>[^"]*)"'
)
SKIP_PATH = re.compile(r"^/(_next|api|static|uploads|favicon|robots\.txt|sitemap|manifest|apple-touch|icon)|\.[a-z0-9]{2,5}(\?|$)", re.I)
# "zalo" alone is NOT a bot marker: Zalo's in-app browser (a big share of Vietnamese
# visitors who open a shared link) carries that word too. Only its link-preview
# fetcher is skipped.
BOT_UA = re.compile(r"bot|crawl|spider|slurp|curl|wget|python|go-http|java/|headless|lighthouse|monitor|uptime|preview|facebookexternalhit|zalo.*(link|preview)", re.I)


def read_lines(paths):
    for p in paths:
        opener = gzip.open if p.endswith(".gz") else open
        with opener(p, "rt", encoding="utf-8", errors="replace") as f:
            yield from f


def parse(paths, start, end):
    hits = []
    for line in read_lines(paths):
        m = LINE.match(line)
        if not m or m["method"] != "GET" or m["status"] not in ("200", "304"):
            continue
        # Next.js client-side navigations fetch RSC payloads, not pages.
        if "_rsc=" in m["path"] or SKIP_PATH.search(m["path"]) or BOT_UA.search(m["ua"]):
            continue
        t = datetime.strptime(m["time"], "%d/%b/%Y:%H:%M:%S %z")
        if start <= t < end:
            hits.append((t, m["ip"], m["ua"], m["path"], m["ref"]))
    hits.sort()
    return hits


def build_events(hits):
    """Group hits into visitors and sessions; returns (client_id, ip, ua, event) tuples."""
    out, last_seen, session = [], {}, {}
    for t, ip, ua, path, ref in hits:
        key = hashlib.sha256(f"{ip}|{ua}".encode()).hexdigest()
        # GA client ids look like "<random>.<first-seen seconds>".
        client_id = f"{int(key[:8], 16)}.{int(key[8:16], 16) % 10**10}"
        prev = last_seen.get(key)
        if prev is None or t - prev > SESSION_GAP:
            session[key] = int(t.timestamp())
        last_seen[key] = t
        params = {
            "page_location": SITE + path,
            "session_id": session[key],
            "engagement_time_msec": 1,
        }
        if ref and ref != "-" and not ref.startswith(SITE):
            params["page_referrer"] = ref
        out.append((client_id, ip, ua, {
            "name": "page_view",
            "params": params,
            "timestamp_micros": int(t.timestamp() * 1_000_000),
        }))
    return out


def post(url, payload):
    # Never raises: a failed batch is reported and skipped, so the run always
    # finishes (callers retry only on a non-zero exit, which would resend).
    req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status, r.read().decode() or ""
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode(errors="replace")
    except Exception as e:
        return 599, str(e)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("logs", nargs="+", help="nginx access logs (.gz ok)")
    ap.add_argument("--from", dest="start", required=True, help='"YYYY-MM-DD HH:MM", in --tz')
    ap.add_argument("--to", dest="end", required=True, help='"YYYY-MM-DD HH:MM", exclusive, in --tz')
    ap.add_argument("--tz", default="+07:00", help="offset of --from/--to (default +07:00, Vietnam)")
    mode = ap.add_mutually_exclusive_group()
    mode.add_argument("--validate", action="store_true", help="send a sample to the debug endpoint")
    mode.add_argument("--send", action="store_true", help="really send")
    a = ap.parse_args()

    tz = datetime.strptime(a.tz, "%z").tzinfo
    start = datetime.strptime(a.start, "%Y-%m-%d %H:%M").replace(tzinfo=tz)
    end = datetime.strptime(a.end, "%Y-%m-%d %H:%M").replace(tzinfo=tz)
    oldest_ok = datetime.now(timezone.utc) - MAX_AGE + timedelta(minutes=10)
    if start < oldest_ok:
        sys.exit(f"--from is older than 72h; GA4 would drop these hits. Earliest allowed: {oldest_ok.astimezone(tz):%Y-%m-%d %H:%M}")

    events = build_events(parse(a.logs, start, end))
    visitors = {c for c, *_ in events}
    sessions = {(c, e["params"]["session_id"]) for c, _, _, e in events}
    print(f"{len(events)} page views, {len(sessions)} sessions, {len(visitors)} visitors in {start:%Y-%m-%d %H:%M} - {end:%Y-%m-%d %H:%M}")
    # A quick sanity look at what is about to be replayed.
    from collections import Counter
    top_ua = Counter(ua[:70] for _, _, ua, _ in events).most_common(4)
    top_pages = Counter(e["params"]["page_location"].replace(SITE, "") or "/" for _, _, _, e in events).most_common(5)
    print("  top browsers:", "; ".join(f"{n}× {u}" for u, n in top_ua))
    print("  top pages:   ", "; ".join(f"{n}× {p}" for p, n in top_pages))
    if not (a.validate or a.send):
        print("Dry run. Add --validate to check with GA, then --send.")
        return

    secret = os.environ.get("GA4_LINKED_API_SECRET") or sys.exit("Set GA4_LINKED_API_SECRET.")
    host = "https://www.google-analytics.com/" + ("debug/mp/collect" if a.validate else "mp/collect")
    url = f"{host}?measurement_id={MEASUREMENT_ID}&api_secret={urllib.parse.quote(secret)}"

    # One request per visitor-batch of up to 25 events (MP limit), carrying the
    # visitor's real IP and UA so GA derives location and device as it would live.
    by_client = {}
    for c, ip, ua, e in events:
        by_client.setdefault(c, (ip, ua, []))[2].append(e)
    batches = [(c, ip, ua, evs[i:i + 25]) for c, (ip, ua, evs) in by_client.items() for i in range(0, len(evs), 25)]
    if a.validate:
        batches = batches[:3]

    sent = 0
    for c, ip, ua, evs in batches:
        payload = {"client_id": c, "ip_override": ip, "user_agent": ua, "events": evs}
        status, body = post(url, payload)
        if a.validate:
            print(status, body)
        elif status >= 300:
            print(f"HTTP {status} for {c}: {body}", file=sys.stderr)
        else:
            sent += len(evs)
        time.sleep(0.05)
    if a.send:
        print(f"Sent {sent}/{len(events)} page views.")


if __name__ == "__main__":
    main()
