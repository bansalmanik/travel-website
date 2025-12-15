import { renderMarkdownToHtml } from "@/lib/blog";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = renderMarkdownToHtml(content);

  return (
    <div
      className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
