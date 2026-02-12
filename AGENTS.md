# AGENTS.md — PolyTalk

## Project Overview

PolyTalk is a multi-platform language learning app (polytalk.me). It is an Angular 19 PWA with Tauri v2 for desktop builds (Windows, macOS, Linux) and a TWA wrapper for Android. All components use standalone architecture with inline templates and styles.

## Build & Dev Commands

```bash
# Install dependencies
npm install

# Dev server (http://localhost:4200)
npm start

# Production build (runs generate-blog as prebuild step)
npm run build

# Build with watch mode
npm run watch

# Tauri desktop dev / build
npm run tauri:dev
npm run tauri:build
```

## Test Commands

### Unit Tests (Jasmine + Karma)

```bash
# Run all unit tests
npm test
# Equivalent to: ng test

# Run a single test file
npx ng test --include='**/settings.service.spec.ts'

# Run tests matching a describe/it name
npx ng test --include='**/app.component.spec.ts'
```

Test files are co-located with source files as `*.spec.ts`. Use `TestBed.configureTestingModule` with standalone components imported directly (not declared).

### E2E Tests (Playwright)

```bash
# Run all e2e tests (requires dev server running or built app)
npx playwright test

# Run a single e2e test file
npx playwright test e2e/example.spec.ts

# Run with UI
npx playwright test --ui

# Run specific browser only
npx playwright test --project=chromium
```

E2e tests live in `e2e/`. Base URL defaults to `http://localhost:4200`. Set `PLAYWRIGHT_TEST_BASE_URL` to override.

## Linting & Formatting

No ESLint or Prettier is configured. Follow the `.editorconfig` rules:

- **Indent**: 2 spaces
- **Charset**: UTF-8
- **Final newline**: yes
- **Trailing whitespace**: trim (except `.md`)
- **Quotes (TypeScript)**: single quotes

## Copilot Instructions (from `.github/copilot-instructions.md`)

- Always use Angular **signals** (`signal()`, `computed()`) and **effects** (`effect()`) for reactive state
- Use modern TypeScript with `async/await` (not raw Promises/callbacks)
- Use new Angular control flow syntax: `@if` (not `*ngIf`), `@for` (not `*ngFor`), `@let` (not `*ngLet`)

## Code Style Guidelines

### File & Directory Structure

- File names: **kebab-case** (e.g., `language-selection.component.ts`, `settings.service.ts`)
- Components live in `src/app/pages/` (routed pages) or `src/app/components/` (shared)
- Services live in `src/app/services/`
- Test files co-located: `foo.component.ts` → `foo.component.spec.ts`

### Components

- All components must be **standalone** (`standalone: true` is default in Angular 19)
- Use **inline templates** (`template:` not `templateUrl:`) and **inline styles** (`styles:` not `styleUrl:`)
- Import dependencies directly in the component's `imports` array
- Use `inject()` function for DI in new code (constructor DI also exists in older code)

```typescript
@Component({
  selector: 'app-example',
  imports: [CommonModule, RouterModule],
  template: `
    @if (isLoading()) {
      <p>Loading...</p>
    }
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class ExampleComponent {
  private service = inject(SomeService);
  isLoading = signal(false);
}
```

### Services

- Use `@Injectable({ providedIn: 'root' })` for all services
- State management via Angular **signals** — no external state library
- Persist state with `localStorage` using `polytalk-` prefixed keys

### TypeScript

- **Strict mode** is enabled (`strict: true` in tsconfig)
- `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride` are all enabled
- Target: ES2022, Module: ES2022, `bundler` module resolution
- Interfaces: PascalCase, no `I` prefix (e.g., `AppSettings`, `Language`)
- Classes: PascalCase (e.g., `SettingsService`, `HomeComponent`)
- Properties/methods: camelCase
- Private readonly constants: UPPER_SNAKE_CASE
- Prefer `const` over `let`; never use `var`

### Imports

- Angular imports first, then third-party, then local — separated by blank lines when grouping is clear
- Use named exports; no default exports
- Multi-line imports when destructuring several symbols:

```typescript
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
```

### Templates

- Use new Angular control flow: `@if`, `@for`, `@let`, `@switch`
- Do NOT use legacy structural directives (`*ngIf`, `*ngFor`)
- Use `@for` with `track` expression (required in Angular 19)

### CSS / Styling

- Plain CSS with CSS custom properties for theming (light/dark mode)
- No CSS preprocessor or CSS framework
- Inline styles in components using the `styles` array
- Global styles in `src/styles.css`

### Error Handling

- Use `try/catch` with `async/await`
- Log errors with `console.error()`
- No global error handler or error reporting service currently

### HTTP / Data

- Use native `fetch()` for HTTP calls (no Angular `HttpClient`)
- Translation data is hardcoded in `language.service.ts`
- Blog content served as static markdown files; index generated by `scripts/generate-blog-index.js`

### Routing

- Routes defined in `src/app/app.routes.ts`
- Core pages eagerly loaded; secondary pages (privacy, terms, about) use `loadComponent` for lazy loading
- Route params accessed via Angular's `ActivatedRoute`

## Project Structure

```
src/
  app/
    components/     # Shared/reusable components (navbar, footer, root)
    pages/          # Route-level page components
    services/       # Injectable services (language, settings, speech, theme, blog)
    app.component.ts
    app.config.ts
    app.routes.ts
  assets/           # Static assets, blog markdown files
  styles.css        # Global styles
  index.html
  main.ts
e2e/                # Playwright e2e tests
scripts/            # Build scripts (blog index generator)
src-tauri/          # Tauri desktop app configuration and Rust source
```

## CI/CD

- **Deploy workflow** (`.github/workflows/deploy.yml`): Builds Angular app, runs e2e tests, deploys to GitHub Pages
- **Release workflow** (`.github/workflows/release.yml`): Builds Tauri desktop apps for Windows/macOS/Linux
- Unit tests are currently **not run in CI** (commented out)
- E2e tests run against the built app in CI
