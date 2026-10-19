#!/usr/bin/env bash
# Bù lại lượt xem trang bị mất của G-CCTBJ73HK1 (18/10 00:00 → 19/10 08:00, giờ VN)
# bằng cách đẩy lại các lượt xem THẬT trong log nginx. Chạy TRÊN VPS, từ thư mục app:
#
#     bash scripts/ga-backfill-run.sh
#
# Bị từ chối quyền đọc /var/log/nginx?  →  sudo -E bash scripts/ga-backfill-run.sh
#
# Làm lần lượt: tìm khoá → tìm log → chạy thử (không gửi) → hỏi Google xem dữ liệu
# có hợp lệ không → hỏi bạn xác nhận → gửi thật. Chỉ gửi được MỘT lần (có file đánh dấu),
# vì gửi hai lần sẽ làm số bị đếm đôi.
#
# Khoá (Measurement Protocol API secret của luồng G-CCTBJ73HK1) lấy theo thứ tự:
#   1. biến môi trường GA4_LINKED_API_SECRET đã có sẵn,
#   2. dòng GA4_LINKED_API_SECRET=... trong file .env của app,
#   3. nếu không có thì hỏi bạn dán vào (gõ không hiện chữ, không lưu vào lịch sử).
# Khoá không bao giờ được in ra màn hình hay ghi vào file nào.
#
# Tuỳ chọn:  --from "YYYY-MM-DD HH:MM"   --to "YYYY-MM-DD HH:MM"   --yes (bỏ bước hỏi)
#            --force (cho phép gửi lại dù đã gửi rồi: chỉ dùng khi chắc chắn lần trước không gửi được gì)
set -euo pipefail

cd "$(dirname "$0")/.."
FROM="2026-10-18 00:00"
TO="2026-10-19 08:00"
ASSUME_YES=0
FORCE=0
while [ $# -gt 0 ]; do
  case "$1" in
    --from) FROM="$2"; shift 2 ;;
    --to) TO="$2"; shift 2 ;;
    --yes) ASSUME_YES=1; shift ;;
    --force) FORCE=1; shift ;;
    *) echo "Tham số lạ: $1" >&2; exit 2 ;;
  esac
done

command -v python3 >/dev/null || { echo "Không tìm thấy python3 trên VPS." >&2; exit 1; }

MARKER="$HOME/.ga-backfill-cctbj.done"
LOGFILE="$HOME/ga-backfill-cctbj.log"
if [ -e "$MARKER" ] && [ "$FORCE" -ne 1 ]; then
  echo "Đã gửi bù rồi ($(cat "$MARKER" 2>/dev/null | head -1)). Gửi thêm sẽ làm số bị đếm đôi." >&2
  echo "Nếu chắc chắn lần trước chưa gửi được gì: chạy lại với --force." >&2
  exit 1
fi

# --- 1. Khoá ---------------------------------------------------------------
SECRET="${GA4_LINKED_API_SECRET:-}"
if [ -z "$SECRET" ] && [ -f .env ]; then
  # Chỉ lấy đúng một dòng, không "source" cả .env (giá trị khác có thể chứa ký tự đặc biệt).
  SECRET="$(grep -E '^[[:space:]]*GA4_LINKED_API_SECRET=' .env | tail -1 | cut -d= -f2- | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' -e "s/^[\"']//" -e "s/[\"']\$//")"
fi
case "$SECRET" in replace-with-*) SECRET="" ;; esac   # giá trị mẫu trong .env.example
if [ -z "$SECRET" ]; then
  echo "Chưa thấy GA4_LINKED_API_SECRET trong môi trường hoặc file .env."
  printf "Dán khoá Measurement Protocol của G-CCTBJ73HK1 (gõ không hiện chữ): "
  read -rs SECRET
  echo
fi
[ -n "$SECRET" ] || { echo "Không có khoá, dừng." >&2; exit 1; }
export GA4_LINKED_API_SECRET="$SECRET"

# --- 2. Log nginx ----------------------------------------------------------
LOGDIR="${NGINX_LOG_DIR:-/var/log/nginx}"
LOGS=()
for f in access.log.3.gz access.log.2.gz access.log.1 access.log; do
  [ -e "$LOGDIR/$f" ] && LOGS+=("$LOGDIR/$f")
done
[ ${#LOGS[@]} -gt 0 ] || { echo "Không tìm thấy access.log nào trong $LOGDIR (đặt NGINX_LOG_DIR nếu log ở chỗ khác)." >&2; exit 1; }
for f in "${LOGS[@]}"; do
  [ -r "$f" ] || { echo "Không đọc được $f — chạy lại bằng: sudo -E bash scripts/ga-backfill-run.sh" >&2; exit 1; }
done
echo "Log sẽ đọc: ${LOGS[*]}"
echo "Khoảng thời gian bù: $FROM  →  $TO  (giờ Việt Nam)"
echo

# --- 3. Chạy thử -----------------------------------------------------------
echo "=== BƯỚC 1/3: chạy thử (chưa gửi gì) ==="
python3 scripts/ga-backfill.py --from "$FROM" --to "$TO" "${LOGS[@]}"
echo
echo "So sánh với GA4: số khách ở đây nên cùng cỡ số người dùng ngày 18/10 của G-GDBZE58K1G (~70-80)."
echo

# --- 4. Hỏi Google ---------------------------------------------------------
echo "=== BƯỚC 2/3: hỏi Google xem dữ liệu có hợp lệ không (không ghi gì vào GA4) ==="
python3 scripts/ga-backfill.py --from "$FROM" --to "$TO" "${LOGS[@]}" --validate | tail -n 12
echo "(Hợp lệ khi các dòng trên có  \"validationMessages\": [ ]  — rỗng.)"
echo

# --- 5. Xác nhận + gửi -----------------------------------------------------
if [ "$ASSUME_YES" -ne 1 ]; then
  printf "=== BƯỚC 3/3: gửi THẬT vào G-CCTBJ73HK1? Chỉ làm được một lần. Gõ GUI để gửi, Enter để huỷ: "
  read -r ANSWER
  [ "$ANSWER" = "GUI" ] || { echo "Đã huỷ, chưa gửi gì."; exit 0; }
fi

date -Is > "$MARKER"   # đánh dấu trước khi gửi, để lỡ chạy lại cũng không gửi đôi
if python3 scripts/ga-backfill.py --from "$FROM" --to "$TO" "${LOGS[@]}" --send 2>&1 | tee -a "$LOGFILE"; then
  echo
  echo "Xong. Kết quả ghi ở $LOGFILE."
  echo "Số mới hiện trong báo cáo GA4 sau khoảng 24 giờ. Nên xoá khoá trong GA4 nếu chỉ tạo để bù số."
else
  rm -f "$MARKER"
  echo "Gửi lỗi trước khi xong — đã bỏ file đánh dấu, có thể chạy lại." >&2
  exit 1
fi
