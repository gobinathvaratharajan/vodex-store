"use client";

import { ChevronRight, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { addToCart } from "@/store/slices/dataSlice";
import { Skeleton } from "@/components/ui/skeleton";

export function Feature() {
  const dispatch = useDispatch<AppDispatch>();
  const { featuredProducts, searchQuery } = useSelector((state: RootState) => state.data);

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

  if (!featuredProducts || featuredProducts.length === 0) {
    return (
      <div className="py-6 sm:py-12 w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mb-4 flex flex-wrap justify-between items-center gap-3">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-y-10 gap-x-4">
          {Array.from({ length: 5 }).map((_, i) => (
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

  const filteredProducts = featuredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-6 sm:py-12 w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="mb-4 flex flex-wrap justify-between items-center gap-3">
        <h1 className="font-medium text-xl text-gray-800 dark:text-neutral-200">
          Featured
        </h1>

        <Link
          href="/featured"
          className="py-2 px-3 flex items-center text-sm text-start bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
        >
          View all
          <ChevronRight className="shrink-0 size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-y-10 gap-x-4">
        {filteredProducts.map((product) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}
