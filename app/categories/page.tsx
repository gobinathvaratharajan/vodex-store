"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchHomeData } from "@/store/slices/dataSlice";
import { Category } from "@/components/category";

export default function CategoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { topCategories, newNowCategories, newArrivals, categories } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const [topCategoriesRef, topCategoriesApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });
  const [newNowRef, newNowApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });
  const [arrivalsRef, arrivalsApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(
    (api: ReturnType<typeof useEmblaCarousel>[1]) => {
      if (api) api.scrollPrev();
    },
    [],
  );

  const scrollNext = useCallback(
    (api: ReturnType<typeof useEmblaCarousel>[1]) => {
      if (api) api.scrollNext();
    },
    [],
  );

  return (
    <main id="content">
        <div className="py-6 sm:py-12 w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="mb-4">
            <h1 className="font-bold text-xl text-gray-800 dark:text-neutral-200">
              Electronics
            </h1>
          </div>

          <div className="relative">
            <div className="mb-2 flex flex-wrap justify-between items-center gap-3">
              <h2 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
                Shop by top categories
              </h2>

              <div className="flex items-center gap-x-2">
                <button
                  type="button"
                  onClick={() => scrollPrev(topCategoriesApi)}
                  className="inline-flex justify-center items-center size-8 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xs hover:bg-gray-100 focus:outline-hidden dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  <ChevronLeft className="shrink-0 size-4" />
                  <span className="sr-only">Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollNext(topCategoriesApi)}
                  className="inline-flex justify-center items-center size-8 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xs hover:bg-gray-100 focus:outline-hidden dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="shrink-0 size-4" />
                </button>
              </div>
            </div>

            <div className="w-full overflow-hidden" ref={topCategoriesRef}>
              <div className="flex gap-3 md:gap-5">
                {topCategories.map((category) => (
                  <Link
                    key={category.id}
                    className="flex flex-col items-center bg-white border border-gray-200 hover:border-gray-300 hover:shadow-2xs rounded-xl focus:outline-hidden focus:border-gray-300 focus:shadow-2xs dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600 flex-none w-[calc(20%-12px)] min-w-[180px]"
                    href={category.url || "#"}
                  >
                    <div className="p-2 w-full text-center">
                      <div className="relative shrink-0 h-40 w-full">
                        <Image
                          className="size-full absolute inset-0 object-cover object-center bg-gray-100 rounded-lg dark:bg-neutral-800"
                          src={category.image || ""}
                          alt={category.name}
                          width={800}
                          height={800}
                        />
                      </div>
                      <div className="pt-2">
                        <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
                          {category.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="relative">
            <div className="mb-2 flex flex-wrap justify-between items-center gap-3">
              <h2 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
                New &amp; now
              </h2>

              <div className="flex items-center gap-x-2">
                <button
                  type="button"
                  onClick={() => scrollPrev(newNowApi)}
                  className="inline-flex justify-center items-center size-8 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xs hover:bg-gray-100 focus:outline-hidden dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  <ChevronLeft className="shrink-0 size-4" />
                  <span className="sr-only">Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollNext(newNowApi)}
                  className="inline-flex justify-center items-center size-8 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xs hover:bg-gray-100 focus:outline-hidden dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="shrink-0 size-4" />
                </button>
              </div>
            </div>

            <div className="w-full overflow-hidden" ref={newNowRef}>
              <div className="flex gap-3 md:gap-5">
                {newNowCategories.map((category) => (
                  <Link
                    key={category.id}
                    className="flex flex-col items-center bg-white border border-gray-200 hover:border-gray-300 hover:shadow-2xs rounded-xl focus:outline-hidden focus:border-gray-300 focus:shadow-2xs dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600 flex-none w-[calc(20%-12px)] min-w-[200px]"
                    href={category.url || "#"}
                  >
                    <div className="p-2 w-full text-center">
                      <div className="relative shrink-0 h-64 sm:h-72 w-full">
                        <Image
                          className="size-full absolute inset-0 object-cover object-center bg-gray-100 rounded-lg dark:bg-neutral-800"
                          src={category.image}
                          alt={category.name}
                          width={320}
                          height={288}
                        />
                      </div>
                      <div className="pt-2">
                        <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
                          {category.name}
                        </span>
                        <span className="mt-1 py-1 px-2.5 inline-block text-[13px] border border-gray-200 text-gray-800 rounded-full dark:text-neutral-200">
                          Show now
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 sm:py-12 w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="relative">
            <div className="mb-2 flex flex-wrap justify-between items-center gap-3">
              <h2 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
                New arrivals
              </h2>

              <div className="flex items-center gap-x-2">
                <button
                  type="button"
                  onClick={() => scrollPrev(arrivalsApi)}
                  className="inline-flex justify-center items-center size-8 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xs hover:bg-gray-100 focus:outline-hidden dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  <ChevronLeft className="shrink-0 size-4" />
                  <span className="sr-only">Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollNext(arrivalsApi)}
                  className="inline-flex justify-center items-center size-8 bg-white border border-gray-100 text-gray-800 rounded-full shadow-2xs hover:bg-gray-100 focus:outline-hidden dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="shrink-0 size-4" />
                </button>
              </div>
            </div>

            <div className="w-full overflow-hidden" ref={arrivalsRef}>
              <div className="flex gap-3 md:gap-5">
                {newArrivals.map((product) => (
                  <div
                    key={product.id}
                    className="h-full flex flex-col flex-none w-[calc(20%-12px)] min-w-[180px]"
                  >
                    <div className="group relative">
                      <div className="relative">
                        <Link
                          className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden"
                          href={product.url || "#"}
                        >
                          <Image
                            className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                            src={product.image}
                            alt={product.name}
                            width={320}
                            height={256}
                          />
                        </Link>
                      </div>

                      <Link
                        className="after:z-1 after:absolute after:inset-0"
                        href={product.url || "#"}
                      ></Link>

                      <div className="pt-3">
                        <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                          {product.name}
                        </h4>
                        <div className="mt-1 flex flex-wrap items-center gap-1">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-500">
                            ${product.price}{" "}
                            <span className="text-sm">{product.currency}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="mb-4">
            <h2 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
              Explore more
            </h2>
          </div>
           <Category />
        </div>
      </main>
  );
}
