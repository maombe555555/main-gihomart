'use client';

import { useEffect } from 'react';

interface AdUnitProps {
  adSlot: string;
  adFormat?: string;
  fullWidth?: boolean;
}

export default function AdUnit({ adSlot, adFormat = 'auto', fullWidth = true }: AdUnitProps) {
  useEffect(() => {
    // Push ads when component mounts
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-4421520005037655"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidth ? 'true' : 'false'}
    />
  );
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
