# BanqueApp

Application de gestion d'une agence bancaire (portfolio), construite pour démontrer une maîtrise pratique d'**Angular 22** — standalone, signals, zoneless, Signal Forms — à travers un cas d'usage concret plutôt qu'un tutoriel isolé.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.0.

## Fonctionnalités

- **Authentification** — login (Signal Forms), garde de route (`authGuard`), intercepteur HTTP (`authInterceptor`), session persistée en `localStorage`
- **Clients** — CRUD complet (`p-table`, `p-dialog`, `p-confirmDialog`), fiche détail avec bascule lecture/édition
- **Comptes** — création avec validateur IBAN personnalisé, changement de statut (actif/suspendu/clôturé) via `p-confirmDialog`, formatage IBAN/solde
- **Dashboard** — cartes de statistiques agrégées, 2 graphiques (`p-chart`) alimentés par les données réelles des comptes, 1 graphique d'évolution du solde cumulé dans le temps à partir des transactions
- **Transactions** — page complète à venir (dépôts/retraits/virements, historique)

## Concepts Angular 22 mis en œuvre

**Architecture**
- Standalone components partout, aucun `NgModule`
- Routing 100% lazy-loadé (`loadComponent`) sauf le point d'entrée dashboard
- Zoneless (`provideBrowserGlobalErrorListeners`, pas de Zone.js) — pas de `changeDetection: OnPush` explicite car redondant en zoneless
- `withComponentInputBinding()` pour relier automatiquement les paramètres de route (`:id`) aux `input()` des composants

**State management (signals)**
- `signal()` / `computed()` / `effect()` dans les services (`ClientService`, `CompteService`, `TransactionService`, `AuthService`) et les composants
- Agrégations avec `computed()` : sommes (`.reduce()`), comptages (`.filter().length`), regroupements par catégorie (`.reduce()` vers un objet-compteurs), cumuls dans le temps (`.reduce()` vers un tableau, après un `.sort()` chronologique défensif)
- Aucune donnée UI dans un `BehaviorSubject`

**HTTP & services**
- `@Service()` (remplace `@Injectable({ providedIn: 'root' })`), `inject()` partout (jamais d'injection par constructeur)
- `HttpClient` pour toutes les mutations (POST/PATCH), `httpResource()` pour la lecture réactive (fiche client par id)
- Intercepteur HTTP (token Bearer), backend simulé avec `json-server`

**Formulaires**
- **Signal Forms** (`form()`, `FormField`, `FormRoot`, `required`, `validate`, `submit()`) pour les formulaires simples : login, ajout client, ajout compte
- Validateur personnalisé réutilisable (`estIbanFrancaisValide`) partagé entre un `validate()` Signal Forms et un validateur Reactive Forms classique (`ibanFrancaisValidator`)

**Templates & contrôle de flux**
- Control flow natif (`@if`, `@switch`) — jamais de `*ngIf`/`*ngFor`
- `@defer` (triggers `on viewport`, `prefetch on idle`, blocs `@placeholder`/`@loading`) sur les sections lourdes du dashboard (graphiques `p-chart`), avec split de bundle vérifié via `ng build`
- Content projection avec slot nommé (`SectionCard`, wrapper de carte réutilisable)

**PrimeNG**
- `p-table` (tri, filtre, templates), `p-dialog` / `p-confirmDialog`, `p-toast` (`MessageService`), `p-chart` (donut, line), `p-card`, `p-tag`, `p-avatar`, `p-divider`, `p-select`, `p-inputnumber`, `p-inputtext`, `p-button`
- Thème personnalisé (`definePreset` sur Aura) aux couleurs de la marque

**Pipes, directives & validateurs personnalisés**
- Pipes : `formatSolde` (devise via `Intl.NumberFormat`), `formatIban` (regroupement par blocs de 4)
- Directive : `appMontantNegatif` (`input()` + `effect()`, colore un montant selon son signe)
- Validateur IBAN français (regex + logique métier extraite en fonction pure, réutilisée des deux côtés Reactive/Signal Forms)

**Tests**
- Vitest pour les tests unitaires : services (mock HTTP via `HttpTestingController`), pipes, directives, guards, composants
- Tests e2e (Playwright) et audit d'accessibilité ARIA : à venir

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
