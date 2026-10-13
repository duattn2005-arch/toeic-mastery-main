import { JsonLd } from "@/components/public/json-ld";

export interface FaqItem {
  q: string;
  a: string;
}

/** Visible FAQ (native <details>, no JS) plus FAQPage structured data. The
 * markup always matches the visible text, as Google requires. */
export function Faq({ items, title = "Câu hỏi thường gặp" }: { items: FaqItem[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading" className="mt-12">
      <h2 id="faq-heading" className="text-xl font-bold md:text-2xl">
        {title}
      </h2>
      <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
        {items.map((item) => (
          <details key={item.q} className="group px-5 py-4">
            <summary className="cursor-pointer list-none font-semibold [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-3">
                {item.q}
                <span aria-hidden className="mt-0.5 text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
    </section>
  );
}
