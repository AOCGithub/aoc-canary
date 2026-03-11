'use client'

interface CategoryImage {
    alt: string
    src: string
    href: string
}

const categoryImages: CategoryImage[] = [
    {
        alt: 'Synthetic Rope',
        src: 'https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/ur.png?t=1772764765',
        href: '/',
    },
    {
        alt: 'Climbing Gear',
        src: 'https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/ur2.png?t=1772765154',
        href: '/',
    },
    {
        alt: 'Tree Climbing Gear',
        src: 'https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/ur3.png?t=1772765176',
        href: '/',
    },
    {
        alt: 'Marine Hardware',
        src: 'https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/ur4.png?t=1772765201',
        href: '/',
    },
    {
        alt: 'Wire Rope Fittings & Tools',
        src: 'https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/ur5.png?t=1772765222',
        href: '/',
    },
    {
        alt: 'Wire Rope',
        src: 'https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/ur6.png?t=1772765264',
        href: '/',
    },
]

export default function GridTemplateNavTwo() {
    return (
        <div className="w-full">
            <div className="w-[90%] max-w-[1536px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryImages && categoryImages.map((item) => (
                        <a key={item.alt} href={item.href}>
                            <img src={item.src}  alt={item.alt}/>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}