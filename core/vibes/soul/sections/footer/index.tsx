import { clsx } from 'clsx';
import { ReactNode } from 'react';

import { Stream, Streamable } from '@/vibes/soul/lib/streamable';
import { Logo } from '@/vibes/soul/primitives/logo';
import * as Skeleton from '@/vibes/soul/primitives/skeleton';
import { Link } from '~/components/link';

interface Image {
  src: string;
  alt: string;
}

interface Link {
  href: string;
  label: string;
}

export interface Section {
  title?: string;
  links: Link[];
}

interface SocialMediaLink {
  href: string;
  icon: ReactNode;
}

interface ContactInformation {
  address?: string;
  phone?: string;
}

export interface FooterProps {
  logo: Streamable<string | Image>;
  sections: Streamable<Section[]>;
  copyright?: Streamable<string>;
  contactInformation?: Streamable<ContactInformation>;
  paymentIcons?: Streamable<ReactNode[]>;
  socialMediaLinks?: Streamable<SocialMediaLink[]>;
  contactTitle?: string;
  className?: string;
  logoHref?: string;
  logoLabel?: string;
  logoWidth?: number;
  logoHeight?: number;
}

// eslint-disable-next-line valid-jsdoc
/**
 * This component supports various CSS variables for theming. Here's a comprehensive list, along
 * with their default values:
 *
 * ```css
 * :root {
 *   --footer-focus: hsl(var(--primary));
 *   --footer-background: hsl(var(--background));
 *   --footer-border-top: hsl(var(--contrast-100));
 *   --footer-border-bottom: hsl(var(--primary));
 *   --footer-contact-title: hsl(var(--contrast-500));
 *   --footer-contact-text: hsl(var(--foreground));
 *   --footer-social-icon: hsl(var(--contrast-400));
 *   --footer-social-icon-hover: hsl(var(--foreground));
 *   --footer-section-title: hsl(var(--foreground));
 *   --footer-link: hsl(var(--contrast-500));
 *   --footer-link-hover: hsl(var(--foreground));
 *   --footer-copyright: hsl(var(--contrast-500));
 * }
 * ```
 */
