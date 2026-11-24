# Next-word odds and temperature 0

Week 1, Lesson 1 (part 1 of the puzzle). 2026-11-24.

## In one line

An LLM predicts the next piece of text from odds it learned from training data. At temperature 0 it always takes the top pick.

## Words

- **LLM (large language model)**: a model that, given some text, gives the odds for each possible next piece of text.
- **Odds**: how often one option happens, out of all the options. They add up to 1.
- **Distribution**: the full list of next words, each with its odds.
- **Temperature 0**: always pick the top word. No randomness.

## What I worked out

- After "the", the counts are: cat 2, and mat, dog, rug, fish, bone 1 each. Total 7, so "cat" is **2/7**.
- The bottom of the fraction counts every time "the" is followed by a word, not the number of sentences. "the" can appear more than once in a sentence, and in a sentence that starts with "a".

## What tripped me up

- I thought the model would write a training sentence ("the cat sat on the mat"). It doesn't remember sentences. It sees only the current word.
- At temperature 0, the same current word always gives the same pick. A tie is broken the same way every time, not alternated.
- So the output loops: **the cat sat on the cat sat on the cat sat on**. It never reaches `<end>`.

## Why it matters for real LLMs

At temperature 0, real models can also get stuck repeating themselves. So temperature 0 isn't automatically "best".

## Still open

- Why did the model write "cat sat on" after the second "the", and not "mat"? Answer in my own words next session.
