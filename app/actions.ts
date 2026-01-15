'use server'

import { supabase } from '@/lib/supabaseClient'
import { Confession } from '@/lib/types'

export async function getConfessions(): Promise<Confession[]> {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  
  const { data, error } = await supabase
    .from('confessions')
    .select('*')
    .gte('created_at', twentyFourHoursAgo)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching confessions:', error)
    return []
  }

  return data || []
}

export async function submitConfession(text: string): Promise<Confession | null> {
  const { data, error } = await supabase
    .from('confessions')
    .insert([{ text }])
    .select()
    .single()

  if (error) {
    console.error('Error submitting confession:', error)
    return null
  }

  return data
}

export async function witnessConfession(id: number): Promise<boolean> {
  // First get current witnesses count
  const { data: current, error: fetchError } = await supabase
    .from('confessions')
    .select('witnesses')
    .eq('id', id)
    .single()

  if (fetchError) {
    console.error('Error fetching current witnesses:', fetchError)
    return false
  }

  // Then increment it
  const { error } = await supabase
    .from('confessions')
    .update({ witnesses: current.witnesses + 1 })
    .eq('id', id)

  if (error) {
    console.error('Error witnessing confession:', error)
    return false
  }

  return true
}
