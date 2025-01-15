import { NextResponse } from 'next/server';
import { mockFilterOptions } from '@/lib/mock/products';

export async function GET() {
  try {
    return NextResponse.json(mockFilterOptions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch filter options' },
      { status: 500 }
    );
  }
} 