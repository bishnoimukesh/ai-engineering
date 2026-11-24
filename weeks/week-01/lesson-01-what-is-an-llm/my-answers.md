# Lesson 1: my answers

## Part 1: the puzzle

**p1.** After "the", which word has the highest odds?
- My answer: **7, 2/7** (right).
- Lesson: odds = times "the" is followed by "cat" / times "the" is followed by any word. "the" appears 7 times, including the one in sentence 4, which starts with "a".

**p2.** At temperature 0, starting from "the", what sentence comes out?
- My answers: **the cat sat on the cat sat on the cat sat on**
- Why: each step is a lookup in a fixed table: the -> cat, cat -> sat (a tie with "ate", broken the same way every time), sat -> on, on -> the. The model sees only the current word, so it loops and never reaches `<end>`.

**p3.** Not answered yet.
