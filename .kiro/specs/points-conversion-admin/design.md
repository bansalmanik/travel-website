# Design Document

## Overview

This design document outlines the architecture for migrating the points conversion system from a JSON-based data store to Cloudflare D1 (SQLite) database. The system will maintain the existing user-facing points calculator while moving data management to a database that can be directly managed through SQL queries or database tools.

The solution leverages Cloudflare's edge infrastructure for optimal performance and seamless integration with the existing Cloudflare Pages deployment. Data management will be done directly through the D1 database using Wrangler CLI or database management tools.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Cloudflare Pages                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Next.js Application                          │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  Points Calculator (Public)                      │ │ │
│  │  │  - Fetches conversion data from API              │ │ │
│  │  │  - Same UI as before                             │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ API Request
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Cloudflare Workers                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  API Route: /api/conversions                           │ │
│  │  - Queries D1 database                                 │ │
│  │  - Returns data in legacy JSON format                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ SQL Queries
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare D1 Database                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  SQLite Database (Edge-Replicated)                     │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │ │
│  │  │ programs │  │ cards    │  │ partners │           │ │
│  │  └──────────┘  └──────────┘  └──────────┘           │ │
│  │  ┌──────────────────────────────────────┐           │ │
│  │  │ conversion_rates                     │           │ │
│  │  └──────────────────────────────────────┘           │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │
                            │ Direct SQL Access
                            │
┌─────────────────────────────────────────────────────────────┐
│                   Database Management                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Wrangler CLI                                          │ │
│  │  - wrangler d1 execute                                 │ │
│  │  - Direct SQL queries                                  │ │
│  │  - Bulk imports                                        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Cloudflare Workers (serverless functions)
- **Database**: Cloudflare D1 (SQLite at the edge)
- **Authentication**: Session-based with encrypted cookies
- **File Storage**: Cloudflare Pages static assets (public directory)
- **Deployment**: Cloudflare Pages with Workers integration

## Components and Interfaces

### Database Layer

#### D1 Database Binding
```typescript
// types/cloudflare.ts
export interface Env {
  DB: D1Database;
  ADMIN_PASSWORD_HASH: string;
  SESSION_SECRET: string;
}
```

#### Database Client Wrapper
```typescript
// lib/db/client.ts
export class D1Client {
  constructor(private db: D1Database) {}
  
  async query<T>(sql: string, params: any[]): Promise<T[]>
  async execute(sql: string, params: any[]): Promise<D1Result>
  async transaction<T>(callback: (tx: D1Transaction) => Promise<T>): Promise<T>
}
```

### API Layer (Cloudflare Workers)

#### Authentication Middleware
```typescript
// functions/api/_middleware.ts
export async function onRequest(context: EventContext<Env>) {
  const { request, env, next } = context;
  
  // Verify session cookie
  const session = await verifySession(request, env.SESSION_SECRET);
  
  if (!session && isAdminRoute(request.url)) {
    return Response.redirect('/admin/login');
  }
  
  context.data.session = session;
  return next();
}
```

#### Programs API
```typescript
// functions/api/programs.ts
export async function onRequestGet(context: EventContext<Env>) {
  // GET /api/programs - List all programs
}

export async function onRequestPost(context: EventContext<Env>) {
  // POST /api/programs - Create new program
}

export async function onRequestPut(context: EventContext<Env>) {
  // PUT /api/programs/:id - Update program
}

export async function onRequestDelete(context: EventContext<Env>) {
  // DELETE /api/programs/:id - Delete program
}
```

#### Cards API
```typescript
// functions/api/cards.ts
export async function onRequestGet(context: EventContext<Env>) {
  // GET /api/cards?programId=X - List cards for program
}

export async function onRequestPost(context: EventContext<Env>) {
  // POST /api/cards - Create new card
}

export async function onRequestPut(context: EventContext<Env>) {
  // PUT /api/cards/:id - Update card
}

export async function onRequestDelete(context: EventContext<Env>) {
  // DELETE /api/cards/:id - Delete card
}
```

#### Conversion Rates API
```typescript
// functions/api/conversion-rates.ts
export async function onRequestGet(context: EventContext<Env>) {
  // GET /api/conversion-rates?cardId=X - List rates for card
}

export async function onRequestPost(context: EventContext<Env>) {
  // POST /api/conversion-rates - Create new rate
}

export async function onRequestPut(context: EventContext<Env>) {
  // PUT /api/conversion-rates/:id - Update rate
}

export async function onRequestDelete(context: EventContext<Env>) {
  // DELETE /api/conversion-rates/:id - Delete rate
}
```

