"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel/carousel";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function BannerCarousel() {
  const { banners } = useSelector((state: RootState) => state.data);

  if (!banners || banners.length === 0) {
    return (
      <div className="py-4 w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="relative h-120 lg:h-160 rounded-xl bg-stone-100 dark:bg-stone-800 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="py-4 w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
      <Carousel
        opts={{
          loop: true,
        }}
        className="relative"
      >
        <CarouselContent className="h-120 lg:h-160">
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id + index} className="h-full">
              {index === 0 && (
                <Link
                  href={banner.ctaLink}
                  className="h-[30rem] lg:h-[40rem] relative block rounded-xl focus:outline-none"
                >
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover rounded-xl"
                    priority
                  />

                  <div className="relative z-10 text-center size-full max-w-lg mx-auto px-12 flex flex-col justify-center items-center">
                    <p className="text-sm md:text-base uppercase text-white">
                      {banner.subtitle}
                    </p>

                    <h2 className="mt-2 font-semibold text-3xl sm:text-4xl lg:text-5xl text-white">
                      {banner.title}
                    </h2>

                    <div className="mt-7">
                      <span className="py-2 px-3 font-semibold text-sm bg-white text-gray-800 rounded-full">
                        {banner.ctaText}
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {index === 1 && (
                <Link
                  href={banner.ctaLink}
                  className="h-120 lg:h-160 relative block rounded-xl focus:outline-none"
                >
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover rounded-xl"
                  />

                  <div className="relative z-10 size-full max-w-lg p-8 sm:p-16 flex flex-col">
                    <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-gray-800">
                      {banner.subtitle}
                    </h2>

                    <p className="mt-3 text-sm md:text-base text-gray-800">
                      {banner.title}
                    </p>

                    <div className="mt-7">
                      <span className="py-2 px-3 font-semibold text-sm bg-white text-gray-800 rounded-full">
                        {banner.ctaText}
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {index === 2 && (
                <div className="h-120 lg:h-160 relative block overflow-hidden bg-linear-to-br from-emerald-500 to-emerald-900 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 h-full">
                    <div className="p-12 sm:p-16 md:ps-20 md:pe-0 max-w-xl">
                      <span className="block font-bold uppercase text-2xl sm:text-3xl lg:text-4xl text-white">
                        {banner.subtitle}
                      </span>
                      <span className="block font-bold uppercase text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white">
                        {banner.title}
                      </span>
                      <span className="block md:text-end font-bold uppercase text-xl sm:text-2xl lg:text-3xl text-yellow-400">
                        For everything
                      </span>

                      <div className="mt-10 md:mt-20">
                        <h2 className="font-semibold text-2xl md:text-3xl text-white">
                          End of year sale
                        </h2>

                        <p className="mt-1 text-white">
                          Celebrate with up to {banner.title} everything for a
                          limited time.
                        </p>

                        <div className="mt-3 md:mt-5">
                          <Link href={banner.ctaLink}>
                            <span className="py-2 px-3 font-semibold text-sm bg-white text-gray-800 rounded-full cursor-pointer">
                              {banner.ctaText}
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {banner.gridImages && banner.gridImages.length > 0 && (
                      <div className="h-120 lg:h-160 grid grid-cols-2 gap-3 sm:gap-5 -rotate-12 relative">
                        <div className="flex flex-col gap-3 sm:gap-5">
                          {banner.gridImages.slice(0, 2).map((image, idx) => (
                            <div
                              key={idx}
                              className="p-1.5 bg-white rounded-2xl lg:rounded-3xl shadow-2xl"
                            >
                              <div className="relative w-full h-62">
                                <Image
                                  src={image}
                                  alt="Product"
                                  fill
                                  className="object-cover rounded-xl lg:rounded-2xl"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col gap-3 sm:gap-5 -mt-6">
                          {banner.gridImages.slice(2, 4).map((image, idx) => (
                            <div
                              key={idx}
                              className="p-1.5 bg-white rounded-2xl lg:rounded-3xl shadow-2xl"
                            >
                              <div className="relative w-full h-62">
                                <Image
                                  src={image}
                                  alt="Product"
                                  fill
                                  className="object-cover rounded-xl lg:rounded-2xl"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute top-1/2 left-1 sm:left-4 -translate-y-1/2 size-10 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xl hover:bg-gray-100" />
        <CarouselNext className="absolute top-1/2 right-1 sm:right-4 -translate-y-1/2 size-10 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xl hover:bg-gray-100" />
      </Carousel>
    </div>
  );
}
