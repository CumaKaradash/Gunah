import { supabase } from '@/lib/supabase'
import { 
  Confession, 
  ConfessionWithReactions, 
  CreateConfessionData, 
  CreateReactionData,
  SinCategory,
  ReactionType 
} from '@/types/confession'

export class ConfessionService {
  // Get all confessions with reaction counts
  static async getConfessions(limit = 50, offset = 0): Promise<ConfessionWithReactions[]> {
    const { data, error } = await supabase
      .from('confessions')
      .select(`
        *,
        confession_reaction_counts(
          like_count,
          dislike_count,
          total_reactions
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    
    return data.map(confession => ({
      ...confession,
      like_count: confession.confession_reaction_counts?.[0]?.like_count || 0,
      dislike_count: confession.confession_reaction_counts?.[0]?.dislike_count || 0,
      total_reactions: confession.confession_reaction_counts?.[0]?.total_reactions || 0,
      confession_reaction_counts: undefined
    }))
  }

  // Get confessions by sin category
  static async getConfessionsByCategory(
    sinCategory: SinCategory, 
    limit = 50, 
    offset = 0
  ): Promise<ConfessionWithReactions[]> {
    const { data, error } = await supabase
      .from('confessions')
      .select(`
        *,
        confession_reaction_counts(
          like_count,
          dislike_count,
          total_reactions
        )
      `)
      .eq('sin_category', sinCategory)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    
    return data.map(confession => ({
      ...confession,
      like_count: confession.confession_reaction_counts?.[0]?.like_count || 0,
      dislike_count: confession.confession_reaction_counts?.[0]?.dislike_count || 0,
      total_reactions: confession.confession_reaction_counts?.[0]?.total_reactions || 0,
      confession_reaction_counts: undefined
    }))
  }

  // Get a single confession by ID
  static async getConfessionById(id: string): Promise<ConfessionWithReactions | null> {
    const { data, error } = await supabase
      .from('confessions')
      .select(`
        *,
        confession_reaction_counts(
          like_count,
          dislike_count,
          total_reactions
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw error
    }
    
    return {
      ...data,
      like_count: data.confession_reaction_counts?.[0]?.like_count || 0,
      dislike_count: data.confession_reaction_counts?.[0]?.dislike_count || 0,
      total_reactions: data.confession_reaction_counts?.[0]?.total_reactions || 0,
      confession_reaction_counts: undefined
    }
  }

  // Create a new confession
  static async createConfession(confessionData: CreateConfessionData): Promise<Confession> {
    const { data, error } = await supabase
      .from('confessions')
      .insert({
        content: confessionData.content,
        sin_category: confessionData.sin_category,
        author_name: confessionData.author_name || null,
        is_anonymous: confessionData.is_anonymous ?? true
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Add or update a reaction to a confession
  static async addReaction(reactionData: CreateReactionData): Promise<void> {
    // First, check if user already reacted to this confession
    const { data: existingReaction } = await supabase
      .from('confession_reactions')
      .select('*')
      .eq('confession_id', reactionData.confession_id)
      .eq('user_id', reactionData.user_id || 'anonymous')
      .single()

    if (existingReaction) {
      // Update existing reaction
      const { error } = await supabase
        .from('confession_reactions')
        .update({
          reaction_type: reactionData.reaction_type,
          created_at: new Date().toISOString()
        })
        .eq('id', existingReaction.id)

      if (error) throw error
    } else {
      // Create new reaction
      const { error } = await supabase
        .from('confession_reactions')
        .insert({
          confession_id: reactionData.confession_id,
          reaction_type: reactionData.reaction_type,
          user_id: reactionData.user_id || 'anonymous'
        })

      if (error) throw error
    }
  }

  // Get reactions for a specific confession
  static async getConfessionReactions(confessionId: string): Promise<{
    like_count: number;
    dislike_count: number;
    total_reactions: number;
  }> {
    const { data, error } = await supabase
      .from('confession_reaction_counts')
      .select('*')
      .eq('confession_id', confessionId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return { like_count: 0, dislike_count: 0, total_reactions: 0 }
      }
      throw error
    }

    return data
  }

  // Get user's reaction for a specific confession
  static async getUserReaction(
    confessionId: string, 
    userId: string = 'anonymous'
  ): Promise<ReactionType | null> {
    const { data, error } = await supabase
      .from('confession_reactions')
      .select('reaction_type')
      .eq('confession_id', confessionId)
      .eq('user_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data.reaction_type
  }
}
