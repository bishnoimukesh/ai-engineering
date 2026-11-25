# My progress

- Started: 2026-11-23 (Monday)
- Last session: 2026-11-25 (Wednesday), wrapped up 00:45 on Thu
- Now: Week 1, Lesson 1 (what is an LLM) - in progress
- Next: Week 1, Lesson 2 (tokens, BPE tokenizer, "strawberry")

## Session log

- 2026-11-23 Mon: set up the repo, read the Lesson 1 puzzle.
- 2026-11-24 Tue: linked the repo to Claude. p1: "cat" (right), "1/2" then "6" then "7, 2/7" (right on redo 2). p2: told after 6 tries. Wrapped up; note in `notes/2026-11-24-next-word-odds-and-temperature-0.md`.
- 2026-11-25 Wed: explain-back done with a new case (2 sentences needed, a tie is not enough). p3 told. TODO 1 written and running. TODO 2 done (`>` keeps the first on a tie). TODO 3 done: 9 of 10 sentences NEW.
- 2026-11-26 Thu (00:45): q1 done after two misses. Wrapped up; note in `notes/2026-11-25-sampling-temperature-1-and-hallucination.md`.

## Where I stopped

- Week 1, Lesson 1, Part 5 (explain it back): q1 done. All Lesson 1 code is done.
- Next step: q2 (`pickByOdds` with `{ the: 3, a: 1 }` and `random()` = 0.8), then q3 (hallucination in my own words), then q4 (is temperature 0 always correct?).
- After that: Lesson 2, tokens (BPE tokenizer from scratch, "strawberry").

## Timetable

- Mon to Thu: one 2-hour evening session (about 75 minutes of lesson, then notes)
- Fri: about 1 hour of review
- Sat: building day, 4 to 5 hours
- Sun: weekly review, writing if I want

## Week 1: tokens, embeddings, attention, sampling and temperature

- Lesson 1: what is an LLM (next-word counts, temperature 0 and 1, hallucination) - in progress
- Lesson 2: tokens (BPE tokenizer from scratch, "strawberry")
- Lesson 2b: look back 2 words instead of 1
- Lesson 3: embeddings
- Lesson 4: attention (the intuition)
- System design question: not started

## Roadmap

- Phase 1 (weeks 1 to 4): How LLMs work
- Phase 2 (weeks 5 to 8): Retrieval and evals
- Phase 3 (weeks 9 to 12): Agents in production

## Misconceptions to revisit

- L1 q1: twice said "cat" and the end-words were tied after "the" (they are 2 vs 1). Mixed it up with the sat/ate tie after "cat". Fixed by tracing `pickTop` by hand. Re-check: read the counts before applying the tie rule.

- L1 p1: gave the odds of "cat" after "the" as 1/2. Maybe divided by the number of sentences (4), not by the number of times "the" is followed by a word (7). Then missed the "the" in sentence 4, which starts with "a". Fixed: 2/7.
- L1 p2: temperature 0 sentence given as "the cat sat on the mat", which is a training sentence. Possible model: the generator remembers whole sentences. It only looks back 1 word, so after the second "the" it picks the top word after "the" again.
