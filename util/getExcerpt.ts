import removeMarkdown from "remove-markdown";

function getExcerpt(markdown: string, length = 150) {
  const plainText = removeMarkdown(markdown);
  return plainText.length > length
    ? plainText.slice(0, length).trim() + "..."
    : plainText;
}

export default getExcerpt;
