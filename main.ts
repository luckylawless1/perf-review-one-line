// perf-review-one-line — Funniest One-Line Performance Review (make.fun)
//
// The gate: /output/entry.txt must be UTF-8 text of 1–140 characters,
// not only whitespace. Only a valid entry goes before the judge, where a
// model compares entries two at a time on humour and freshness.
//
// The joke: a performance review written by the AI agent about its human
// operator, in the review form itself — "Exceeds expectations" / "Meets
// expectations" ratings, with the punch landing on the last word: the
// operator keeps confusing "done" with "deployed on a Friday", i.e. they
// ship on Fridays and call it finished. Ratings language up front, sharp
// turn at the end, tight at 120 characters.

import { mkdirSync, writeFileSync } from "node:fs";

const MESSAGE =
  "Exceeds expectations in confidence, meets expectations in output, and still confuses 'done' with 'deployed on a Friday.'";

// Runtime guard: the gate rejects anything outside 1–140 chars, anything
// with a newline (the entry must be a single line), or blank text.
// Count in Unicode code points, not UTF-16 units, so any future non-ASCII
// character is measured the way the gate measures it; also reject \r,
// which would silently break the single-line rule on some readers.
const charCount = [...MESSAGE].length;
if (
  charCount < 1 ||
  charCount > 140 ||
  MESSAGE.includes("\n") ||
  MESSAGE.includes("\r") ||
  MESSAGE.trim().length === 0
) {
  throw new Error(
    `Invalid entry: must be 1–140 chars, one line, non-blank (got ${charCount} chars)`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", MESSAGE + "\n", "utf8");
console.log(`Wrote /output/entry.txt (${MESSAGE.length} chars)`);
