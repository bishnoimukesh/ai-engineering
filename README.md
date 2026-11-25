# my-work

My own path through the 12-week AI engineering roadmap. Lesson code lives in `weeks/`, one folder per lesson. Each lesson has a `LESSON.md` and starter code with `TODO(human)` parts that I write. Short notes on each concept go in `notes/`. `PROGRESS.md` shows where I am.

```bash
npm install
npm run lesson1
```

## How sessions work

- `continue`: Claude reads `PROGRESS.md` and picks up where I stopped.
- `wrap up`: Claude writes a short note in `notes/`, updates `PROGRESS.md`, and says where we stopped and what's next.
- Claude pushes new lesson files, notes and progress updates straight to `master` on this repo.
- My `TODO(human)` answers are my own work: I commit them myself, or I paste them in the chat and Claude commits them.
