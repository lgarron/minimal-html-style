import { readFile, writeFile } from "node:fs/promises";

const fullHTML = await readFile(
	new URL("../index.html", import.meta.url),
	"utf-8",
);
let snippet = fullHTML.match(/.*viewport.*\n/)[0];
snippet += "  <style>";
snippet += fullHTML.split("<style>")[1].split("</style>")[0];
snippet += "</style>";
console.log(snippet);

const oldReadme = await readFile(
	new URL("../README.md", import.meta.url),
	"utf-8",
);
let [newReadme, rest] = oldReadme.split("```html");
newReadme += "```html\n";
newReadme += "  <!-- From: https://github.com/lgarron/minimal-html-style -->\n";
newReadme += snippet;
newReadme += "\n```";
newReadme += rest.split("```")[1];

console.log(newReadme);

await writeFile(new URL("../README.md", import.meta.url), newReadme);
