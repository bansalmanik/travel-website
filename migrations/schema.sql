-- Points Conversion Database Schema
-- Flexible design supporting any-to-any conversions with transfer bonuses

-- 1. Programs table (top-level grouping: Axis, HDFC, Singapore Airlines, etc.)
CREATE TABLE IF NOT EXISTS programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,                  -- 'credit_card_issuer', 'airline', 'hotel_chain'
  logo_url TEXT,
  enabled INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 2. Point sources (anything that can give or receive points)
CREATE TABLE IF NOT EXISTS point_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_id INTEGER,                  -- Links to programs.id (nullable for standalone)
  name TEXT NOT NULL,                  -- 'Axis Magnus', 'KrisFlyer', 'Marriott Bonvoy'
  type TEXT NOT NULL,                  -- 'credit_card', 'airline_miles', 'hotel_points', 'bank_points'
  logo_url TEXT,
  enabled INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE SET NULL,
  UNIQUE(program_id, name)
);

-- 3. Conversion rates (any source to any source)
CREATE TABLE IF NOT EXISTS conversion_rates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_source_id INTEGER NOT NULL,     -- Source of points
  to_source_id INTEGER NOT NULL,       -- Destination of points
  rate TEXT NOT NULL,                  -- '5:4', '1:1', '2:3'
  insight TEXT,                        -- Description/notes
  annual_cap TEXT,                     -- '3,00,000'
  group_type TEXT,                     -- 'Group A', 'Group B'
  enabled INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (from_source_id) REFERENCES point_sources(id) ON DELETE CASCADE,
  FOREIGN KEY (to_source_id) REFERENCES point_sources(id) ON DELETE CASCADE,
  CHECK (from_source_id != to_source_id),
  UNIQUE(from_source_id, to_source_id, rate)
);

-- 4. Transfer bonuses (time-limited promotions)
CREATE TABLE IF NOT EXISTS transfer_bonuses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversion_rate_id INTEGER NOT NULL, -- Links to base conversion rate
  bonus_percentage INTEGER NOT NULL,   -- 25, 30, 50 (for 25%, 30%, 50% bonus)
  bonus_description TEXT,              -- '30% transfer bonus'
  start_date TEXT NOT NULL,            -- '2024-01-01'
  end_date TEXT NOT NULL,              -- '2024-03-31'
  terms TEXT,                          -- Additional terms/conditions
  enabled INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversion_rate_id) REFERENCES conversion_rates(id) ON DELETE CASCADE,
  CHECK (end_date > start_date)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_point_sources_program_id ON point_sources(program_id);
CREATE INDEX IF NOT EXISTS idx_point_sources_type ON point_sources(type);
CREATE INDEX IF NOT EXISTS idx_conversion_rates_from ON conversion_rates(from_source_id);
CREATE INDEX IF NOT EXISTS idx_conversion_rates_to ON conversion_rates(to_source_id);
CREATE INDEX IF NOT EXISTS idx_transfer_bonuses_conversion_rate ON transfer_bonuses(conversion_rate_id);
CREATE INDEX IF NOT EXISTS idx_transfer_bonuses_dates ON transfer_bonuses(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_programs_enabled ON programs(enabled);
CREATE INDEX IF NOT EXISTS idx_point_sources_enabled ON point_sources(enabled);
CREATE INDEX IF NOT EXISTS idx_conversion_rates_enabled ON conversion_rates(enabled);
CREATE INDEX IF NOT EXISTS idx_transfer_bonuses_enabled ON transfer_bonuses(enabled);
