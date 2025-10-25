import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    
    const bookings = await prisma.booking.findMany({
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
    
    const booking = await prisma.booking.update({
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
