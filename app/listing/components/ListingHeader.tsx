"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ThumbsUp,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleListingCategory } from "@/store/slices/dataSlice";
import { ListingCategories } from "@/__mocksData__/mockDataSet";

interface ListingHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  totalProducts: number;
}

export default function ListingHeader({
  sidebarOpen,
  setSidebarOpen,
  totalProducts,
}: ListingHeaderProps) {
  const dispatch = useDispatch();
  const selectedCategories = useSelector(
    (state: RootState) => state.data.listingFilters.selectedCategories
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api: any) => {
      if (api) api.scrollPrev();
    },
    []
  );

  const scrollNext = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api: any) => {
      if (api) api.scrollNext();
    },
    []
  );

  return (
    <div className="pt-4 lg:pt-10 w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center gap-y-3">
        <div className="lg:w-72 shrink-0">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div>
              <h1 className="font-semibold text-xl text-gray-800 dark:text-neutral-200">
                Electronics
              </h1>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {totalProducts} products
              </p>
            </div>

            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="py-1.5 px-2.5 flex items-center gap-x-1.5 text-sm bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-200"
              >
                <SlidersHorizontal className="size-3.5" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="grow overflow-hidden lg:ps-4 xl:ps-8">
          <div className="relative">
            <button
              onClick={() => scrollPrev(emblaApi)}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 size-8 items-center justify-center bg-white border border-gray-200 rounded-full shadow hover:bg-gray-50"
            >
              <ChevronLeft className="size-4" />
            </button>

            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-2 py-2">
                <button
                  type="button"
                  className="flex-none py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full border border-gray-800 text-[13px] text-gray-800 dark:text-gray-200 hover:border-gray-800 dark:bg-emerald-500 dark:border-emerald-400"
                >
                  <ThumbsUp className="size-3.5" />
                  Recommended
                </button>
                {ListingCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => dispatch(toggleListingCategory(category.id))}
                    className={`flex-none py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full text-[13px] ${
                      selectedCategories.includes(category.id)
                        ? "bg-gray-200 text-gray-800 dark:text-gray-200 border border-gray-800"
                        : "border border-gray-400 text-gray-800 dark:text-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollNext(emblaApi)}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 size-8 items-center justify-center bg-white border border-gray-200 rounded-full shadow hover:bg-gray-50"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
