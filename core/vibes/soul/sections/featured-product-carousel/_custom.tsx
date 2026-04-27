"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const CustomBanner = () => {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const carousel = document.querySelector(".product-carousel") as HTMLElement | null
    if (!carousel) return

    if (!isHomePage) {
      carousel.style.paddingLeft = "24px"
    } else {
      carousel.style.paddingLeft = "0px"
    }
  }, [isHomePage])

  if (!isHomePage) return null

  return (
    <div>
      <div className="carousel-side-banner w-auto h-auto xxs:hidden lg:block">
        {/* banner image */}
      </div>
    </div>
  )
}

export default CustomBanner