# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                                        # Dev server at http://localhost:4200
npm run build                                    # Production build
npm test                                         # Run unit tests with Vitest
npx vitest run src/app/path/to/file.spec.ts      # Run a single test file
npx playwright test                              # Run e2e tests
ng g c features/<name>/components/<name>         # Scaffold a component
ng g s core/services/<name>                      # Scaffold a service
ng g g core/guards/<name>                        # Scaffold a guard
```

## Architecture

Angular 22 standalone banking management app (portfolio project). Key entry points:

- `src/main.ts` — bootstraps `App` with `appConfig`
- `src/app/app.config.ts` — root providers (router, zoneless change detection)
- `src/app/app.routes.ts` — top-level routes; each feature is lazy-loaded
- `src/app/app.ts` — root component with `RouterOutlet`
- `src/styles.scss` — global styles (PrimeFlex + PrimeNG theme)

### Planned feature structure (lazy-loaded)
```
src/app/
  core/          # guards, interceptors, singleton services
  shared/        # reusable components, pipes, directives
  features/
    auth/
    clients/
    comptes/
    transactions/
    dashboard/
```

**UI:** PrimeNG exclusively (never Angular Material). PrimeFlex for layout (no custom CSS for grid/spacing).

**State:** Angular signals (`signal()`, `computed()`, `effect()`). No NgRx, no `BehaviorSubject` for UI state.

**HTTP:** `HttpClient` for full control; `httpResource()` for signal-reactive calls. `json-server` simulates the REST API in development.

**Forms:** Signal Forms (simple/reactive) or Reactive Forms (complex/nested) — never mix both in the same form.

**Testing:** Vitest for unit tests; Playwright for e2e. Karma/Jasmine are deprecated and must not be used.

**Change detection:** Zoneless + OnPush on every component.

## Full conventions & rules

See `.claude/CLAUDE.md` for the complete Angular 22 rules, PrimeNG component mapping, naming conventions, accessibility requirements, and the 8-module learning roadmap.
