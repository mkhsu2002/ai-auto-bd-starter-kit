export function printHeader(title) {
  console.log(`\n${title}`);
  console.log("=".repeat(title.length));
}

export function printSection(title) {
  console.log(`\n${title}`);
  console.log("-".repeat(title.length));
}

export function printList(items) {
  for (const item of items) {
    console.log(`- ${item}`);
  }
}

export function pad(value, width) {
  const text = String(value);
  return text.length >= width ? text : `${text}${" ".repeat(width - text.length)}`;
}
