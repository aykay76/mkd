import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const service = await prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        basePrice: parseFloat(data.basePrice),
        duration: parseInt(data.duration),
        category: data.category,
        isActive: data.isActive ?? true,
        order: data.order ?? 0
      }
    })
    
    return NextResponse.json({ success: true, service })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
