# Workshop handout

**Signals, Resources, and Signal Forms: Composing Modern Angular End-to-End**
DevFest Ado-Ekiti 2026 · 60 minutes

We are building a tiny call-for-talks app: a list of talks you can create, edit and
delete. It already works, except for three pieces. You put them back.

```bash
npm install     # BEFORE the session, please. Needs Node 22.22+
npm start       # open http://localhost:4200
```

Keep the app in one window and your editor in the other. Saving a file reloads the page.

**Stuck? Don't sit and suffer.** Each exercise has an escape hatch that drops in the answer:

```bash
npm run solve:ex1     # or solve:ex2, solve:ex3
```

---

## Exercise 1 · Signals (5 min)

**Where:** `src/app/talks/talk-list.ts`, the `filtered` computed

Type in the search box or click a track. Nothing happens: the signals update, but the
list is not derived from them yet. Right now `filtered` returns every talk.

1. Read the signals by calling them: `this.query()` and `this.track()`.
2. Keep a talk when **both** are true:
   - the track is `'All'`, or equals `talk.track`
   - the title or speaker, lower-cased, includes the query, lower-cased

There is no `subscribe` and no `ngOnChanges`. A `computed()` remembers which signals it
read, and re-runs by itself when one of them changes.

**Done when:** typing "flutter" leaves one talk, and clicking "AI" leaves two.

---

## Exercise 2 · Resources (6 min)

**Where:** `src/app/talks/talk-form.ts`, the `talk` and `model` properties

Click **Edit** on any talk. The form is empty, because nothing loads the talk.

**Step 1: load it.** Make the `talk` resource's URL depend on the id signal:

```ts
protected readonly talk = httpResource<Talk>(() =>
  this.id() ? `/api/talks/${this.id()}` : undefined,
);
```

Returning `undefined` keeps the resource idle, so `/talks/new` never fetches. Because
the URL reads `id()`, the resource fetches again whenever the id changes.

**Step 2: put it in the form.** `model` must follow the loaded talk, but still be
writable so the user can type. That is exactly what `linkedSignal` does:

```ts
protected readonly model = linkedSignal<TalkDraft>(() =>
  this.talk.hasValue() ? toDraft(this.talk.value()) : emptyDraft(),
);
```

The template already shows the skeleton and the "not found" message from
`talk.isLoading()` and `talk.error()`. You get those for free.

**Done when:** Edit shows a loading skeleton, then a filled form. Save a change and it
sticks. Try `/talks/nope` in the address bar for the "not found" state.

This is the heart of the workshop: a signal feeds a resource, and the resource feeds
a form. No subscriptions anywhere.

---

## Exercise 3 · Signal Forms (6 min)

**Where:** `src/app/talks/talk-schema.ts`, at the end of `talkSchema`

You can save a talk with no speaker and no abstract. The title and duration rules
already in the file are worked examples: copy their shape.

- **a)** The speaker is required.
- **b)** The abstract is required, and at least 50 characters long. Bonus: `message`
  can be a function, so the error can count for you:
  ```ts
  message: ({ value }) => `A little more detail please (${value().length}/50 characters)`
  ```
- **c)** Advanced talks need at least 45 minutes. This rule reads **another** field,
  so write it with `validate()`:
  ```ts
  validate(talk.duration, ({ value, valueOf }) =>
    valueOf(talk.level) === 'Advanced' && value() < 45
      ? { kind: 'tooShort', message: 'Advanced talks need at least 45 minutes' }
      : undefined,
  );
  ```

**Done when:** `npm test` is green (three tests fail until then, one per part), and
switching Level to "Advanced" makes a 30-minute talk show an error.

---

## After the workshop

- Delete a talk and watch it disappear before the server answers. Read `delete()` in
  `talk-list.ts` to see how.
- Open `api/db.json` while you create and edit talks. That is your "database".
- `npm run db:reset` puts the original talks back.
