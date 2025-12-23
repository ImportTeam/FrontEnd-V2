/**
 * Splits text by line breaks (\n character)
 * @param text - Text that may contain \n characters
 * @returns Array of text lines
 */
export function splitTextByLineBreaks(text: string | null | undefined): string[] {
  if (!text) return [];
  return text.split("\n");
}

/**
 * Replaces \n with actual line breaks in display
 * Should be used with CSS white-space: pre-wrap or pre-line
 */
export function formatLineBreaks(text: string | null | undefined): string {
  if (!text) return "";
  return text.replace(/\\n/g, "\n");
}

