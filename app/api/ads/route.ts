import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Ad from '@/models/Ad';

// Simple in-memory ads for testing (replace with your database)
const mockAds = [
  {
    id: 1,
    title: "Test Ad 1",
    videoUrl: "https://example.com/ad1.mp4",
    duration: 15
  },
  {
    id: 2, 
    title: "Test Ad 2",
    videoUrl: "https://example.com/ad2.mp4",
    duration: 20
  }
];

export async function GET() {
  try {
    console.log('📦 API: Fetching ads...');
    
    // TODO: Replace with your actual database query
    // const ads = await db.collection('ads').find({}).toArray();
    
    // For now, return mock data to test the API
    return NextResponse.json({ 
      success: true, 
      ads: mockAds 
    });
    
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch ads from database' 
      },
      { status: 500 }
    );
  }
}