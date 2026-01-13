-- Create reactions table for confessions
CREATE TABLE IF NOT EXISTS confession_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  confession_id UUID NOT NULL REFERENCES confessions(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('forgive', 'condemn')),
  user_id TEXT, -- Can be anonymous identifier or auth user ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(confession_id, user_id) -- One reaction per user per confession
);

-- Create indexes
CREATE INDEX idx_confession_reactions_confession_id ON confession_reactions(confession_id);
CREATE INDEX idx_confession_reactions_type ON confession_reactions(reaction_type);

-- Enable RLS
ALTER TABLE confession_reactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view reactions"
  ON confession_reactions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create a reaction"
  ON confession_reactions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own reactions"
  ON confession_reactions FOR UPDATE
  USING (user_id = auth.uid()::text);

CREATE POLICY "Users can delete own reactions"
  ON confession_reactions FOR DELETE
  USING (user_id = auth.uid()::text);

-- Create view for confession reaction counts
CREATE VIEW confession_reaction_counts AS
SELECT 
  c.id as confession_id,
  COUNT(CASE WHEN cr.reaction_type = 'forgive' THEN 1 END) as forgive_count,
  COUNT(CASE WHEN cr.reaction_type = 'condemn' THEN 1 END) as condemn_count,
  COUNT(cr.id) as total_reactions
FROM confessions c
LEFT JOIN confession_reactions cr ON c.id = cr.confession_id
GROUP BY c.id;
