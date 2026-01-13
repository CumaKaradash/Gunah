-- Create confessions table
CREATE TABLE IF NOT EXISTS confessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  sin_category TEXT NOT NULL CHECK (sin_category IN ('Pride', 'Greed', 'Lust', 'Envy', 'Gluttony', 'Wrath', 'Sloth')),
  author_name VARCHAR(255),
  is_anonymous BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_confessions_created_at ON confessions(created_at DESC);
CREATE INDEX idx_confessions_sin_category ON confessions(sin_category);

-- Enable RLS (Row Level Security)
ALTER TABLE confessions ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public confessions are viewable by everyone"
  ON confessions FOR SELECT
  USING (true);

-- Create policy for insertions (anyone can create a confession)
CREATE POLICY "Anyone can create a confession"
  ON confessions FOR INSERT
  WITH CHECK (true);

-- Create policy for updates (only own confessions)
CREATE POLICY "Users can update own confessions"
  ON confessions FOR UPDATE
  USING (auth.uid()::text = author_name);

-- Create policy for deletions (only own confessions)
CREATE POLICY "Users can delete own confessions"
  ON confessions FOR DELETE
  USING (auth.uid()::text = author_name);
