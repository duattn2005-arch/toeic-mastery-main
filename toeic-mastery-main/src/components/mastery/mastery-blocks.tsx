import * as React from "react";
import type { MasteryBlock } from "@/lib/content/mastery";

/** Hỗ trợ **in đậm** đơn giản trong nội dung bài học. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

function BlockTitle({ title }: { title?: string }) {
  if (!title) return null;
  return <h2 className="mb-3 text-sm font-semibold text-primary">{title}</h2>;
}

export function MasteryBlocks({ blocks }: { blocks: MasteryBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "text":
            return (
              <section key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <BlockTitle title={block.title} />
                <div className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                  <RichText text={block.body} />
                </div>
              </section>
            );
          case "note":
            return (
              <section key={i} className="rounded-2xl border border-warning/30 bg-warning/10 p-5">
                {block.title && <p className="mb-1.5 text-sm font-semibold">{block.title}</p>}
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                  <RichText text={block.body} />
                </p>
              </section>
            );
          case "list":
            return (
              <section key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <BlockTitle title={block.title} />
                <ul className="flex flex-col gap-2 text-sm leading-relaxed text-foreground/90">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>
                        <RichText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          case "examples":
            return (
              <section key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <BlockTitle title={block.title} />
                <ul className="flex flex-col gap-2.5">
                  {block.items.map((ex, j) => (
                    <li key={j} className="rounded-lg bg-accent/40 p-3 text-sm">
                      <p className="whitespace-pre-line font-medium">{ex.en}</p>
                      {ex.vi && <p className="mt-1 text-muted-foreground">{ex.vi}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            );
          case "qa":
            return (
              <section key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <BlockTitle title={block.title} />
                {block.instructions && <p className="mb-3 text-sm italic text-muted-foreground">{block.instructions}</p>}
                <ol className="flex flex-col gap-2">
                  {block.items.map((item, j) => (
                    <li key={j}>
                      <details className="group rounded-lg border border-border/70 bg-accent/20 px-3 py-2 text-sm">
                        <summary className="cursor-pointer list-none">
                          <span className="font-medium">
                            {j + 1}. <RichText text={item.q} />
                          </span>
                          <span className="ml-2 text-xs text-primary group-open:hidden">Xem đáp án</span>
                        </summary>
                        <p className="mt-2 whitespace-pre-line border-t border-border/60 pt-2 text-foreground/90">
                          <span className="font-semibold text-success">Đáp án:</span> <RichText text={item.a} />
                        </p>
                      </details>
                    </li>
                  ))}
                </ol>
              </section>
            );
          case "table":
            return (
              <section key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <BlockTitle title={block.title} />
                <div className="-mx-2 overflow-x-auto px-2">
                  <table className="w-full min-w-[520px] border-collapse text-sm">
                    <thead>
                      <tr>
                        {block.headers.map((h, j) => (
                          <th key={j} className="border-b border-border bg-accent/50 px-3 py-2 text-left text-xs font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r} className="align-top">
                          {row.map((cell, c) => (
                            <td key={c} className={`border-b border-border/60 px-3 py-2 ${c === 0 ? "font-medium" : "text-foreground/85"}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
        }
      })}
    </>
  );
}
