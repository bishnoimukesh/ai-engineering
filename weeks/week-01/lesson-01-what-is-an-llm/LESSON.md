# Week 1, Lesson 1: What is an LLM?

Monday session. About 75 minutes of lesson, then 15 to 30 minutes of notes.

| Part | What you do | Time |
|---|---|---|
| 0 | Set up | 5 min |
| 1 | The puzzle: predict, no code | 10 min |
| 2 | TODO 1: train (count) | 15 min |
| 3 | TODO 2: temperature 0 | 10 min |
| 4 | TODO 3: temperature 1 | 20 min |
| 5 | Explain it back | 15 min |

Answer in the chat as `p1: ...`, `q2: ...`. Add `sure` or `guess` after each answer. Say `done` when Part 5 is answered.

## Words you need

Each word keeps this meaning for the whole course.

- **Model**: a program that takes an input and gives a guess. It is built from data, not from rules a person wrote.
- **LLM (large language model)**: a model with one job. Given some text, it gives the odds for each possible next piece of text. ChatGPT and Claude are LLMs.
- **Training**: the step where the model learns from data. Today, training is counting.
- **Training data**: the text the model learns from. Ours is 4 sentences.
- **Odds** (also called **probability**): how likely an option is, as a fraction. The odds of all options add up to 1 (100%).
- **Distribution**: the full list of options with their odds. Example: after "the", cat 2/7, mat 1/7, and so on.
- **Token**: the piece of text the model predicts in one step. Today, one token is one word. Lesson 2 shows that real tokens are word pieces.
- **Generation**: using the trained model to write text. It picks one token, adds it to the text, and repeats.
- **Temperature**: a setting for how random the pick is. At 0, always pick the top option. At 1, pick randomly, using the model's odds unchanged. The Claude API accepts 0.0 to 1.0, and the default is 1.0.
- **Sampling**: picking randomly by the odds. Temperature 1 is sampling.
- **Hallucination**: the model writes something fluent and confident that is not true, or not supported by anything it learned.

## Part 0: Set up

From the `my-work/` folder:

```bash
npm install
npx tsx weeks/week-01/lesson-01-what-is-an-llm/next-word.ts
```

You should see `No counts yet. Finish TODO 1.`

## Part 1: The puzzle (predict before any code)

This is all the model will ever read:

```
the cat sat on the mat
the dog sat on the rug
the cat ate the fish
a dog ate the bone
```

The model learns only one thing: for each word, which words came right after it, and how often. Every sentence also ends with a fake word, `<end>`.

- **p1.** After "the", which word has the highest odds? Give its odds as a fraction.
- **p2.** At temperature 0, start from "the". Always take the top next word. Write the sentence that comes out. If there is a tie, the word seen first wins.
- **p3.** At temperature 1, start from "the". Which of these can the model write?
  - a) the cat on the mat
  - b) the rug sat on the mat
  - c) the dog ate the fish
  - d) the cat ate the dog sat

Send p1 to p3 in the chat now. Then start Part 2.

## Part 2: TODO 1, training

Open `next-word.ts` and find `TODO(human)` in `train`. Write 2 to 5 lines that add 1 to the count of `next` after `current`.

Run the file. Step 1 prints the distribution after "the". Compare it with your p1.

## Part 3: TODO 2, temperature 0

Write `pickTop`. Loop over the Map and return the word with the highest count. On a tie, keep the first.

Run the file. Step 2 prints the temperature 0 sentence. Compare it with your p2.

## Part 4: TODO 3, temperature 1

Write `pickByOdds`. The idea, drawn for the odds after "the" (total count 7):

```
count:   2        1     1     1     1      1
       |---cat---|-mat-|-dog-|-rug-|-fish-|-bone-|
       0         2     3     4     5      6      7

random() = 0.62  ->  0.62 * 7 = 4.34  ->  lands in "rug"
```

Each word gets a piece of the line as long as its count. A random point lands in a word's piece with that word's odds. Your job: turn the picture into code. Call `random()` once per pick.

Run the file. Step 3 prints 10 sentences. `NEW` means the sentence is in none of the 4 training sentences. Compare with your p3.

## Part 5: Explain it back

- **q1.** Your temperature 0 run never reached `<end>`. Explain why, using the counts. (Your own words.)
- **q2.** Your `pickByOdds` gets `Map { "the" => 3, "a" => 1 }`, and `random()` returns 0.8. Which word does it return? Show the number you compared.
- **q3.** "the dog sat on the mat" came out marked `NEW`. Nobody taught it that sentence. How did the model write it, and how is this the same thing as a hallucination in ChatGPT? (Your own words.)
- **q4.** A teammate says: "Use temperature 0 in production, because then the model always gives the correct answer." What is wrong with that claim?

## How this maps to a real LLM

| Our tiny model | A real LLM |
|---|---|
| Looks back 1 word | Looks back at thousands of tokens (the "context window", Week 2) |
| A table of counts | A neural network that computes the odds (Weeks 1 and 2) |
| Tokens are whole words | Tokens are word pieces (Lesson 2) |
| Trained on 4 sentences | Trained on a huge amount of text |
| Picks one word, adds it, repeats | Same: picks one token, adds it, repeats |
| Temperature 0 and 1 | Same idea, same names |

One note on real APIs: Anthropic's docs say that even at temperature 0.0, Claude's results are not fully deterministic (the same input can give different outputs).

## TypeScript you will meet

- **`Map<K, V>`**: a key-value store, like an object, but keys can be any type. It remembers insertion order: a loop visits keys in the order you first set them. Methods: `.get(k)` (returns `undefined` if missing), `.set(k, v)`, `.has(k)`, `.values()`, `.keys()`.
- **`for (const [word, count] of map)`**: loops over a Map. Each item is a `[key, value]` pair, and the brackets unpack it.
- **`a ?? b`**: gives `a`, unless `a` is `null` or `undefined`, then gives `b`. Different from `||`, which also replaces `0` and `""`.
- **`[...arr, x]`**: a new array with all of `arr`, then `x`.
- **`(options: Map<string, number>) => string`**: the type of a function that takes a Map and returns a string. `generate` takes the picking function as an input, so the same loop works for temperature 0 and 1.
