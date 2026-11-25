// Week 1, Lesson 1: a tiny next-word model.
// Run it:  npx tsx weeks/week-01/lesson-01-what-is-an-llm/next-word.ts
// Fill in the three TODO(human) parts, one at a time. Run after each one.

// ---------- The training data ----------
// "Training data" = the text a model learns from. Ours is 4 sentences.
const corpus: string[] = [
  "the cat sat on the mat",
  "the dog sat on the rug",
  "the cat ate the fish",
  "a dog ate the bone",
];

// A fake word that means "the sentence stops here".
const END = "<end>";

// counts.get("the") -> Map { "cat" => 2, "mat" => 1, ... }
// Outer key: the current word. Inner key: a word that came next. Value: how many times.
type Counts = Map<string, Map<string, number>>;

// ---------- TODO 1: training ----------
// "Training" here = reading the text and counting which word follows which.
export function train(sentences: string[]): Counts {
  const counts: Counts = new Map();
  for (const sentence of sentences) {
    const words = [...sentence.split(" "), END];
    for (let i = 0; i < words.length - 1; i++) {
      const current = words[i];
      const next = words[i + 1];
      // TODO 1 (done): add 1 to the count of `next` after `current`.
      const inner = counts.get(current) ?? new Map<string, number>();
      inner.set(next, (inner.get(next) ?? 0) + 1);
      counts.set(current, inner);
    }
  }
  return counts;
}

// ---------- TODO 2: temperature 0 ----------
// Always pick the most frequent next word.
// On a tie, keep the word that was seen first (the Map's first one).
export function pickTop(options: Map<string, number>): string {
  // TODO 2 (done): return the word with the highest count; on a tie, keep the first.
  let best = "";
  let bestCount = -1;
  for (const [word, count] of options) {
    if (count > bestCount) {
      best = word;
      bestCount = count;
    }
  }
  return best;
}

// ---------- TODO 3: temperature 1 ----------
// Pick randomly, but by the odds: "cat" (2 of 7) should come out 2/7 of the time.
// `random()` returns a number from 0 (included) to 1 (not included), like Math.random().
// Call random() exactly once per pick, so your results match a friend's run.
export function pickByOdds(options: Map<string, number>, random: () => number): string {
  // TODO 3 (done): walk the number line until the random point falls inside a word's piece.
  let total = 0;
  for (const count of options.values()) total += count;

  let point = random() * total;

  for (const [word, count] of options) {
    point -= count;
    if (point < 0) return word;
  }

  // safety net for rounding (never reached in practice)
  return [...options.keys()].at(-1)!;
}

// ---------- Given: generate a sentence ----------
// Start from one word. Ask `pick` for the next word. Repeat until END or maxWords.
export function generate(
  counts: Counts,
  firstWord: string,
  pick: (options: Map<string, number>) => string,
  maxWords = 12,
): string {
  const out = [firstWord];
  let current = firstWord;
  while (out.length < maxWords) {
    const options = counts.get(current);
    if (!options) break; // never saw a word after `current`
    const next = pick(options);
    if (next === END) break;
    out.push(next);
    current = next;
  }
  return out.join(" ");
}

// ---------- Given: a repeatable "random" ----------
// Same seed -> same sequence of numbers every run. Handy for comparing results.
function seededRandom(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- Run the experiments ----------
function main() {
  const counts = train(corpus);

  console.log("\n== Step 1: what follows 'the'? ==");
  const afterThe = counts.get("the");
  if (!afterThe) {
    console.log("No counts yet. Finish TODO 1.");
    return;
  }
  const total = [...afterThe.values()].reduce((a, b) => a + b, 0);
  for (const [word, n] of afterThe) {
    console.log(`  ${word.padEnd(6)} ${n}   odds ${((100 * n) / total).toFixed(0)}%`);
  }

  console.log("\n== Step 2: temperature 0 (always the top word) ==");
  try {
    console.log("  " + generate(counts, "the", pickTop));
  } catch (e) {
    console.log("  " + (e as Error).message);
    return;
  }

  console.log("\n== Step 3: temperature 1 (random by the odds), 10 tries ==");
  const random = seededRandom(42);
  try {
    for (let i = 0; i < 10; i++) {
      const s = generate(counts, "the", (o) => pickByOdds(o, random));
      const tag = corpus.includes(s) ? "seen" : "NEW ";
      console.log(`  ${tag}  ${s}`);
    }
  } catch (e) {
    console.log("  " + (e as Error).message);
  }
}

main();
