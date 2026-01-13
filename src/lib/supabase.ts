import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      confessions: {
        Row: {
          id: string
          content: string
          sin_category: 'Pride' | 'Greed' | 'Lust' | 'Envy' | 'Gluttony' | 'Wrath' | 'Sloth'
          author_name: string | null
          is_anonymous: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          sin_category: 'Pride' | 'Greed' | 'Lust' | 'Envy' | 'Gluttony' | 'Wrath' | 'Sloth'
          author_name?: string | null
          is_anonymous?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          sin_category?: 'Pride' | 'Greed' | 'Lust' | 'Envy' | 'Gluttony' | 'Wrath' | 'Sloth'
          author_name?: string | null
          is_anonymous?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      confession_reactions: {
        Row: {
          id: string
          confession_id: string
          reaction_type: 'forgive' | 'condemn'
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          confession_id: string
          reaction_type: 'forgive' | 'condemn'
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          confession_id?: string
          reaction_type?: 'forgive' | 'condemn'
          user_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      confession_reaction_counts: {
        Row: {
          confession_id: string
          forgive_count: number
          condemn_count: number
          total_reactions: number
        }
      }
    }
  }
}
