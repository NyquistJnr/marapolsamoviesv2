export function shortenText(text, howShort) {
  // Split the text into words
  const words = text.split(/\s+/); // Split by whitespace

  // Check if the text has more than 100 words
  if (words.length > howShort) {
    // Join the first 100 words and append "..."
    return words.slice(0, howShort).join(" ") + "...";
  }

  // Return the original text if it's 100 words or less
  return text;
}

export function truncateText(htmlString, maxLength) {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  let text = div.textContent || div.innerText || "";

  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + "...read more";
  }

  return text;
}
