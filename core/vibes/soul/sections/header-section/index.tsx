'use client';

import { forwardRef, useEffect, useState } from 'react';
// import Headroom from 'react-headroom';

import { Banner } from '@/vibes/soul/primitives/banner';
import { Navigation } from '@/vibes/soul/primitives/navigation';

// Define the shape of a page link
interface PageLink {
  name: string;
  path?: string | null;
  link?: string | null;
}

interface Props {
  navigation: React.ComponentPropsWithoutRef<typeof Navigation>;
  banner?: React.ComponentPropsWithoutRef<typeof Banner>;
  pageLinks?: PageLink[]; // 👈 new prop
}

export const HeaderSection = forwardRef<React.ComponentRef<'div'>, Props>(
  ({ navigation, banner, pageLinks }, ref) => {
    const [bannerElement, setBannerElement] = useState<HTMLElement | null>(null);
    const [bannerHeight, setBannerHeight] = useState(0);
    const [isFloating, setIsFloating] = useState(false);

    useEffect(() => {
      if (!bannerElement) return;

      const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const entry of entries) {
          setBannerHeight(entry.contentRect.height);
        }
      });

      resizeObserver.observe(bannerElement);

      return () => {
        resizeObserver.disconnect();
      };
    }, [bannerElement]);

    const ALLOWED_LINKS = [
      'Contact Us',
      'Blog',
      'Information',
      'About Us',
      'Shipping & Returns',
      'bundleb2b',
    ];

    const filteredLinks = pageLinks?.filter((link) =>
      ALLOWED_LINKS.includes(link.name),
    )

    return (
      <div ref={ref}>
        {banner && <Banner ref={setBannerElement} {...banner} />}
        <div
          // onUnfix={() => setIsFloating(false)}
          // onUnpin={() => setIsFloating(true)}
          // pinStart={bannerHeight}
        >
          <div className="">
            <div className='bg-[#E5E7EE] h-auto w-full mx-auto xxs:hidden lg:block'> 
              <div className='flex justify-between items-center h-[45px] w-[90%] max-w-screen-2xl mx-auto'> 
                <p className='font-[family-name:var(--nav-link-font-family,var(--font-family-body))] text-[14px]'>FREE SHIPPING ON ALL ORDERS - OFFER ENDS DEC 31.</p>
                <div>
                  <ul className="flex space-x-4 items-center">
                    {filteredLinks?.map((link) => {
                      const isBundleB2B = link.name === 'bundleb2b';

                      const baseClasses =
                        'font-[family-name:var(--nav-link-font-family,var(--font-family-body))] text-[14px]';

                      const bundleClasses =
                        'bg-[#AA1F23] text-white px-3 py-1 rounded';

                      const className = isBundleB2B
                        ? `${baseClasses} ${bundleClasses}`
                        : baseClasses;

                      return (
                        <li key={link.name}>
                          {link.path ? (
                            <a className={className} href={link.path}>
                              {link.name}
                            </a>
                          ) : link.link ? (
                            <a
                              className={className}
                              href={link.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.name}
                            </a>
                          ) : (
                            <span className={className}>{link.name}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <Navigation {...navigation} isFloating={isFloating} />
          </div>
        </div>
      </div>
    );
  },
);

HeaderSection.displayName = 'HeaderSection';
