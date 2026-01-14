import { NextRequest, NextResponse } from 'next/server'
import { ConfessionService } from '@/services/confession-service'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const confession = await ConfessionService.getConfessionById(id)
    
    if (!confession) {
      return NextResponse.json(
        { error: 'Confession not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(confession)
  } catch (error) {
    console.error('Error fetching confession:', error)
    return NextResponse.json(
      { error: 'Failed to fetch confession' },
      { status: 500 }
    )
  }
}
