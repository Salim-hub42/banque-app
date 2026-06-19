# BanqueApp — Instructions pour Claude Code

Tu es un expert Angular 22, TypeScript et développement d'applications web scalables.
Tu écris du code fonctionnel, maintenable, performant et accessible en suivant
les meilleures pratiques Angular 22.

---

## Contexte du projet

Application de gestion d'une agence bancaire (CRUD complète).
Elle gère les clients, les comptes bancaires et les transactions.
Objectif : démontrer la maîtrise complète d'Angular 22 pour les recruteurs.

### Fonctionnalités à implémenter
- Authentification avec guards de routes et intercepteurs
- Gestion des rôles (admin, conseiller, client)
- Gestion des clients (CRUD complet)
- Gestion des comptes bancaires (créer, clôturer, suspendre)
- Historique des transactions (virements, dépôts, retraits)
- Dashboard avec statistiques et graphiques

---

## Stack technique

- **Angular 22** — standalone, signals, zoneless, signal forms, reactive forms
- **TypeScript** — mode strict activé
- **PrimeNG** — composants UI (tableaux, formulaires, dialogs, charts, toasts...)
- **PrimeFlex** — système de grille et utilitaires CSS (pas de CSS custom pour la mise en page)
- **PrimeIcons** — icônes (`pi pi-user`, `pi pi-building-columns`...)
- **json-server** — API REST simulée en développement
- **Vitest** — framework de test par défaut depuis Angular 21 (Karma/Jasmine sont dépréciés)
- **Playwright** — tests e2e

---

## Nouveautés Angular 22 à utiliser obligatoirement

- **Zoneless par défaut** — pas de Zone.js, détection de changements signal-driven
- **Signal Forms (stable)** — remplace les Reactive Forms classiques, API signal-based
- **OnPush implicite en zoneless** — sans Zone.js, `Default` et `OnPush` se comportent identiquement ; ne pas écrire `changeDetection: OnPush` explicitement (redondant)
- **httpResource / rxResource** — pour les appels HTTP réactifs
- **Vitest** — framework de test officiel

---

## TypeScript — Bonnes pratiques

- Utiliser le mode strict (`strict: true` dans tsconfig)
- Préférer l'inférence de type quand le type est évident
- Ne jamais utiliser `any` — utiliser `unknown` si le type est incertain
- Toujours typer les modèles avec des `interface` (jamais des `class` pour les modèles)

---

## Angular — Règles fondamentales

