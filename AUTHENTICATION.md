# Authentication Integration Guide

This guide explains how to integrate authentication into your dashboard application.

## Setup Admin User

First, create an admin user in the database:

```bash
npm run create-admin
```

**Default credentials:**
- Email: `admin@example.com`
- Password: `admin123`

**Custom credentials:**
```bash
ADMIN_EMAIL=youradmin@example.com ADMIN_PASSWORD=yourpassword npm run create-admin
```

## Database Schema

The admin user will be created with this structure in `mock-api/db.json`:

```json
{
  "id": 3,
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "hashed-password",
  "role": "Admin",
  "status": "active",
  "avatar": "https://i.pravatar.cc/150?img=3",
  "createdAt": "2024-11-03T10:00:00Z"
}
```

## Type Definitions

### User Types

```typescript
// For UI/API responses (no password)
export interface User extends BaseEntity {
  name: string;
  email: string;
  role: UserRole;
  status: Status;
  avatar?: string;
}

// For database (with password)
export interface DbUser extends User {
  password?: string;
}

// For authenticated users
export interface AuthUser extends User {
  token: string;
}
```

### Password Hashing

The script uses **SHA-256** for hashing (development only):

```javascript
const hashedPassword = createHash("sha256").update(password).digest("hex");
```

⚠️ **Production:** Use bcrypt or argon2 for password hashing.

## Integration Steps

### 1. Create Auth Service

Create `src/api/services/auth.service.ts`:

```typescript
import apiClient from "../client";
import type { AuthUser, DbUser } from "../../types/user.types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },
  
  getCurrentUser: async (): Promise<AuthUser> => {
    const response = await apiClient.get<AuthUser>("/auth/me");
    return response.data;
  },
};
```

### 2. Update Zustand Auth Store

The `useAuthStore` is already set up in `src/store/useAuthStore.ts`:

```typescript
import { useAuthStore } from "../../store/useAuthStore";

const LoginPage = () => {
  const { login } = useAuthStore();
  
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      login(response.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
};
```

### 3. Protect Routes

Add route protection in your router:

```typescript
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
```

### 4. Add API Interceptor

Update `src/api/client.ts` to add auth token:

```typescript
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 5. Create Login Page

Example login form:

```typescript
import { useState } from "react";
import { authService } from "../../api/services/auth.service";
import { useAuthStore } from "../../store/useAuthStore";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await authService.login({ email, password });
      login(response.user);
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-600">{error}</p>}
      <Button type="submit" isLoading={loading}>
        Login
      </Button>
    </form>
  );
};
```

## Backend Implementation

### Mock API Login Endpoint

Add to `mock-api/server.js`:

```javascript
import { createHash } from "crypto";

function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  const user = db.users.find((u) => u.email === email);
  
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  const hashedPassword = hashPassword(password);
  
  if (user.password !== hashedPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  
  // Generate fake JWT token
  const token = `fake-jwt-token-${Date.now()}`;
  
  res.json({
    user: { ...userWithoutPassword, token },
    token,
  });
});
```

## Security Best Practices

### Development

- ✅ Use SHA-256 (acceptable for dev/mock)
- ✅ Store passwords in database
- ✅ Don't expose passwords in API responses

### Production

- 🔒 Use bcrypt or argon2 for hashing (cost factor: 10–12)
- 🔒 Implement JWT with short-lived access tokens
- 🔒 Use refresh tokens for long-term sessions
- 🔒 Add rate limiting (5 attempts per 15 min)
- 🔒 Implement account lockout after failed attempts
- 🔒 Use HTTPS only
- 🔒 Add CSRF protection
- 🔒 Validate and sanitize all inputs
- 🔒 Implement password strength requirements
- 🔒 Add 2FA support
- 🔒 Log authentication events
- 🔒 Use secure HTTP-only cookies for tokens

## Testing

Test the admin user creation:

```bash
# Run the script
npm run create-admin

# Check the database
cat mock-api/db.json | grep -A 10 "admin@example.com"

# Verify password is hashed
# Should see a long hash string, not plain text
```

Test authentication flow:

1. Create admin: `npm run create-admin`
2. Start API: `npm run api`
3. Test login endpoint: `curl -X POST http://localhost:3000/api/auth/login -d '{"email":"admin@example.com","password":"admin123"}'`

## Troubleshooting

**Script fails:**
- Check that `mock-api/db.json` exists
- Verify Node.js is installed (v18+)

**Password hash mismatch:**
- Ensure same hashing algorithm is used everywhere
- In production, migrate from SHA-256 to bcrypt

**Admin already exists:**
- Script will prompt to update password
- Or delete existing admin from `db.json` manually

## Additional Resources

- [Zustand Guide](./ZUSTAND_GUIDE.md) - State management
- [Scripts README](./scripts/README.md) - Database utilities
- [Bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)

