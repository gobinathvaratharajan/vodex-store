"use client";

import {
  Sparkles,
  Smartphone,
  Laptop,
  PcCase,
  Tv,
  Tablet,
  Printer,
  Monitor,
  Headphones,
  Gamepad2,
  Heart,
  Eye,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { addToCart, toggleFavorite } from "@/store/slices/dataSlice";
import { Skeleton } from "@/components/ui/skeleton";

export function ExploreInterest() {
  const [activeCategory, setActiveCategory] = useState("recommended");
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setVisibleCount((prev) => prev + 10);
      setIsLoading(false);
    }, 600);
  };
  const dispatch = useDispatch<AppDispatch>();
  const { interestCategories, exploreProducts, favoriteProductIds, searchQuery } = useSelector(
    (state: RootState) => state.data
  );

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    sparkles: Sparkles,
    smartphone: Smartphone,
    laptop: Laptop,
    "pc-case": PcCase,
    tv: Tv,
    tablet: Tablet,
    printer: Printer,
    monitor: Monitor,
    headphones: Headphones,
    "gamepad-2": Gamepad2,
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`shrink-0 size-3 ${
          index < rating
            ? "fill-current text-gray-800 dark:text-neutral-200"
            : "fill-none text-gray-800 dark:text-neutral-200"
        }`}
      />
    ));
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Sparkles;
    return <IconComponent className="shrink-0 size-3.5" />;
  };

  if (!interestCategories || interestCategories.length === 0) {
     return (
        <div className="py-6 sm:py-12 w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
           <div className="mb-4 flex flex-wrap justify-between items-center gap-3">
              <Skeleton className="h-8 w-64" />
           </div>
           <div className="mb-3 flex overflow-hidden gap-2">
             {Array.from({length: 8}).map((_, i) => (
                <Skeleton key={i} className="h-9 w-24 rounded-full shrink-0" />
             ))}
           </div>
           <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-y-10 gap-x-4">
              {Array.from({length: 10}).map((_, i) => (
                <div key={i} className="h-full flex flex-col gap-4">
                   <Skeleton className="w-full h-48 md:h-64 rounded-xl" />
                   <div className="space-y-2">
                     <Skeleton className="h-4 w-3/4" />
                     <Skeleton className="h-4 w-1/2" />
                   </div>
                   <Skeleton className="h-8 w-full rounded-full mt-auto" />
                </div>
              ))}
           </div>
        </div>
     );
  }

  const filteredProducts = exploreProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="py-6 sm:py-12 w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="mb-4 flex flex-wrap justify-between items-center gap-3">
        <h2 className="font-medium text-xl text-gray-800 dark:text-neutral-200">
          Explore your Interests
        </h2>
      </div>

      <div className="mb-3">
        <div className="relative flex flex-1 items-center overflow-hidden">
          <div className="flex flex-row items-center gap-2 py-2 overflow-x-auto [&::-webkit-scrollbar]:h-0 after:h-px after:min-w-10 px-0.5">
            {interestCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`py-1.5 px-3 flex whitespace-nowrap items-center gap-x-1.5 rounded-full text-[13px] ${
                  activeCategory === category.id
                    ? "bg-white border border-gray-800 text-gray-800 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-200"
                    : "bg-white border border-gray-200 text-gray-800 hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600"
                }`}
              >
                {getIcon(category.icon || "")}
                {category.name}
              </button>
            ))}
          </div>

          <div className="absolute top-0 end-0 h-full w-12 pointer-events-none bg-linear-to-l from-white via-white/90 to-transparent dark:from-neutral-900 dark:via-neutral-900/95"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-y-10 gap-x-4">
        {visibleProducts.map((product) => {
           const isFavorite = favoriteProductIds.includes(product.id);
           return (
          <div key={product.id} className="h-full flex flex-col">
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
                    width={480}
                    height={320}
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => dispatch(toggleFavorite(product.id))}
                  className="absolute top-2 end-2 z-10 p-1.5 inline-flex justify-center items-center gap-x-1.5 text-xs rounded-full border border-transparent bg-white text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <Heart
                    className={`shrink-0 size-3.5 ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </button>

                {product.badge && (
                  <div className="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                    <div className="flex flex-col gap-y-1">
                      <p>
                        <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                          {product.badge}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="opacity-0 group-hover:opacity-100 absolute bottom-2 end-2 z-10 p-1.5 inline-flex justify-center items-center gap-x-1.5 text-xs rounded-full border border-transparent bg-white text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <Eye className="shrink-0 size-3.5" /> Quick view
                </button>
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
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 dark:text-neutral-500">
                      <s>${product.originalPrice}</s>
                    </span>
                  )}
                  <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                    {product.soldCount} sold
                  </span>
                </div>

                {product.rating !== undefined && product.rating > 0 && (
                  <div className="mt-2 flex items-center gap-x-0.5">
                    {renderStars(product.rating)}
                    {product.reviewCount !== undefined && product.reviewCount > 0 && (
                      <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                        ({product.reviewCount})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto pt-3">
              <button
                type="button"
                onClick={() => dispatch(addToCart(product))}
                className="py-1.5 px-3 inline-flex justify-center items-center gap-x-1.5 text-[13px] rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
              >
                <ShoppingCart className="shrink-0 size-3.5" />
                Add to cart
              </button>
            </div>
          </div>
        );
        })}
      </div>

      {hasMore && (
        <div className="mt-10 text-center max-w-40 mx-auto">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-hidden focus:bg-emerald-700"
          >
            {isLoading ? (
                <>
                    <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                    Loading...
                </>
            ) : (
                "See more"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
