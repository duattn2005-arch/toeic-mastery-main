import * as React from "react";
import { Lightbulb } from "lucide-react";
import type { Guide, GuideBlock } from "@/lib/content/guides";

/** **bold** inline markup → <strong>. */
function inline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <React.Fragment key={i}>{part}</React.Fragment>
  );
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "p":
      return <p className="leading-relaxed text-foreground/90">{inline(block.text)}</p>;
    case "ul":
      return (
        <ul className="ml-5 list-disc space-y-2 leading-relaxed text-foreground/90 marker:text-primary">
          {block.items.map((item) => (
            <li key={item}>{inline(item)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="ml-5 list-decimal space-y-2 leading-relaxed text-foreground/90 marker:font-semibold marker:text-primary">
          {block.items.map((item) => (
            <li key={item}>{inline(item)}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-2.5 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-border/70 align-top">
                  {row.map((cell, i) => (
                    <td key={i} className={i === 0 ? "px-4 py-2.5 font-medium" : "px-4 py-2.5 text-foreground/90"}>
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "tip":
      return (
        <aside className="flex gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm leading-relaxed">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <p>
            {block.title && <strong>{block.title}: </strong>}
            {inline(block.text)}
          </p>
        </aside>
      );
    case "example":
      return (
        <div className="rounded-xl border border-border bg-card p-4 text-sm">
          <p className="text-xs font-semibold text-primary uppercase">Ví dụ</p>
          <p className="mt-1.5 font-medium leading-relaxed">{block.question}</p>
          {block.options && (
            <ul className="mt-2 space-y-1 text-muted-foreground">
              {block.options.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          )}
          <p className="mt-3 leading-relaxed">
            <strong className="text-success">Đáp án: {block.answer}.</strong> <span className="text-foreground/90">{block.explain}</span>
          </p>
        </div>
      );
  }
}

/** Table of contents + the guide's sections. */
export function GuideBody({ guide }: { guide: Guide }) {
  return (
    <>
      <nav aria-label="Mục lục" className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-semibold">Nội dung bài viết</p>
        <ol className="mt-2 space-y-1 text-sm">
          {guide.sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
                {s.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {guide.sections.map((section) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-h`} className="mt-10 scroll-mt-28">
          <h2 id={`${section.id}-h`} className="text-xl font-bold tracking-tight md:text-2xl">
            {section.heading}
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
