import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';

import { Stream, Streamable } from '@/vibes/soul/lib/streamable';
import { FeaturedProductCarousel } from '@/vibes/soul/sections/featured-product-carousel';
// import { FeaturedProductList } from '@/vibes/soul/sections/featured-product-list';
import { getSessionCustomerAccessToken } from '~/auth';
import { Subscribe } from '~/components/subscribe';
import { productCardTransformer } from '~/data-transformers/product-card-transformer';
import { getPreferredCurrencyCode } from '~/lib/currency';

import { Slideshow } from './_components/slideshow';
import { getPageData } from './page-data';

// custom
import GridTemplateNavOne from '@/vibes/soul/sections/custom/grid_template_nav_one/Grid_template_nav_one';
import GridTemplateNavTwo from '@/vibes/soul/sections/custom/grid_template_nav_two/Grid_template_nav_two';
import ProductCarousel from '@/vibes/soul/sections/custom/carousel/product_carousel';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const format = await getFormatter();

  const streamablePageData = Streamable.from(async () => {
    const customerAccessToken = await getSessionCustomerAccessToken();
    const currencyCode = await getPreferredCurrencyCode();

    return getPageData(currencyCode, customerAccessToken);
  });

  // const streamableFeaturedProducts = Streamable.from(async () => {
  //   const data = await streamablePageData;

  //   const featuredProducts = removeEdgesAndNodes(data.site.featuredProducts);

  //   const { defaultOutOfStockMessage, showOutOfStockMessage, showBackorderMessage } =
  //     data.site.settings?.inventory ?? {};

  //   return productCardTransformer(
  //     featuredProducts,
  //     format,
  //     showOutOfStockMessage ? defaultOutOfStockMessage : undefined,
  //     showBackorderMessage,
  //   );
  // });

  const streamableNewestProducts = Streamable.from(async () => {
    const data = await streamablePageData;

    const newestProducts = removeEdgesAndNodes(data.site.newestProducts);

    const { defaultOutOfStockMessage, showOutOfStockMessage, showBackorderMessage } =
      data.site.settings?.inventory ?? {};

    return productCardTransformer(
      newestProducts,
      format,
      showOutOfStockMessage ? defaultOutOfStockMessage : undefined,
      showBackorderMessage,
    );
  });

  const streamableShowNewsletterSignup = Streamable.from(async () => {
    const data = await streamablePageData;

    const { showNewsletterSignup } = data.site.settings?.newsletter ?? {};

    return showNewsletterSignup;
  });

  return (
    <>
      <Slideshow />

      {/* custom */}
      <GridTemplateNavOne />

      <div className='w-full h-auto my-[35px]'>
        <div className='w-[90%] mx-auto max-w-[1536px]'>
          <div className='border-[#CDD1DA] border-[1px] rounded-[6px] flex items-center justify-between px-[82px] py-[24px]'>
            <div className='flex items-center justify-center gap-3'>
              <img className='h-[48px] w-[48px] object-contain' alt='trusted partners' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/iso-icon-ezgif.com-webp-to-png-converter-1-2x.png?t=1772776789'/>
              <div className='flex flex-col items-start justify-center'>
                <p className='text-[#224086] text-[14px] font-[700]'>Certified ISO 9001:2015 Standard Company</p>
                <p className='text-[12px]'>Trusted partner for rope, safety and rigging products</p>
              </div>
            </div>
            <div className='flex items-center justify-center gap-3'>
              <img className='h-[48px] w-[48px] object-contain' alt='trusted partners' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/iso-icon-ezgif.com-webp-to-png-converter-1-2x.png?t=1772776789'/>
              <div className='flex flex-col items-start justify-center'>
                <p className='text-[#224086] text-[14px] font-[700]'>Certified ISO 9001:2015 Standard Company</p>
                <p className='text-[12px]'>Trusted partner for rope, safety and rigging products</p>
              </div>
            </div>
            <div className='flex items-center justify-center gap-3'>
              <img className='h-[48px] w-[48px] object-contain' alt='trusted partners' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/iso-icon-ezgif.com-webp-to-png-converter-1-2x.png?t=1772776789'/>
              <div className='flex flex-col items-start justify-center'>
                <p className='text-[#224086] text-[14px] font-[700]'>Certified ISO 9001:2015 Standard Company</p>
                <p className='text-[12px]'>Trusted partner for rope, safety and rigging products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeaturedProductCarousel
        cta={{ label: t('NewestProducts.cta'), href: '/shop-all/?sort=newest' }}
        description={t('NewestProducts.description')}
        emptyStateSubtitle={t('NewestProducts.emptyStateSubtitle')}
        emptyStateTitle={t('NewestProducts.emptyStateTitle')}
        nextLabel={t('NewestProducts.nextProducts')}
        previousLabel={t('NewestProducts.previousProducts')}
        products={streamableNewestProducts}
        title={t('NewestProducts.title')}
      />

      <GridTemplateNavTwo />

      <div className='max-w-[1536px] w-full mx-auto py-6 my-8'>
        <ProductCarousel />
      </div>

      {/* <FeaturedProductList
        cta={{ label: t('FeaturedProducts.cta'), href: '/shop-all' }}
        description={t('FeaturedProducts.description')}
        emptyStateSubtitle={t('FeaturedProducts.emptyStateSubtitle')}
        emptyStateTitle={t('FeaturedProducts.emptyStateTitle')}
        products={streamableFeaturedProducts}
        title={t('FeaturedProducts.title')}
      /> */}

      <Stream fallback={null} value={streamableShowNewsletterSignup}>
        {(showNewsletterSignup) => showNewsletterSignup && <Subscribe />}
      </Stream>
    </>
  );
}
