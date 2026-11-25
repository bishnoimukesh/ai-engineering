# Lesson 1: my answers

## Part 1: the puzzle

**p1.** After "the", which word has the highest odds?
- My answer: **7, 2/7** (right).
- Lesson: odds = times "the" is followed by "cat" / times "the" is followed by any word. "the" appears 7 times, including the one in sentence 4, which starts with "a".

**p2.** At temperature 0, starting from "the", what sentence comes out?
- My answers: **the cat sat on the cat sat on the cat sat on**
- Why: each step is a lookup in a fixed table: the -> cat, cat -> sat (a tie with "ate", broken the same way every time), sat -> on, on -> the. The model sees only the current word, so it loops and never reaches `<end>`.

**Explain back.** Why "cat sat on" after the second "the", and not "mat"? Tested with a new case: what's the smallest change to the training data that makes temperature 0 write `the mat`?
- My answer: add **2** `the mat` sentences. Then "mat" is 3 against "cat" 2, so "mat" wins outright (1 sentence only makes a 2-2 tie, and "cat" wins the tie because it was seen first). After "mat" the only next word is `<end>`, so it stops. I'm not changing the model's rules, I'm changing its training examples.

**p3.** Which sentences can temperature 1 write?
- Answer (told): only **c) the dog ate the fish**. a) breaks at cat -> on, b) at rug -> sat (rug is only followed by `<end>`), d) at sat -> `<end>` (sat is always followed by on).
- c) is in none of the 4 sentences. It's stitched from pairs in different sentences: the seed of hallucination.

## Part 2: TODO 1, train

```ts
const inner = counts.get(current) ?? new Map();
inner.set(next, (inner.get(next) ?? 0) + 1);
counts.set(current, inner);
```

Output after "the": cat 2 (29%), mat, dog, rug, fish, bone 1 each (14%). Matches my p1 answer of 2/7.

## Part 3: TODO 2, pickTop (temperature 0)

Prediction: use `>` (sure). Right: with `>`, a later word with an equal count does not replace the first, so "sat" beats "ate".

```ts
let best = "";
let bestCount = -1;
for (const [word, count] of options) {
  if (count > bestCount) {
    best = word;
    bestCount = count;
  }
}
return best;
```

Output: `the cat sat on the cat sat on the cat sat on`. Matches my p2 answer.

## Part 4: TODO 3, pickByOdds (temperature 1)

```ts
let total = 0;
for (const count of options.values()) total += count;
let point = random() * total;
for (const [word, count] of options) {
  point -= count;
  if (point < 0) return word;
}
return [...options.keys()].at(-1)!;
```

Also typed the inner Map in `train`: `new Map<string, number>()`.

Output: 9 of 10 sentences are `NEW`, e.g. `the dog sat on the mat`. Each pair of words was seen in training, but the whole sentence never was: that's hallucination.

## Part 5: explain it back

**q1.** Why does temperature 0 never reach `<end>`?
- My answer: because "cat" has more count. After "the", cat is 2 and mat, rug, fish, bone are 1 each, so "the" always goes to "cat". `<end>` only follows mat, rug, fish or bone, so it is never reached and the output loops.