#### Public Conversions Query API
```typescript
// functions/api/conversions.ts
export async function onRequestGet(context: EventContext<Env>) {
  // GET /api/conversions - Get all enabled conversions for calculator
  // Returns data in same format as current JSON structure
}
```

### Frontend Layer

#### Admin Pages Structure
```
app/
├── admin/
│   ├── layout.tsx              # Admin layout with navigation
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard overview
│   ├── programs/
│   │   ├── page.tsx            # Programs list
│   │   ├── [id]/
│   │   │   ├── page.tsx        # Program detail
│   │   │   └── edit/
│   │   │       └── page.tsx    # Edit program
│   │   └── new/
│   │       └── page.tsx        # Create program
│   ├── cards/
│   │   ├── [id]/
│   │   │   ├── page.tsx        # Card detail
│   │   │   └── edit/
│   │   │       └── page.tsx    # Edit card
│   │   └── new/
│   │       └── page.tsx        # Create card
│   ├── partners/
│   │   ├── page.tsx            # Partners list
│   │   ├── [id]/
│   │   │   └── edit/
│   │   │       └── page.tsx    # Edit partner
│   │   └── new/
│   │       └── page.tsx        # Create partner
│   └── conversion-rates/
│       ├── [id]/
│       │   └── edit/
│       │       └── page.tsx    # Edit rate
│       └── new/
│           └── page.tsx        # Create rate
```

#### Admin Components
```typescript
// app/admin/components/ProgramForm.tsx
export function ProgramForm({ 
  program?: Program, 
  onSubmit: (data: ProgramFormData) => Promise<void> 
}) {
  // Form for creating/editing programs
}

// app/admin/components/CardForm.tsx
export function CardForm({ 
  card?: Card, 
  programId: string,
  onSubmit: (data: CardFormData) => Promise<void> 
}) {
  // Form for creating/editing cards
}

// app/admin/components/ConversionRateForm.tsx
export function ConversionRateForm({ 
  rate?: ConversionRate,
  cardId: string,
  partners: Partner[],
  onSubmit: (data: RateFormData) => Promise<void> 
}) {
  // Form for creating/editing conversion rates
}

// app/admin/components/ImageUpload.tsx
export function ImageUpload({ 
  currentImage?: string,
  onUpload: (file: File) => Promise<string> 
}) {
  // Image upload component with preview
}
```

## Data Models

### Database Schema

```sql
-- Programs table
CREATE TABLE programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  enabled INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Cards table
CREATE TABLE cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  enabled INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
  UNIQUE(program_id, name)
);

-- Partners table (transfer destinations)
CREATE TABLE partners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  enabled INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Conversion rates table
CREATE TABLE conversion_rates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id INTEGER NOT NULL,
  partner_id INTEGER NOT NULL,
  rate TEXT NOT NULL,
  insight TEXT,
  annual_cap TEXT,
  group_type TEXT,
  enabled INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
  FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE,
  UNIQUE(card_id, partner_id, rate)
);

-- Indexes for performance
CREATE INDEX idx_cards_program_id ON cards(program_id);
CREATE INDEX idx_cards_enabled ON cards(enabled);
CREATE INDEX idx_conversion_rates_card_id ON conversion_rates(card_id);
CREATE INDEX idx_conversion_rates_partner_id ON conversion_rates(partner_id);
CREATE INDEX idx_conversion_rates_enabled ON conversion_rates(enabled);
CREATE INDEX idx_programs_enabled ON programs(enabled);
CREATE INDEX idx_partners_enabled ON partners(enabled);
```

### TypeScript Types

