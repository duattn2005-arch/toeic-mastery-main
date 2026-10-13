/** schema.org structured data as a <script type="application/ld+json">.
 * "<" is escaped so a stray "</script>" in the data can't end the tag. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
