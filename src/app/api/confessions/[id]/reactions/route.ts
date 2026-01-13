import { NextRequest, NextResponse } from 'next/server'
import { ConfessionService } from '@/services/confession-service'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { reaction_type, user_id } = body

    if (!reaction_type || !['like', 'dislike'].includes(reaction_type)) {
      return NextResponse.json(
        { error: 'Valid reaction_type (like or dislike) is required' },
        { status: 400 }
      )
    }

    await ConfessionService.addReaction({
      confession_id: params.id,
      reaction_type,
      user_id: user_id || 'anonymous'
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error adding reaction:', error)
    return NextResponse.json(
      { error: 'Failed to add reaction' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id') || 'anonymous'

    const [reactions, userReaction] = await Promise.all([
      ConfessionService.getConfessionReactions(params.id),
      ConfessionService.getUserReaction(params.id, userId)
    ])

    return NextResponse.json({
      ...reactions,
      user_reaction: userReaction
    })
  } catch (error) {
    console.error('Error fetching reactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reactions' },
      { status: 500 }
    )
  }
}