```typescript
// types/database.ts
export interface Program {
  id: number;
  name: string;
  logo_url: string | null;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Card {
  id: number;
  program_id: number;
  name: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: number;
  name: string;
  logo_url: string | null;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface ConversionRate {
  id: number;
  card_id: number;
  partner_id: number;
  rate: string;
  insight: string | null;
  annual_cap: string | null;
  group_type: string | null;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

// Extended types with relations
export interface CardWithProgram extends Card {
  program: Program;
}

export interface ConversionRateWithDetails extends ConversionRate {
  card: CardWithProgram;
  partner: Partner;
}

// API response types
export interface ConversionData {
  program: string;
  from: string;
  rates: {
    rate: string;
    partners: {
      to: string;
      insight: string;
      enabled: boolean;
    }[];
    enabled: boolean;
  }[];
  enabled: boolean;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Data migration preserves all information

*For any* record in the source JSON file, after migration completes, querying the database should return equivalent data with all fields preserved and relationships maintained.

**Validates: Requirements 1.1, 1.2, 1.3**

### Property 2: Authentication prevents unauthorized access

*For any* admin route request without a valid session, the system should redirect to the login page and prevent access to protected resources.

**Validates: Requirements 2.1, 2.2, 2.3**

### Property 3: CRUD operations maintain referential integrity

*For any* delete operation on a program or card, all dependent records (cards, conversion rates) should be automatically removed through cascade deletion.

**Validates: Requirements 5.5, 12.5**

### Property 4: Enabled status filtering is consistent

*For any* query to the public conversions API, only records where enabled=true for program, card, partner, and rate should be included in results.

**Validates: Requirements 9.3, 10.2, 10.3, 10.4**

### Property 5: Form validation prevents invalid data

*For any* form submission with invalid data (empty required fields, duplicate names, invalid formats), the system should reject the submission and display specific error messages without persisting changes.

**Validates: Requirements 4.1, 4.5, 11.1, 11.2, 11.3**

### Property 6: Logo uploads maintain file integrity

*For any* uploaded image file, if the file size is under 2MB and format is valid, the system should store the file and return a valid URL that serves the correct image.

**Validates: Requirements 8.1, 8.2, 8.3**

### Property 7: Search filtering matches correctly

*For any* search query string, the filtered results should include only items where the name contains the query string (case-insensitive).

**Validates: Requirements 13.1, 13.2, 13.3, 13.4**

### Property 8: Bulk import handles errors gracefully

*For any* CSV import with mixed valid and invalid rows, the system should import all valid rows, skip invalid rows, and report both successes and failures in the summary.

**Validates: Requirements 14.2, 14.3, 14.4**

### Property 9: API responses match legacy format

*For any* query to the conversions API, the response structure should match the original JSON format exactly, ensuring backward compatibility with the existing points calculator.

**Validates: Requirements 9.1, 9.2, 9.4**

### Property 10: SQL injection prevention

*For any* user input used in database queries, the system should use parameterized queries that prevent SQL injection attacks.

**Validates: Requirements 12.3**

### Property 11: Session security

*For any* admin session, the session token should be encrypted, httpOnly, and expire after a reasonable timeout period.

**Validates: Requirements 2.2, 2.3, 2.4**

### Property 12: Duplicate prevention

*For any* attempt to create a program, card, or partner with a name that already exists, the system should reject the operation and display a clear error message.

**Validates: Requirements 1.5, 4.1, 11.3**

## Error Handling

### Database Errors

```typescript
class DatabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public query?: string
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Usage in Workers
try {
  const result = await env.DB.prepare(query).bind(...params).all();
} catch (error) {
  console.error('Database query failed:', { query, params, error });
  throw new DatabaseError(
    'Failed to execute database query',
    'DB_QUERY_ERROR',
    query
  );
}
```

### API Error Responses

```typescript
// lib/api/errors.ts
export function errorResponse(
  message: string,
  status: number = 500,
  details?: any
): Response {
  return new Response(
    JSON.stringify({
      error: message,
      details,
      timestamp: new Date().toISOString()
    }),
    {
      status,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

// Usage
if (!programName) {
  return errorResponse('Program name is required', 400);
}
```

### Frontend Error Handling

```typescript
// app/admin/hooks/useApiMutation.ts
export function useApiMutation<T>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE'
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const mutate = async (data: any): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request failed');
      }
      
      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return { mutate, loading, error };
}
```

### Validation Errors

```typescript
// lib/validation.ts
export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public value: any
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateProgramName(name: string): void {
  if (!name || name.trim().length === 0) {
    throw new ValidationError(
      'Program name is required',
      'name',
      name
    );
  }
  
  if (name.length > 100) {
    throw new ValidationError(
      'Program name must be less than 100 characters',
      'name',
      name
    );
  }
}
```

## Testing Strategy

### Unit Testing

Unit tests will verify individual functions and components:

- **Validation functions**: Test all validation rules with valid and invalid inputs
- **Data transformation**: Test JSON-to-database conversion logic
- **API utilities**: Test request/response formatting
- **React components**: Test rendering and user interactions

Example:
```typescript
// lib/validation.test.ts
describe('validateProgramName', () => {
  it('should accept valid program names', () => {
    expect(() => validateProgramName('Axis')).not.toThrow();
    expect(() => validateProgramName('HDFC Bank')).not.toThrow();
  });
  
  it('should reject empty names', () => {
    expect(() => validateProgramName('')).toThrow(ValidationError);
    expect(() => validateProgramName('   ')).toThrow(ValidationError);
  });
  
  it('should reject names over 100 characters', () => {
    const longName = 'A'.repeat(101);
    expect(() => validateProgramName(longName)).toThrow(ValidationError);
  });
});
```

### Integration Testing

Integration tests will verify API endpoints and database interactions:

- **API routes**: Test CRUD operations with test database
- **Authentication flow**: Test login, session management, logout
- **File uploads**: Test image upload and storage
- **Migration script**: Test with sample JSON data

Example:
```typescript
// functions/api/programs.test.ts
describe('Programs API', () => {
  let testDb: D1Database;
  
  beforeEach(async () => {
    testDb = await createTestDatabase();
  });
  
  it('should create a new program', async () => {
    const response = await fetch('/api/programs', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test Program' })
    });
    
    expect(response.status).toBe(201);
    const program = await response.json();
    expect(program.name).toBe('Test Program');
  });
  
  it('should reject duplicate program names', async () => {
    await createProgram(testDb, 'Axis');
    
    const response = await fetch('/api/programs', {
      method: 'POST',
      body: JSON.stringify({ name: 'Axis' })
    });
    
    expect(response.status).toBe(400);
  });
});
```

### Property-Based Testing

Property-based tests will verify correctness properties across many inputs using a testing library like `fast-check`:

- **Property 1**: Migration preserves data
- **Property 5**: Form validation prevents invalid data
- **Property 7**: Search filtering matches correctly
- **Property 9**: API responses match legacy format
- **Property 10**: SQL injection prevention

Example:
```typescript
// lib/migration.test.ts
import fc from 'fast-check';

