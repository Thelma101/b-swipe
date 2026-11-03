import { NextResponse } from 'next/server';
import { mockStats } from '@/lib/mockData';

export async function GET() {
  // In a real app, this would query the database for real-time stats
  
  return NextResponse.json({
    success: true,
    data: mockStats,
    timestamp: new Date().toISOString(),
  });
}
