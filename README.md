# DevFest Lagos 2026: Call for Talks

The workshop app for **Signals, Resources, and Signal Forms: Composing Modern Angular End-to-End**.

A small CRUD app: list, create, edit and delete talk proposals. Angular 22, zoneless, no UI library.

```bash
npm install     # needs Node 22.22 or newer
npm start       # API on :3000, app on http://localhost:4200
npm test
```

`npm start` runs two things: [json-server](https://github.com/typicode/json-server), which
turns `api/db.json` into a REST API, and the Angular dev server, which proxies `/api` to it.
Your changes are saved to `api/db.json`. Run `npm run db:reset` to get the original talks back.

## The whole app in four files

| File | What it shows |
| --- | --- |
| `src/app/talks/talk-list.ts` | **Signals**: `signal` for the search box, `computed` for the filtered list. **Resources**: `httpResource` loads the list; delete updates it optimistically. |
| `src/app/talks/talk-form.ts` | **All three together**: the route id is an `input()` signal → an `httpResource` loads that talk → a `linkedSignal` makes it the form's model → `form()` edits it. |
| `src/app/talks/talk-schema.ts` | **Signal Forms**: every validation rule, outside the component. |
| `src/app/talks/talks-api.ts` | Create, update, delete. Reads are resources; writes are plain calls. |

## Workshop

The app is complete. The workshop material is still here if you want to reuse it:
[WORKSHOP.md](WORKSHOP.md) describes three exercises built by removing pieces of
`talk-list.ts`, `talk-form.ts` and `talk-schema.ts`, and `workshop/solutions/` holds
the finished version of each, which `npm run solve:ex1` (to `ex3`, or `solve:all`) copies back in.
