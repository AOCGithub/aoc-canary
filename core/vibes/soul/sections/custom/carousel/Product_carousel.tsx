'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Plus, Star } from 'lucide-react';

interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  onSale?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    brand: 'ProClimb',
    name: 'ProClimb Forged Aluminum Eye-to-Eye Swivel - CE EN354 Certified...',
    price: 25.98,
    originalPrice: 43.98,
    rating: 5,
    reviews: 2,
    image: 'https://placehold.co/300x300/f3f4f6/9ca3af?text=Swivel',
    onSale: true,
  },
  {
    id: 2,
    brand: 'ProClimb',
    name: 'ProClimb NFPA Large D Carabiner with Screw Lock - Professional...',
    price: 23.98,
    originalPrice: 29.98,
    rating: 5,
    reviews: 1,
    image: 'https://placehold.co/300x300/f3f4f6/9ca3af?text=Carabiner',
    onSale: true,
  },
  {
    id: 3,
    brand: 'ProClimb',
    name: 'Big Rescue Figure 8 Descender - Premium Stainless Steel - Bent-...',
    price: 37.98,
    originalPrice: 47.98,
    rating: 0,
    reviews: 0,
    image: 'https://placehold.co/300x300/f3f4f6/9ca3af?text=Figure+8',
    onSale: true,
  },
  {
    id: 4,
    brand: 'ProClimb',
    name: 'ProClimb Twist Lock Modified D Steel Carabiner - 50kN...',
    price: 23.98,
    originalPrice: 33.02,
    rating: 0,
    reviews: 0,
    image: 'https://placehold.co/300x300/f3f4f6/9ca3af?text=Twist+Lock',
    onSale: true,
  },
  {
    id: 5,
    brand: 'ProClimb',
    name: 'ProClimb Screw Lock Large D Steel Carabiner - 60kN Professional...',
    price: 15.98,
    originalPrice: 19.98,
    rating: 0,
    reviews: 0,
    image: 'https://placehold.co/300x300/f3f4f6/9ca3af?text=Screw+Lock',
    onSale: true,
  },
  {
    id: 6,
    brand: 'Gripple',
    name: 'Gripple Standard Wire Rope Grip (no wire included) No. 3 - 200 lb...',
    price: 8.99,
    originalPrice: 10.98,
    rating: 0,
    reviews: 0,
    image: 'https://placehold.co/300x300/f3f4f6/9ca3af?text=Wire+Grip',
    onSale: true,
  },
  {
    id: 7,
    brand: 'ProClimb',
    name: 'ProClimb Steel Auto-Locking Carabiner - Heavy Duty 50kN...',
    price: 19.98,
    originalPrice: 27.98,
    rating: 4,
    reviews: 3,
    image: 'https://placehold.co/300x300/f3f4f6/9ca3af?text=Auto+Lock',
    onSale: true,
  },
];

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
        />
      ))}
      {reviews > 0 && (
        <span className="ml-1 text-xs text-blue-600 underline">
          {reviews} {reviews === 1 ? 'Review' : 'Reviews'}
        </span>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="min-w-0 flex-[0_0_calc(100%/2)] sm:flex-[0_0_calc(100%/3)] lg:flex-[0_0_calc(100%/4)] xl:flex-[0_0_calc(100%/6)] pr-4">
      <div className="flex flex-col h-full border border-gray-200 rounded-sm bg-white overflow-hidden">
        {/* Image */}
        <div className="relative bg-gray-50 aspect-square flex items-center justify-center p-4">
          {product.onSale && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 z-10">
              SALE
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 p-3 gap-1.5">
          <p className="text-xs font-semibold text-gray-800">{product.brand}</p>
          <p className="text-xs text-blue-600 leading-snug line-clamp-3 flex-1">{product.name}</p>

          {product.reviews > 0 && <StarRating rating={product.rating} reviews={product.reviews} />}

          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-red-600">${product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          </div>

          <button className="mt-2 w-full flex items-center justify-center gap-1.5 bg-[#1B3A5C] hover:bg-[#14304f] transition-colors text-white text-xs font-semibold py-2.5 rounded-sm">
            <Plus size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: false,
  });

  return (
    <div className="relative w-full px-4 py-6">
      {/* Prev button */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-md rounded-full p-1.5 hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={20} className="text-gray-600" />
      </button>

      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-md rounded-full p-1.5 hover:bg-gray-50 transition-colors"
      >
        <ChevronRight size={20} className="text-gray-600" />
      </button>
    </div>
  );
}