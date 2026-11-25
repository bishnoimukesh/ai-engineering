# Sampling, temperature 1 and hallucination

Week 1, Lesson 1 (parts 2 to 5). 2026-11-25, finished 00:45 on 2026-11-26.

## In one line

At temperature 1 the model picks randomly by the odds. That gives variety, and it also makes up sentences nobody taught it.

## Words

- **Sampling**: picking randomly, but by the odds. A word with 2 of 7 comes out 2/7 of the time.
- **Temperature 1**: sample using the model's odds unchanged. Any word that ever followed the current word can be picked. A word that never followed it can't.
- **Hallucination**: fluent, confident output that nothing in the training data supports.
- **Fine-tuning**: training an existing model a bit more on new examples to change what it writes.

## What I built (in `next-word.ts`)

- `train`: counts which word follows which, in a nested `Map`.
- `pickTop` (temperature 0): keep the highest count. `>` (not `>=`) keeps the first word on a tie.
- `pickByOdds` (temperature 1): each word gets a piece of a number line as long as its count. Pick `random() * total`, subtract counts until the point goes below 0.

## What I learned

- To change what the model writes, I don't change its rules, I change its training examples. 2 extra `the mat` sentences make temperature 0 write `the mat` (1 only ties, and "cat" wins the tie).
- A sentence is possible only if every neighbouring pair was seen in training. `the dog ate the fish` passes, though it's in none of the 4 sentences.
- My temperature 1 run: 9 of 10 sentences were NEW. Each pair was real, but nothing checks the whole sentence. That is hallucination.
- Temperature 0 never reaches `<end>`: after "the", "cat" (2) always beats mat, rug, fish, bone (1 each), and `<end>` only follows those four.

## What tripped me up

- Mixing up "before" and "after" a word. The model only counts what comes after.
- Seeing a tie where there isn't one. Read the counts first, apply the tie rule only if they're equal.

## TypeScript

- `a ?? b` runs after `+`, so `(inner.get(next) ?? 0) + 1` needs the brackets.
- `new Map<string, number>()` lets the compiler reject a wrong value type. Plain `new Map()` is `Map<any, any>`.
- `for (const [word, count] of map)` loops a Map in insertion order.