export const Footer = ({
  logo,
  sections: streamableSections,
  contactTitle = 'Contact Us',
  contactInformation: streamableContactInformation,
  paymentIcons: streamablePaymentIcons,
  socialMediaLinks: streamableSocialMediaLinks,
  copyright: streamableCopyright,
  className,
  logoHref = '#',
  logoLabel = 'Home',
  logoWidth = 200,
  logoHeight = 40,
}: FooterProps) => {
  return (
    <footer
      className={clsx(
        'group/footer border-b-4 border-t border-b-[var(--footer-border-bottom,hsl(var(--primary)))] border-t-[var(--footer-border-top,hsl(var(--contrast-100)))] bg-[var(--footer-background,hsl(var(--background)))] @container border-[0px] border-none',
        className,
      )}
    >
      <div className="mx-auto bg-[#DFE3EA]">
        <div className="flex flex-col justify-between gap-x-16 gap-y-12 @3xl:flex-row max-w-[1536px] xxs:w-[95%] lg:w-[90%] mx-auto pt-[60px] pb-[20px] xxs:px-[24px]">
          <div className="flex flex-col gap-4 @3xl:w-1/3 @3xl:gap-6 xxs:!w-[100%] md:!w-[20%]">
            {/* Logo Information */}
            <div className="flex items-center justify-start self-stretch">
              <Logo
                className="flex"
                height={logoHeight}
                href={logoHref}
                label={logoLabel}
                logo={logo}
                width={logoWidth}
              />
            </div>

            {/* Contact Information */}
            {/* <Stream fallback={<FooterContactSkeleton />} value={streamableContactInformation}>
              {(contactInformation) => {
                if (contactInformation?.address != null || contactInformation?.phone != null) {
                  return (
                    <div className="mb-4 text-lg font-medium @lg:text-xl">
                      <h3 className="text-[var(--footer-contact-title,hsl(var(--contrast-500)))]">
                        {contactTitle}
                      </h3>
                      <div className="text-[var(--footer-contact-text,hsl(var(--foreground)))]">
                        {contactInformation.address != null &&
                          contactInformation.address !== '' && <p>{contactInformation.address}</p>}
                        {contactInformation.phone != null && contactInformation.phone !== '' && (
                          <p>{contactInformation.phone}</p>
                        )}
                      </div>
                    </div>
                  );
                }
              }}
            </Stream> */}
            <div>
              <p>U.S. Rigging Supply is your trusted partner for rope, safety and rigging products</p>
            </div>

            {/* custom icon container */}
            <div className='w-auto'>
              <div className='flex items-center justify-start gap-[12px]'>
                <img className='w-[46px] h-[45px] object-contain' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/cs-icon.png?t=1771987367'/>
                <div>
                  <p className='text-[#666666] text-[13px] leading-[125%]'>Call Us Toll-Free</p>
                  <p className='text-[#0D1E47] text-[16px] font-[700]'>Call(888) 260-7444</p>
                  <p className='text-[#666666] text-[13px] leading-[125%]'>8am - 5pm PST (Mon - fri)</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <Stream fallback={<SocialMediaLinksSkeleton />} value={streamableSocialMediaLinks}>
              {(socialMediaLinks) => {
                if (socialMediaLinks != null) {
                  return (
                    <div className="flex items-center gap-3">
                      {socialMediaLinks.map(({ href, icon }, i) => {
                        return (
                          <Link
                            className="flex items-center justify-center rounded-lg fill-[var(--footer-social-icon,hsl(var(--contrast-400)))] p-1 ring-[var(--footer-focus,hsl(var(--primary)))] transition-colors duration-300 ease-out hover:fill-[var(--footer-social-icon-hover,hsl(var(--foreground)))] focus-visible:outline-0 focus-visible:ring-2"
                            href={href}
                            key={i}
                          >
                            {icon}
                          </Link>
                        );
                      })}
                    </div>
                  );
                }
              }}
            </Stream>
          </div>

          {/* Footer Columns of Links */}
          <Stream fallback={<FooterColumnsSkeleton />} value={streamableSections}>
            {(sections) => {
              if (sections.length > 0) {
                return (
                  <div
                    className={clsx(
                      'grid max-w-5xl grid-cols-1 gap-y-8 @sm:grid-cols-2 @xl:gap-y-10 @2xl:grid-cols-3 @6xl:[grid-template-columns:_repeat(auto-fill,_minmax(280px,_1fr))] !w-[80%]',
                    )}
                  >
                    {sections.map(({ title, links }, i) => (
                      <div className="pr-8" key={i}>
                        {title != null && (
                          <span className="mb-3 block font-semibold text-[var(--footer-section-title,hsl(var(--foreground)))] uppercase">
                            {title}
                          </span>
                        )}

                        <ul>
                          {links.map((link, idx) => {
                            return (
                              <li key={idx}>
                                <Link
                                  className="footer-menus block rounded-lg py-[.4rem] text-[var(--footer-link,hsl(var(--contrast-500)))] ring-[var(--footer-focus,hsl(var(--primary)))] transition-colors duration-300 hover:text-[#0D1E47] focus-visible:outline-0 focus-visible:ring-2 text-[#596582] text-[14px] font-[400]"
                                  href={link.href}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              }
            }}
          </Stream>
        </div>

        <div className="bg-[#0D1E47] h-[50px] flex flex-col-reverse items-start gap-y-8 @3xl:flex-row @3xl:items-center">
          <div className='max-w-[1536px] w-[100%] mx-auto flex items-center justify-center'>
            {/* Copyright */}
            <Stream fallback={<CopyrightSkeleton />} value={streamableCopyright}>
              {(copyright) => {
                if (copyright != null) {
                  return (
                      <p className="flex-1 text-sm text-[var(--footer-copyright,hsl(var(--contrast-500)))] !text-[#fff]">
                        {copyright}
                      </p>
                  );
                }
              }}
            </Stream>

            {/* Payment Icons */}
            <Stream fallback={<PaymentIconsSkeleton />} value={streamablePaymentIcons}>
              {(paymentIcons) => {
                if (paymentIcons != null) {
                  return <div className="flex flex-wrap gap-2 text-[#ffffff]">{paymentIcons}</div>;
                }
              }}
            </Stream>
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterContactSkeleton() {
  return (
    <Skeleton.Root
      className="mb-4 text-lg group-has-[[data-pending]]/footer:animate-pulse @lg:text-xl"
      pending
    >
      <Skeleton.Text characterCount={10} className="rounded" data-pending />
      <Skeleton.Text characterCount={15} className="rounded" data-pending />
      <Skeleton.Text characterCount={12} className="rounded" data-pending />
    </Skeleton.Root>
  );
}

function SocialMediaLinksSkeleton() {
  return (
    <Skeleton.Root className="group-has-[[data-pending]]/footer:animate-pulse" pending>
      <div className="flex items-center gap-3" data-pending>
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton.Box className="h-8 w-8 rounded-full" key={idx} />
        ))}
      </div>
    </Skeleton.Root>
  );
}

function FooterColumnsSkeleton() {
  return (
    <Skeleton.Root
      className="grid max-w-5xl grid-cols-1 gap-y-8 @container-normal group-has-[[data-pending]]/footer:animate-pulse @sm:grid-cols-2 @xl:gap-y-10 @2xl:grid-cols-3 @6xl:[grid-template-columns:_repeat(auto-fill,_minmax(220px,_1fr))]"
      pending
    >
      {Array.from({ length: 4 }).map((_, idx) => (
        <div className="pr-8" data-pending key={idx}>
          <div className="mb-3 flex items-center">
            <Skeleton.Text characterCount={10} className="rounded" />
          </div>
          <FooterColumnSkeleton />
        </div>
      ))}
    </Skeleton.Root>
  );
}

function FooterColumnSkeleton() {
  return (
    <ul>
      {Array.from({ length: 4 }).map((_, idx) => (
        <li className="py-2 text-sm" key={idx}>
          <Skeleton.Text characterCount={10} className="rounded" />
        </li>
      ))}
    </ul>
  );
}

function CopyrightSkeleton() {
  return (
    <Skeleton.Root
      className="flex-1 text-sm @container-normal group-has-[[data-pending]]/footer:animate-pulse"
      pending
    >
      <Skeleton.Text characterCount={40} className="rounded" data-pending />
    </Skeleton.Root>
  );
}

function PaymentIconsSkeleton() {
  return (
    <Skeleton.Root
      className="flex flex-wrap gap-2 @container-normal group-has-[[data-pending]]/footer:animate-pulse"
      pending
    >
      {Array.from({ length: 6 }).map((_, idx) => (
        <Skeleton.Box className="h-6 w-[2.1875rem] rounded" data-pending key={idx} />
      ))}
    </Skeleton.Root>
  );
}
