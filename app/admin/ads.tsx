import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Ad from '@/models/Ad';

export async function GET() {
  try {
    await dbConnect();

    const ads = await Ad.find({}).sort({ createdAt: -1 });

    const transformedAds = ads.map(ad => ({
      id: ad._id.toString(),
      title: ad.title,
      videoUrl: ad.videoUrl,
      linkUrl: ad.linkUrl || '#',
      isActive: ad.isActive,
      placement: ad.placement,
      createdAt: ad.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      ads: transformedAds,
      message: 'Ads fetched successfully',
      count: transformedAds.length
    });

  } catch (error) {
    console.error('Error fetching ads:', error);
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
    
    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('multipart/form-data')) {
      // Handle form data (file upload)
      const formData = await request.formData();
      const title = formData.get('title') as string;
      const placement = formData.get('placement') as string;
      const isActive = formData.get('isActive') === 'true';
      
      // For now, we'll just create with a placeholder video URL
      // In a real app, you'd upload the file to cloud storage
      const ad = await Ad.create({
        title,
        videoUrl: 'https://example.com/placeholder-video.mp4', // Replace with actual file URL
        linkUrl: '#',
        isActive,
        placement: placement as "home" | "other",
      });

      const transformedAd = {
        id: ad._id.toString(),
        title: ad.title,
        videoUrl: ad.videoUrl,
        linkUrl: ad.linkUrl,
        isActive: ad.isActive,
        placement: ad.placement,
        createdAt: ad.createdAt.toISOString(),
      };

      return NextResponse.json({
        success: true,
        ad: transformedAd,
        message: 'Ad created successfully'
      }, { status: 201 });
      
    } else {
      // Handle JSON data
      const body = await request.json();
      
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
        createdAt: ad.createdAt.toISOString(),
      };

      return NextResponse.json({
        success: true,
        ad: transformedAd,
        message: 'Ad created successfully'
      }, { status: 201 });
    }

  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create ad'
      },
      { status: 500 }
    );
  }
}