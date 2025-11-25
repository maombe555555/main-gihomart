import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Ad, { AdType } from '@/models/Ad';

export async function GET() {
  try {
    await dbConnect();

    // Fetch only active ads for home placement
    const ads = await Ad.find({ 
      isActive: true,
      placement: 'home'
    }).sort({ createdAt: -1 }); // Sort by newest first

    // Transform the data to match your frontend interface
    const transformedAds = ads.map(ad => ({
      id: ad._id.toString(),
      videoUrl: ad.videoUrl,
      linkUrl: ad.linkUrl || '#', // Provide fallback if linkUrl doesn't exist in schema
      title: ad.title,
      isActive: ad.isActive,
      placement: ad.placement,
      // Add any other fields you need
    }));

    return NextResponse.json({
      success: true,
      ads: transformedAds,
      message: 'Ads fetched successfully',
      count: transformedAds.length
    });

  } catch (error) {
    console.error('Mongoose Error fetching ads:', error);
    return NextResponse.json(
      {
        success: false,
        ads: [],
        message: 'Failed to fetch ads from database'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.videoUrl) {
      return NextResponse.json(
        {
          success: false,
          message: 'Title and videoUrl are required'
        },
        { status: 400 }
      );
    }

    const ad = await Ad.create({
      title: body.title,
      videoUrl: body.videoUrl,
      linkUrl: body.linkUrl || '#',
      isActive: body.isActive !== undefined ? body.isActive : true,
      placement: body.placement || 'home',
    });

    const transformedAd = {
      id: ad._id.toString(),
      title: ad.title,
      videoUrl: ad.videoUrl,
      linkUrl: ad.linkUrl,
      isActive: ad.isActive,
      placement: ad.placement,
      createdAt: ad.createdAt,
    };

    return NextResponse.json({
      success: true,
      ad: transformedAd,
      message: 'Ad created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Mongoose Error creating ad:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create ad'
      },
      { status: 500 }
    );
  }
}