describe('Property 1: Migration preserves data', () => {
  it('should preserve all fields when migrating programs', () => {
    fc.assert(
      fc.property(
        fc.record({
          program: fc.string({ minLength: 1, maxLength: 50 }),
          from: fc.string({ minLength: 1, maxLength: 100 }),
          rates: fc.array(fc.record({
            rate: fc.string(),
            partners: fc.array(fc.record({
              to: fc.string(),
              insight: fc.string(),
              enabled: fc.boolean()
            }))
          }))
        }),
        async (jsonRecord) => {
          // Migrate the record
          const migrated = await migrateConversion(jsonRecord);
          
          // Query back from database
          const retrieved = await queryConversion(migrated.id);
          
          // Verify all fields match
          expect(retrieved.program).toBe(jsonRecord.program);
          expect(retrieved.from).toBe(jsonRecord.from);
          expect(retrieved.rates.length).toBe(jsonRecord.rates.length);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### End-to-End Testing

E2E tests will verify complete user workflows:

- **Admin login flow**: Login → Dashboard → Create program → Logout
- **Program management**: Create → Edit → Disable → Enable → Delete
- **Card management**: Create card → Add conversion rates → Edit → Delete
- **Points calculator**: Verify calculator works with database data

Example using Playwright:
```typescript
// e2e/admin-workflow.spec.ts
test('admin can create and manage a program', async ({ page }) => {
  // Login
  await page.goto('/admin/login');
  await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD);
  await page.click('button[type="submit"]');
  
  // Navigate to programs
  await page.click('text=Programs');
  await page.click('text=Add Program');
  
  // Create program
  await page.fill('input[name="name"]', 'Test Bank');
  await page.click('button[type="submit"]');
  
  // Verify creation
  await expect(page.locator('text=Test Bank')).toBeVisible();
});
```

### Testing Framework Configuration

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:integration": "vitest --config vitest.integration.config.ts",
    "test:e2e": "playwright test"
  },
  "devDependencies": {
    "vitest": "^1.0.0",
    "@playwright/test": "^1.40.0",
    "fast-check": "^3.15.0"
  }
}
```
