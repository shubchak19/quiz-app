import DOMPurify from "dompurify";
import { marked } from "marked";

export function sanitize(markdownText: string) {
  const dirty = marked.parse(markdownText) as string;
  const clean = DOMPurify.sanitize(dirty);
  return clean;
}
