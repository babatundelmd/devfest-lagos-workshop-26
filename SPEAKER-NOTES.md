# Run sheet · 60 minutes

Your copy. Attendees get `WORKSHOP.md`.

## Before the day

- [ ] Send attendees the repo link and: "Node 22.22+, run `npm install` before you arrive."
- [ ] Put the repo **with `node_modules`** on 3 or 4 USB sticks. Conference wifi will not
      survive 40 people installing Angular at once. This matters more than any slide.
- [ ] Keep a second checkout with `npm run solve:all` applied: your always-working demo copy.
- [ ] `npm run db:reset` right before you start, so the list looks clean.
- [ ] Editor at 16pt or larger. Have `api/db.json` open in a split pane.

## Timing

| Time | What | Notes |
| --- | --- | --- |
| 0:00–0:05 | **Hook** | Run the finished app. Create a talk and watch it land in `db.json` in the split pane. "Four files. No subscriptions. No loading booleans. Let's see how." |
| 0:05–0:12 | **Signals** | `talk-list.ts`: `signal` for the search, `computed` for the list. Type in the box and show the list follow. |
| 0:12–0:19 | **Exercise 1** + walkthrough | Say the escape hatch out loud *before* they start. |
| 0:19–0:27 | **Resources** | `httpResource` in `talk-list.ts`: `value`, `isLoading`, `error`, `reload`. Then the optimistic `delete()`: `talks.update()` first, the server second. |
| 0:27–0:35 | **Exercise 2** + walkthrough | The one that matters most. Walk the room. |
| 0:35–0:46 | **Signal Forms** | Model signal → `form()` → `[formField]`. Open `talk-schema.ts`: the rules live outside the component. Submit empty, show errors, fix, save. |
| 0:46–0:54 | **Exercise 3** + walkthrough | "`npm test` is your answer key." |
| 0:54–1:00 | **Close** | Put the four lines from `talk-form.ts` on screen (`id` → `talk` → `model` → `form`). That is the talk title in one picture. Then questions. |

## If you run late

1. Skip the Exercise 1 walkthrough. Tell them to run `solve:ex1`.
2. Drop part (c) of Exercise 3 and demo it yourself.

**Never cut Exercise 2.** It is the composition the title promises.

## Lines worth having ready

- `computed`: "It re-runs because it remembers what it read. You never tell it to."
- `httpResource`: "A request is not an event you handle. It is a value that follows its URL."
- `undefined` URL: "No id, no request. The resource just waits."
- `linkedSignal`: "Follows the server, but you can still type in it."
- Schema: "The rules are in their own file, so you can test them without a browser."

## If the room is ahead of you

Show the full-featured version of this app (async email validation, arrays, custom
controls, chained resources) as a "where to go next".
