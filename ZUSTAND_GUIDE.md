# Zustand State Management Guide

This project uses [Zustand](https://github.com/pmndrs/zustand) for global state management. Zustand provides a simple, unopinionated state management solution that integrates seamlessly with React.

## What Data Should Be Stored in Zustand?

### ✅ Good Candidates for Zustand

1. **Authentication State** - User login, logout, current user information

   - Shared across multiple components
   - Needs to persist across page refreshes
   - Used globally throughout the app

2. **User Preferences** - Settings, theme, language, notifications

   - Persistent user preferences
   - Shared across multiple components
   - Should survive page refreshes

3. **Global UI State** - Sidebar open/closed, modals, toasts
   - State that affects the entire application UI
   - Accessed from multiple components

### ❌ Not Good Candidates for Zustand

1. **Local Form State** - Use `react-hook-form` or `useState`
2. **Component-specific State** - Use `useState` or `useReducer`
3. **Server Data** - Use `React Query`, `SWR`, or custom hooks like `useFetch`
4. **Derived State** - Compute in components using `useMemo`

## Available Stores

### 1. Auth Store (`useAuthStore`)

Manages user authentication state.

**Location:** `src/store/useAuthStore.ts`

**Usage:**

```typescript
import { useAuthStore } from "../../store/useAuthStore";

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Access user data
  console.log(user?.name, user?.email, user?.role);

  // Login
  login({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    token: "abc123",
  });

  // Logout
  logout();
};
```

**State:**

- `user: AuthUser | null` - Current logged-in user
- `isAuthenticated: boolean` - Authentication status
- `login(user: AuthUser)` - Set authenticated user
- `logout()` - Clear user and authentication

**Persistence:** Stored in localStorage

---

### 2. Preferences Store (`usePreferencesStore`)

Manages user preferences for notifications and appearance.

**Location:** `src/store/usePreferencesStore.ts`

**Usage:**

```typescript
import { usePreferencesStore } from "../../store/usePreferencesStore";

const SettingsPage = () => {
  const { notifications, appearance, updateNotifications, updateAppearance } =
    usePreferencesStore();

  // Read current preferences
  console.log(notifications.email); // true/false
  console.log(appearance.darkMode); // true/false

  // Update notifications
  updateNotifications({ email: true, push: false });

  // Update appearance
  updateAppearance({ darkMode: true, language: "en-US" });
};
```

**State:**

**Notifications:**

- `email: boolean` - Email notifications
- `push: boolean` - Push notifications
- `weeklyDigest: boolean` - Weekly digest
- `marketing: boolean` - Marketing emails

**Appearance:**

- `darkMode: boolean` - Dark theme
- `compactMode: boolean` - Compact layout
- `language: string` - Selected language (e.g., "en-US")
- `timezone: string` - Selected timezone (e.g., "UTC-8")

**Actions:**

- `updateNotifications(preferences)` - Update notification preferences
- `updateAppearance(preferences)` - Update appearance preferences

**Persistence:** Stored in localStorage

---

## Examples

### Using Auth in Header Component

```typescript
import { useAuthStore } from "../../store/useAuthStore";

const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </header>
  );
};
```

### Using Preferences in Settings

See `src/pages/Settings/Settings.tsx` for a complete example of how to use the preferences store.

### Creating a New Store

If you need to add a new store:

```typescript
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MyStoreState {
  data: string[];
  addItem: (item: string) => void;
  removeItem: (index: number) => void;
}

export const useMyStore = create<MyStoreState>()(
  persist(
    (set) => ({
      data: [],
      addItem: (item) =>
        set((state) => ({
          data: [...state.data, item],
        })),
      removeItem: (index) =>
        set((state) => ({
          data: state.data.filter((_, i) => i !== index),
        })),
    }),
    {
      name: "my-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

**Key Points:**

- Use `create<>()` with TypeScript generics
- Use `persist` middleware for localStorage
- Keep actions simple and focused
- Use functional updates for immutability

---

## Best Practices

1. **Keep Stores Small** - Each store should manage one domain of state
2. **Use TypeScript** - Always define interfaces for your store state
3. **Persist Selectively** - Only persist data that should survive refreshes
4. **Use Actions** - Extract complex logic into actions, not directly in components
5. **Selector Optimization** - Destructure only what you need to avoid unnecessary re-renders

```typescript
// ✅ Good - only subscribes to specific data
const user = useAuthStore((state) => state.user);

// ❌ Bad - subscribes to entire store
const { user, isAuthenticated, login, logout } = useAuthStore();
```

---

## Further Reading

- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Zustand with TypeScript](https://docs.pmnd.rs/zustand/guides/typescript)
- [Persistence with Zustand](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
