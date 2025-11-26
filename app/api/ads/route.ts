import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Ad from '@/models/Ad';

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    const placement = searchParams.get('placement');

    // If ID is provided, return single ad
    if (id) {
      const ad = await Ad.findById(id);
      
      if (!ad) {
        return NextResponse.json(
          {
            success: false,
            message: 'Ad not found'
          },
          { status: 404 }
        );
      }

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
        message: 'Ad fetched successfully'
      });
    }

    // Build query for multiple ads
    let query: any = {};

    if (status) {
      query.isActive = status === 'active';
    }

    if (placement) {
      query.placement = placement;
    }

    const ads = await Ad.find(query).sort({ createdAt: -1 });

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
    
    const body = await request.json();
    
    if (!body.title) {
      return NextResponse.json(
        {
          success: false,
          message: 'Title is required'
        },
        { status: 400 }
      );
    }

    if (!body.videoUrl) {
      return NextResponse.json(
        {
          success: false,
          message: 'Video URL is required'
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

export async function PUT(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Ad ID is required'
        },
        { status: 400 }
      );
    }

    const ad = await Ad.findById(body.id);
    
    if (!ad) {
      return NextResponse.json(
        {
          success: false,
          message: 'Ad not found'
        },
        { status: 404 }
      );
    }

    // Update allowed fields
    if (body.title !== undefined) ad.title = body.title;
    if (body.videoUrl !== undefined) ad.videoUrl = body.videoUrl;
    if (body.linkUrl !== undefined) ad.linkUrl = body.linkUrl;
    if (body.isActive !== undefined) ad.isActive = body.isActive;
    if (body.placement !== undefined) ad.placement = body.placement;

    await ad.save();

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
      message: 'Ad updated successfully'
    });

  } catch (error) {
    console.error('Error updating ad:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update ad'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Ad ID is required'
        },
        { status: 400 }
      );
    }

    const ad = await Ad.findByIdAndDelete(id);
    
    if (!ad) {
      return NextResponse.json(
        {
          success: false,
          message: 'Ad not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Ad deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting ad:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete ad'
      },
      { status: 500 }
    );
  }
}