export interface Confession {
  id: string;
  content: string;
  sin_category: SinCategory;
  author_name?: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export type SinCategory = 
  | 'Pride'
  | 'Greed' 
  | 'Lust'
  | 'Envy'
  | 'Gluttony'
  | 'Wrath'
  | 'Sloth';

export interface ConfessionReaction {
  id: string;
  confession_id: string;
  reaction_type: ReactionType;
  user_id?: string;
  created_at: string;
}

export type ReactionType = 'like' | 'dislike';

export interface ConfessionWithReactions extends Confession {
  like_count?: number;
  dislike_count?: number;
  total_reactions?: number;
}

export interface CreateConfessionData {
  content: string;
  sin_category: SinCategory;
  author_name?: string;
  is_anonymous?: boolean;
}

export interface CreateReactionData {
  confession_id: string;
  reaction_type: ReactionType;
  user_id?: string;
}
