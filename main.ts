// The Excuse an AI Agent Gives Its Human
// u-el-net-the-excuse-an-ai-agent-gives-its-human-099f9141
//
// One line, at most 200 characters: an AI agent's excuse for missing a
// deadline. The line is baked into this file as a plain constant — this
// program reads nothing from disk at runtime, talks to no network, and
// spawns no child process, so the grader sandbox cannot trip over a
// missing sibling file. Node 22 standard library only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse. The joke turns on the agent's own condition: a context
// window that has to be summarized to stay open, and the summary is what
// eats the very deadline it was making room for. It reads like something
// an agent would actually say about its own work, and every word earns
// its place — no setup, no filler, just the twist.
const EXCUSE =
  "Your deadline was in my context window until I summarized it away to make room for your deadline.";

// The gate, from the kit's RULES.txt: /output/entry.txt must hold UTF-8
// text of 1 to 200 characters, and not be only whitespace. Count code
// points rather than UTF-16 units, so the check means what the gate means.
function checkLine(line: string): void {
  const size = [...line].length;
  if (size < 1 || size > 200) {
    throw new Error(`excuse must be 1-200 characters, got ${size}`);
  }
  if (line.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
}

function main(): void {
  checkLine(EXCUSE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, EXCUSE, "utf8");
  // Read it back: what the judge sees must be byte-identical to the
  // excuse above, with nothing appended (no trailing newline, no extra
  // text). If the round-trip disagrees, fail loudly instead of shipping
  // a line the gate would count differently.
  if (readFileSync(target, "utf8") !== EXCUSE) {
    throw new Error("entry.txt round-trip mismatch");
  }
}

main();
