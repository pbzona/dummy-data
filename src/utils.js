export function titleCase(words) {
  return words
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");
}
