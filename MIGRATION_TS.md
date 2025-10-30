# TypeScript Migration Guide

This document outlines the step-by-step process for migrating XCARBON from JavaScript/JSX to TypeScript.

## Migration Strategy

We follow a **bottom-up approach**: migrate foundational layers first (services, stores) before moving to components and pages. This ensures type safety propagates upward through the dependency tree.

## Migration Order

### Phase 1: Services Layer (`src/services/`)

**Goal**: Type all API calls, requests, and responses.

Files to migrate:

- `apiClient.js` → `apiClient.ts`
- `authService.js` → `authService.ts`
- `dashboardService.js` → `dashboardService.ts`
- All other `*Service.js` files

**Steps for each service file**:

1. Rename `.js` to `.ts`
2. Define request/response interfaces:

   ```typescript
   interface LoginRequest {
     email: string;
     password: string;
   }

   interface LoginResponse {
     token: string;
     user: User;
   }
   ```

3. Type function parameters and return types:
   ```typescript
   export const login = async (data: LoginRequest): Promise<LoginResponse> => {
     // implementation
   };
   ```
4. Replace `any` with proper types where possible
5. Run `yarn type-check` to validate

### Phase 2: Store Layer (`src/store/`)

**Goal**: Type Zustand stores with proper state interfaces.

Files to migrate:

- `store.js` → `store.ts`
- `authStore.js` → `authStore.ts`
- All other store files

**Steps for each store file**:

1. Rename `.js` to `.ts`
2. Define state interface:
   ```typescript
   interface AuthState {
     user: User | null;
     token: string | null;
     isAuthenticated: boolean;
     login: (credentials: LoginRequest) => Promise<void>;
     logout: () => void;
   }
   ```
3. Type the Zustand store:
   ```typescript
   export const useAuthStore = create<AuthState>()((set, get) => ({
     // implementation
   }));
   ```
4. Export typed hooks for components
5. Run `yarn type-check` to validate

### Phase 3: Core Components (`src/components/`)

**Goal**: Convert reusable UI primitives to typed React components.

Priority order:

1. `Button/index.jsx` → `Button/index.tsx`
2. `Input/index.jsx` → `Input/index.tsx`
3. `Typography/index.jsx` → `Typography/index.tsx`
4. `Card/index.jsx` → `Card/index.tsx`

**Steps for each component**:

1. Rename `.jsx` to `.tsx`
2. Define Props interface:
   ```typescript
   interface ButtonProps {
     variant?: "primary" | "secondary" | "ghost";
     size?: "sm" | "md" | "lg";
     onClick?: () => void;
     disabled?: boolean;
     children: React.ReactNode;
   }
   ```
3. Type the component:
   ```typescript
   export const Button: React.FC<ButtonProps> = ({
     variant = "primary",
     size = "md",
     onClick,
     disabled,
     children,
   }) => {
     // implementation
   };
   ```
4. Remove PropTypes in favor of TypeScript types
5. Update Storybook stories to `.tsx` if they exist
6. Run `yarn type-check` and fix errors

### Phase 4: Complex Components

**Goal**: Migrate larger components with more dependencies.

Files:

- `Table/index.jsx` → `Table/index.tsx`
- `Chart/index.jsx` → `Chart/index.tsx`
- `Modals/*` → TypeScript
- `Form/*` → TypeScript

**Additional considerations**:

- Table components may need generic types for data rows
- Chart wrappers need Chart.js types
- Modal components need proper children typing

### Phase 5: Pages & App (`src/pages/`, `App.jsx`, `main.jsx`)

**Goal**: Complete the migration by typing all page components and app entry.

Files:

- All page files under `src/pages/`
- `App.jsx` → `App.tsx`
- `main.jsx` → `main.tsx`
- `routes.jsx` → `routes.tsx`

**Steps**:

1. Migrate page components following component migration pattern
2. Type route definitions with `react-router-dom` types
3. Update `App.tsx` and `main.tsx` with proper types
4. Ensure all imports use correct `.ts`/`.tsx` extensions where needed
5. Final `yarn type-check` must pass with zero errors

## Common Patterns

### Typing Event Handlers

```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // implementation
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // implementation
};
```

### Typing Children

```typescript
interface Props {
  children: React.ReactNode; // Most flexible
  // or
  children: JSX.Element; // Single element
  // or
  children: React.ReactElement<PropsType>; // Specific type
}
```

### Typing Refs

```typescript
const inputRef = useRef<HTMLInputElement>(null);
```

### Typing useState

```typescript
const [user, setUser] = useState<User | null>(null);
const [count, setCount] = useState<number>(0);
```

### Typing Custom Hooks

```typescript
function useAuth(): AuthState {
  return useAuthStore();
}
```

## Handling Third-Party Libraries Without Types

If a library doesn't have `@types/*` package:

1. Check DefinitelyTyped first: `yarn add -D @types/library-name`
2. If not available, create `src/types/vendors.d.ts`:
   ```typescript
   declare module "library-name" {
     export function someFunction(param: string): void;
     // Add minimal declarations needed
   }
   ```
3. Document with TODO to replace with proper types later

## Dealing with `any`

Use `any` only as a last resort:

1. Try `unknown` first if the type is truly unknown
2. Use `TODO` comments with owner when using `any`:
   ```typescript
   // TODO: @username - Type this properly once backend schema is available
   const data: any = await fetchData();
   ```
3. Track all `any` usages and create issues to remove them

## Validation Checklist (Per Batch)

Before committing a migration batch:

- [ ] `yarn type-check` passes
- [ ] `yarn lint` passes
- [ ] `yarn test` (or `yarn vitest`) passes
- [ ] Storybook stories still render correctly
- [ ] No runtime errors in dev mode (`yarn dev`)
- [ ] Git commit with descriptive message

## Troubleshooting

### "Cannot find module" errors

- Ensure `paths` in `tsconfig.json` includes `@/*` alias
- Check import statements use correct extensions (`.ts`/`.tsx`)

### "Type X is not assignable to type Y"

- Check for strict null checks - add `| null` or `| undefined` where needed
- Verify interface properties match actual data structure

### Circular dependency errors

- Refactor shared types into separate `types.ts` files
- Use type-only imports: `import type { User } from './types'`

## Progress Tracking

Use the following format in commits:

```
chore(ts): migrate services layer to TypeScript

- Converted apiClient.js to apiClient.ts
- Added request/response interfaces for auth endpoints
- All type checks passing

Related: #123
```

---

**Last updated**: 2025-10-30  
**Status**: Active Migration
