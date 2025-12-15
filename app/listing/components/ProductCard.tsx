"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleFavorite } from "@/store/slices/dataSlice";
import { RootState } from "@/store";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const favoriteProductIds = useSelector(
    (state: RootState) => state.data.favoriteProductIds
  );
  const isFavorite = favoriteProductIds.includes(product.id);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`size-3 ${
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="group relative">
        <div className="relative">
          <Link href={`/product/${product.id}`}>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badge && (
              <span className="py-0.5 px-2 text-xs font-medium bg-white text-gray-800 rounded-full">
                {product.badge}
              </span>
            )}
            {product.isNew && (
              <span className="py-0.5 px-2 text-xs font-medium bg-emerald-500 text-white rounded-full">
                New
              </span>
            )}
          </div>

          <button
            onClick={() => dispatch(toggleFavorite(product.id))}
            className="absolute top-2 right-2 size-6 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-50"
          >
            <Heart
              className={`size-3.5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>

        <div className="mt-auto pt-3">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <div className="mt-1 flex items-center gap-1">
            {renderStars(product.rating || 0)}
            <span className="text-xs text-gray-500">({product.reviewCount || 0})</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-semibold text-emerald-600">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
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
    </div>
  );
}
