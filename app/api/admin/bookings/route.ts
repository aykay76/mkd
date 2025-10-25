import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Force dynamic rendering - don't try to statically generate at build time
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

let prisma: PrismaClient

function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  return prisma
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    
    const bookings = await getPrismaClient().booking.findMany({
      include: {
        customer: true,
        service: true
      },
      orderBy: { scheduledDate: 'desc' },
      take: limit ? parseInt(limit) : undefined
    })
    
    return NextResponse.json({ bookings })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { bookingId, status, internalNotes } = await request.json()
    
    const booking = await getPrismaClient().booking.update({
      where: { id: bookingId },
      data: {
        status,
        internalNotes,
        completedAt: status === 'completed' ? new Date() : undefined
      },
      include: {
        customer: true,
        service: true
      }
    })
    
    return NextResponse.json({ success: true, booking })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}
