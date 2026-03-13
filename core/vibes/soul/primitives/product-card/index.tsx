'use client';

import { clsx } from 'clsx';
import { startTransition, useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

import { Badge } from '@/vibes/soul/primitives/badge';
import { Price, PriceLabel } from '@/vibes/soul/primitives/price-label';
import { toast } from '@/vibes/soul/primitives/toaster';
import * as Skeleton from '@/vibes/soul/primitives/skeleton';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { addToCart } from '~/app/[locale]/(default)/compare/_actions/add-to-cart';

import { Rating } from '../rating';
import { Compare } from './compare';

export interface Product {
  id: string;
  title: string;
  href: string;
  image?: { src: string; alt: string };
  price?: Price;
  subtitle?: string;
  badge?: string;
  rating?: number;
  inventoryMessage?: string;
  numberOfReviews?: number;
}

export interface ProductCardProps {
  className?: string;
  colorScheme?: 'light' | 'dark';
  aspectRatio?: '5:6' | '3:4' | '1:1';
  showCompare?: boolean;
  imagePriority?: boolean;
  imageSizes?: string;
  compareLabel?: string;
  compareParamName?: string;
  product: Product;
  showRating?: boolean;
}

function AddToCartButton({ colorScheme }: { colorScheme: 'light' | 'dark' }) {
  const { pending } = useFormStatus();

  return (
    // <button
    //   className={clsx(
    //     'relative z-10 mt-3 w-full rounded-lg px-4 py-2 text-center text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50',
    //     {
    //       light: 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]',
    //       dark: 'bg-[hsl(var(--background))] text-[hsl(var(--foreground))]',
    //     }[colorScheme],
    //   )}
    //   disabled={pending}
    //   type="submit"
    // >
    //   {pending ? 'Adding...' : 'Add to Cart'}
    // </button>
    <button
      className={clsx(
        'relative z-10 mt-3 w-full rounded-[3px] px-4 py-2 text-center text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 bg-[#0D1E47] text-[#FFFFFF]',
      )}
      disabled={pending}
      type="submit"
    >
      {pending ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}

export function ProductCard({
  product: {
    id,
    title,
    subtitle,
    badge,
    price,
    image,
    href,
    inventoryMessage,
    rating,
    numberOfReviews,
  },
  showRating = true,
  colorScheme = 'light',
  className,
  showCompare = false,
  aspectRatio = '5:6',
  compareLabel,
  compareParamName,
  imagePriority = false,
  imageSizes = '(min-width: 80rem) 20vw, (min-width: 64rem) 25vw, (min-width: 42rem) 33vw, (min-width: 24rem) 50vw, 100vw',
}: ProductCardProps) {
  const [{ lastResult, successMessage }, formAction] = useActionState(addToCart, {
    lastResult: null,
  });

  // add to cart request check
  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success(successMessage);
    } else if (lastResult?.status === 'error') {
      const errors = lastResult.error
        ? Object.values(lastResult.error).flat().join(', ')
        : 'Failed to add to cart';
      toast.error(errors);
    }
  }, [lastResult, successMessage]);

  return (
    <article
      className={clsx(
        'group flex min-w-0 max-w-md flex-col gap-3 font-[family-name:var(--card-font-family,var(--font-family-body))] @container',
        className,
      )}
    >
      <div className="relative">
        <div
          className={clsx(
            'relative overflow-hidden rounded-xl @md:rounded-2xl',
            {
              '5:6': 'aspect-[5/6]',
              '3:4': 'aspect-[3/4]',
              '1:1': 'aspect-square',
            }[aspectRatio],
            {
              light: 'bg-[var(--product-card-light-background,hsl(var(--contrast-100)))]',
              dark: 'bg-[var(--product-card-dark-background,hsl(var(--contrast-500)))]',
            }[colorScheme],
          )}
        >
          {image != null ? (
            <Image
              alt={image.alt}
              className={clsx(
                'w-full scale-100 select-none object-cover transition-transform duration-500 ease-out group-hover:scale-110',
                {
                  light: 'bg-[var(--product-card-light-background,hsl(var(--contrast-100))]',
                  dark: 'bg-[var(--product-card-dark-background,hsl(var(--contrast-500))]',
                }[colorScheme],
              )}
              fill
              priority={imagePriority}
              sizes={imageSizes}
              src={image.src}
            />
          ) : (
            <div
              className={clsx(
                'break-words pl-5 pt-5 text-4xl font-bold leading-[0.8] tracking-tighter opacity-25 transition-transform duration-500 ease-out group-hover:scale-105 @xs:text-7xl',
                {
                  light: 'text-[var(--product-card-light-title,hsl(var(--foreground)))]',
                  dark: 'text-[var(--product-card-dark-title,hsl(var(--background)))]',
                }[colorScheme],
              )}
            >
              {title}
            </div>
          )}
          {badge != null && badge !== '' && (
            <Badge className="absolute left-3 top-3" shape="rounded">
              {badge}
            </Badge>
          )}
        </div>

        <div className="mt-2 flex flex-col items-start gap-x-4 gap-y-3 px-1 @xs:mt-3 @2xl:flex-row">
          <div className="flex-1 text-sm @[16rem]:text-base">
            <span
              className={clsx(
                'line-clamp-2 font-semibold !text-[#224086]',
                {
                  light: 'text-[var(--product-card-light-title,hsl(var(--foreground)))]',
                  dark: 'text-[var(--product-card-dark-title,hsl(var(--background)))]',
                }[colorScheme],
              )}
            >
              {title}
            </span>
            {subtitle != null && subtitle !== '' && (
              <span
                className={clsx(
                  'mb-1.5 block text-sm font-normal !hidden',
                  {
                    light: 'text-[var(--product-card-light-subtitle,hsl(var(--foreground)/75%))]',
                    dark: 'text-[var(--product-card-dark-subtitle,hsl(var(--background)/75%))]',
                  }[colorScheme],
                )}
              >
                {subtitle}
              </span>
            )}
            {price != null && <PriceLabel colorScheme={colorScheme} price={price} />}
            {/* {showRating && typeof rating === 'number' && rating > 0 && (
              <Rating className="mb-2 mt-1" numberOfReviews={numberOfReviews} rating={rating} />
            )} */}
            {showRating && rating != null && (
              <Rating className="mb-2 mt-1" numberOfReviews={numberOfReviews} rating={rating} />
            )}
            <span
              className={clsx(
                'block text-sm font-normal',
                {
                  light: 'text-[var(--product-card-light-message,hsl(var(--foreground)/75%))]',
                  dark: 'text-[var(--product-card-dark-message,hsl(var(--background)/75%))]',
                }[colorScheme],
              )}
            >
              {inventoryMessage}
            </span>
          </div>
        </div>

        {/* custom Add to Cart form */}
        <form action={formAction}>
          <input name="id" type="hidden" value={id} />
          <AddToCartButton colorScheme={colorScheme} />
        </form>

        {href !== '#' && (
          <Link
            aria-label={title}
            className={clsx(
              'absolute inset-0 rounded-b-lg rounded-t-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--product-card-focus,hsl(var(--primary)))] focus-visible:ring-offset-4',
              {
                light: 'ring-offset-[var(--product-card-light-offset,hsl(var(--background)))]',
                dark: 'ring-offset-[var(--product-card-dark-offset,hsl(var(--foreground)))]',
              }[colorScheme],
            )}
            href={href}
            id={id}
          >
            <span className="sr-only">View product</span>
          </Link>
        )}
      </div>
      {showCompare && (
        <div className="ml-1 mt-auto shrink-0">
          <Compare
            colorScheme={colorScheme}
            label={compareLabel}
            paramName={compareParamName}
            product={{ id, title, href, image }}
          />
        </div>
      )}
    </article>
  );
}

export function ProductCardSkeleton({
  className,
  aspectRatio = '5:6',
}: {
  aspectRatio?: '5:6' | '3:4' | '1:1';
  className?: string;
}) {
  return (
    <div className={clsx('@container', className)}>
      <Skeleton.Box
        className={clsx(
          'rounded-xl @md:rounded-2xl',
          {
            '5:6': 'aspect-[5/6]',
            '3:4': 'aspect-[3/4]',
            '1:1': 'aspect-square',
          }[aspectRatio],
        )}
      />
      <div className="mt-2 flex flex-col items-start gap-x-4 gap-y-3 px-1 @xs:mt-3 @2xl:flex-row">
        <div className="w-full text-sm @[16rem]:text-base">
          <Skeleton.Text characterCount={10} className="rounded" />
          <Skeleton.Text characterCount={8} className="rounded" />
          <Skeleton.Text characterCount={6} className="rounded" />
        </div>
      </div>
    </div>
  );
}