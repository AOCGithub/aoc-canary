'use client'

interface CategoryImage {
    alt: string
    src: string
    href: string
}

const categoryImages: CategoryImage[] = [
    {
        alt: 'Synthetic Rope',
        src: 'https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/synthethic-rope-thumb.png?t=1773027895',
        href: '/',
    },
    {
        alt: 'Climbing Gear',
        src: 'https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/climbing-gear-thumb-e021360c-23c6-48ca-a8e2-7320f1f66d00.png?t=1773028306',
        href: '/',
    },
    {
        alt: 'Tree Climbing Gear',
        src: 'https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/tree-climbing-thumb-5c9eb802-e7ad-45d6-bf15-f2fb64bdcaa3.png?t=1773028515',
        href: '/',
    },
    {
        alt: 'Marine Hardware',
        src: 'https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/marine-thumb-0c241b61-68a0-4c10-bc5c-b507e5e9ae38.png?t=1773028563',
        href: '/',
    },
    {
        alt: 'Wire Rope Fittings & Tools',
        src: 'https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/wire-rope-fittings-thumb-f7e1fc5a-072b-4b03-8f36-74f85ca30358.png?t=1773028590',
        href: '/',
    },
    {
        alt: 'Wire Rope',
        src: 'https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/wire-rope-thumb-66ccb8ac-cf68-4da0-8271-9e0aeb872c51.png?t=1773028615',
        href: '/',
    },
]

export default function GridTemplateNavOne() {
    return (
        <div className="w-full">
            <div className="w-[90%] max-w-[1536px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryImages && categoryImages.map((item) => (
                        <a  key={item.alt} href={item.href}>
                            <img src={item.src}  alt={item.alt}/>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}