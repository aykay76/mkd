import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    // Get all bookings
    const allBookings = await prisma.booking.findMany()
    
    // Get monthly bookings
    const monthlyBookings = await prisma.booking.findMany({
      where: {
        createdAt: {
          gte: firstDayOfMonth
        }
      }
    })
    
    // Get all customers
    const customers = await prisma.customer.findMany()
    
    // Calculate stats
    const totalBookings = allBookings.length
    const pendingBookings = allBookings.filter(b => b.status === 'pending').length
    const completedBookings = allBookings.filter(b => b.status === 'completed').length
    
    const totalRevenue = allBookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + b.totalCost, 0)
    
    const monthlyRevenue = monthlyBookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + b.totalCost, 0)
    
    return NextResponse.json({
      totalBookings,
      pendingBookings,
      completedBookings,
      totalRevenue,
      monthlyRevenue,
      totalCustomers: customers.length
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