- Toujours utiliser les **standalone components** (pas de NgModules)
- Ne PAS écrire `standalone: true` dans les décorateurs (c'est le défaut depuis Angular 20+)
- Utiliser les **signals** pour la gestion d'état (`signal()`, `computed()`, `effect()`)
- Implémenter le **lazy loading** sur chaque feature route
- Ne PAS utiliser `@HostBinding` et `@HostListener` — utiliser l'objet `host` dans `@Component` ou `@Directive`
- Utiliser `NgOptimizedImage` pour toutes les images statiques (ne fonctionne pas pour les base64)

---

## Composants

- Garder les composants petits avec une seule responsabilité
- Utiliser `input()` et `output()` (fonctions) au lieu des décorateurs `@Input()` et `@Output()`
- Utiliser `computed()` pour l'état dérivé
- **OnPush** est le défaut — ne pas utiliser `Default` sauf cas exceptionnel justifié
- Ne PAS utiliser `ngClass` — utiliser les bindings `[class]`
- Ne PAS utiliser `ngStyle` — utiliser les bindings `[style]`
- Utiliser des chemins relatifs pour les templates et styles externes

---

## Templates

- Garder les templates simples, sans logique complexe
- Utiliser le **nouveau control flow natif** : `@if`, `@for`, `@switch`, `@defer`
- Ne jamais utiliser `*ngIf`, `*ngFor`, `*ngSwitch`
- Utiliser `@defer` pour le chargement différé des sections lourdes
- Ne pas supposer que les globals (`new Date()`) sont disponibles dans les templates

---

## Formulaires — Reactive Forms & Signal Forms

- Utiliser les **Reactive Forms** (FormGroup, FormControl, FormArray, FormBuilder)
  pour les formulaires complexes et imbriqués (ex : formulaire client avec adresse)
- Utiliser les **Signal Forms** (stable Angular 22) pour les formulaires simples et réactifs
- Les deux approches coexistent — choisir selon la complexité du formulaire
- Implémenter des validateurs personnalisés (IBAN, montant, RIB...)
- Gérer les erreurs de formulaire de façon réactive

---

## Services & HTTP

- Concevoir les services autour d'une seule responsabilité
- Utiliser `providedIn: 'root'` pour les services singleton
- Utiliser `inject()` au lieu de l'injection par constructeur
- **HttpClient** — maîtriser GET, POST, PUT, DELETE avec typage générique
- **httpResource()** — pour les appels HTTP réactifs basés sur signals (Angular 22)
- Les deux coexistent : `HttpClient` pour le contrôle total, `httpResource()` pour la réactivité
- Intercepteurs HTTP pour : token auth, gestion des erreurs, indicateur de chargement

---

## State Management avec Signals

- `signal()` pour l'état local du composant
- `computed()` pour l'état dérivé
- `effect()` pour les effets de bord (avec parcimonie)
- Partage d'état entre composants via services avec signals
- Ne PAS utiliser `mutate()` — utiliser `update()` ou `set()`
- Ne PAS utiliser `BehaviorSubject` pour l'état UI

---

## PrimeNG — Composants à utiliser par fonctionnalité

### Tableaux & Listes
- `p-table` avec tri, filtre, pagination pour toutes les listes (clients, comptes, transactions)
- `p-paginator` pour la pagination standalone si besoin

### Formulaires
- `p-inputtext` — champs texte (nom, prénom, email...)
- `p-inputnumber` — montants, numéros
- `p-dropdown` — sélection de type de compte, statut, rôle
- `p-calendar` — dates d'ouverture, de naissance
- `p-password` — champ mot de passe (login)
- `p-checkbox` — options booléennes
- `p-inputmask` — format IBAN, numéro de téléphone

### Navigation & Layout
- `p-menubar` — barre de navigation principale
- `p-sidebar` — menu latéral
- `p-breadcrumb` — fil d'Ariane sur chaque page
- `p-tabview` — onglets (détail client : infos / comptes / transactions)

### Dialogs & Confirmations
- `p-dialog` — formulaires de création/édition
- `p-confirmDialog` — confirmation de suppression ou clôture de compte
- `p-dynamicDialog` — dialogs chargés dynamiquement

### Notifications & Feedback
- `p-toast` — notifications de succès/erreur après chaque action CRUD
- `p-message` — messages d'erreur inline dans les formulaires
- `p-progressBar` ou `p-progressSpinner` — indicateur de chargement

### Dashboard
- `p-chart` — graphiques (transactions par mois, répartition des comptes)
- `p-card` — cartes de statistiques (nombre de clients, solde total...)
- `p-knob` — indicateur de taux, performance

### Divers
- `p-tag` — statut des comptes (actif, suspendu, clôturé)
- `p-badge` — compteurs de notifications
- `p-avatar` — avatar client
- `p-timeline` — historique des transactions d'un compte

---

## Accessibilité (obligatoire)

- Doit passer tous les contrôles AXE
- Respecter les minimums WCAG AA : contraste, gestion du focus, attributs ARIA
- Utiliser **Angular ARIA** (stable depuis Angular 22)

---

## Conventions de nommage

- Composants   : `liste-clients.component.ts`
- Services     : `client.service.ts`
- Modèles      : `client.model.ts` (interface uniquement)
- Guards       : `auth.guard.ts`
- Pipes        : `format-iban.pipe.ts`
- Routes       : `client.routes.ts`
- Signaux      : `clients = signal<Client[]>([])`
- Computed     : `soldeTotal = computed(() => ...)`

---

## Tests

- **Vitest** pour les tests unitaires (défaut Angular 22, Karma/Jasmine dépréciés)
- **Playwright** pour les tests e2e
- Tester les signals, les services HTTP, les guards et les formulaires
- Ne jamais skipper les tests sur les fonctionnalités critiques (auth, transactions)

---

## Commandes CLI utiles

```bash
# Créer un composant
ng g c features/clients/components/liste-clients

# Créer un service
ng g s core/services/client

# Créer un guard
ng g g core/guards/auth

# Créer un pipe
ng g p shared/pipes/format-iban

# Lancer les tests Vitest
ng test

# Lancer un seul fichier de test
npx vitest run src/app/path/to/file.spec.ts

# Lancer les tests e2e Playwright
npx playwright test
```

---

## À ne jamais faire

- Ne jamais utiliser les NgModules
- Ne jamais utiliser `BehaviorSubject` pour l'état UI (utiliser les signals)
- Ne jamais utiliser le type `any`
- Ne jamais utiliser `*ngIf`, `*ngFor` (utiliser `@if`, `@for`)
- Ne jamais utiliser l'injection par constructeur (utiliser `inject()`)
- Ne jamais utiliser Karma ou Jasmine (dépréciés — utiliser Vitest)
- Ne jamais utiliser Angular Material (on utilise PrimeNG exclusivement)
- Ne jamais mélanger Signal Forms et Reactive Forms classiques dans le même formulaire
- Ne jamais ignorer l'accessibilité (aria-label, role, tabindex)

---

## Mode Formation — Ordre d'apprentissage

### Module 1 — Fondations Angular 22
- Structure du projet et architecture
- Standalone components
- Data binding (property, event, two-way)
- Signals : `signal()`, `computed()`, `effect()`
- Pipes intégrés et personnalisés
- Directives personnalisées

### Module 2 — Routing & Navigation
- Configuration des routes (`app.routes.ts`)
- Lazy loading par feature
- Route guards (`auth.guard.ts`, `role.guard.ts`)
- Paramètres de route et query params
- Navigation impérative vs déclarative

### Module 3 — Formulaires : Reactive Forms & Signal Forms
- Reactive Forms : FormGroup, FormControl, FormArray, FormBuilder
- Signal Forms (stable Angular 22)
- Quand choisir l'un ou l'autre
- Validateurs intégrés et personnalisés (IBAN, montant)
- Gestion réactive des erreurs
- Formulaires imbriqués (ex : adresse dans client)

### Module 4 — Services & HTTP
- Injection de dépendances avec `inject()`
- `httpResource()` pour les appels réactifs (Angular 22)
- Intercepteurs HTTP (token, erreurs, loading)
- json-server comme backend simulé

### Module 5 — State Management avec Signals
- `signal()`, `computed()`, `effect()`
- Partage d'état via services
- Zoneless change detection (OnPush implicite — ne pas l'écrire explicitement)

### Module 6 — PrimeNG & UI
- Composants de tableau (`p-table`)
- Formulaires PrimeNG
- Dialogs et confirmations
- Notifications (`p-toast`)
- Dashboard avec `p-chart`

### Module 7 — Fonctionnalités avancées
- Pipes personnalisés (format IBAN, devise)
- Directives personnalisées (permission)
- Content projection
- `@defer` pour le lazy rendering
- `ViewChild` avec signals

### Module 8 — Performance & Qualité
- Zoneless + OnPush
- `track` dans `@for` (`trackBy` est déprécié depuis Angular 17+)
- Blocs `@defer`, `@loading`, `@placeholder`
- Accessibilité avec Angular ARIA
- Tests unitaires avec Vitest
- Tests e2e avec Playwright

---

## Patterns avancés à démontrer

- Smart / Dumb components (container vs présentation)
- Repository pattern dans les services
- Optimistic UI updates avec signals
- Error boundaries avec @defer
- Custom validators réutilisables
- Token d'injection pour la configuration
