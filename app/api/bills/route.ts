import { NextResponse } from 'next/server';
import { mockBills } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category');
  
  let bills = [...mockBills];
  
  if (category) {
    bills = bills.filter(bill => bill.category === category);
  }
  
  bills = bills.slice(0, limit);
  
  return NextResponse.json({
    success: true,
    data: bills,
    count: bills.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real app, this would:
    // 1. Validate the data
    // 2. Upload documents to cloud storage
    // 3. Create a database record
    // 4. Send notification to admin for verification
    // 5. Send confirmation email to user
    
    console.log('New bill submission:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Bill submitted successfully',
      data: {
        id: `bill_${Date.now()}`,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      },
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to submit bill',
    }, { status: 400 });
  }
}
