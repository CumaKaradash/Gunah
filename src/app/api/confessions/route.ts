import { NextRequest, NextResponse } from 'next/server'
import { ConfessionService } from '@/services/confession-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const sinCategory = searchParams.get('sin_category') as any

    let confessions
    if (sinCategory) {
      confessions = await ConfessionService.getConfessionsByCategory(sinCategory, limit, offset)
    } else {
      confessions = await ConfessionService.getConfessions(limit, offset)
    }

    return NextResponse.json(confessions)
  } catch (error) {
    console.error('Error fetching confessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch confessions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, sin_category, author_name, is_anonymous } = body

    if (!content || !sin_category) {
      return NextResponse.json(
        { error: 'Content and sin category are required' },
        { status: 400 }
      )
    }

    const confession = await ConfessionService.createConfession({
      content,
      sin_category,
      author_name,
      is_anonymous
    })

    return NextResponse.json(confession, { status: 201 })
  } catch (error) {
    console.error('Error creating confession:', error)
    return NextResponse.json(
      { error: 'Failed to create confession' },
      { status: 500 }
    )
  }
}
