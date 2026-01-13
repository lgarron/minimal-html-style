#!/usr/bin/env -S bun run --

import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { argv } from "node:process";
import { message, object, option } from "@optique/core";
import { run } from "@optique/run";
import { Path } from "path-class";

const VERSION = "v0.1.0";

const README_PATH = new Path("./README.md");

function parseArgs() {
  return run(
    object({
      checkOnly: option("--check-only"),
    }),
    {
      programName: new Path(argv[1]).basename.path,
      description: message`Update README.`,
      help: "option",
      completion: {
        mode: "option",
        name: "plural",
      },
      version: {
        mode: "option",
        value: VERSION,
      },
    },
  );
}

async function execute(args: ReturnType<typeof parseArgs>): Promise<void> {
  const fullHTML = await readFile(
    new URL("../index.html", import.meta.url),
    "utf-8",
  );
  const match = fullHTML.match(/.*viewport.*\n/);
  assert(match);
  let snippet = match[0];
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
  newReadme +=
    "  <!-- From: https://github.com/lgarron/minimal-html-style (v1.0.0) -->\n";
  newReadme += snippet;
  newReadme += "\n```";
  newReadme += rest.split("```").slice(1).join("```");

  if (args.checkOnly) {
    assert.equal(newReadme, await README_PATH.readText());
    console.log("✅ README is up to date.");
  } else {
    console.log(newReadme);
    await README_PATH.write(newReadme);
  }
}

if (import.meta.main) {
  await execute(parseArgs());
}
