"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { toggleFavorite } from "@/store/slices/dataSlice";
import { api } from "@/services/api";
import { Product } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FavoritesDropdown() {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteProductIds = useSelector(
    (state: RootState) => state.data.favoriteProductIds
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favoriteProductIds.length === 0) {
        setProducts([]);
        return;
      }

      setLoading(true);
      try {
        const data = await api.products.getByIds(favoriteProductIds);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch favorite products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favoriteProductIds]);

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex flex-col justify-center items-center gap-1 min-w-14 min-h-8 text-xs rounded-full text-gray-800 hover:text-emerald-600 focus:outline-none focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 group"
          aria-label="Favorites"
        >
          <Heart className="shrink-0 size-4 text-gray-800 dark:text-neutral-200 group-hover:text-emerald-600 transition-colors" />
          Favorites
          {favoriteProductIds.length > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center size-4 text-xs font-bold text-white bg-neutral-700 rounded-full">
              {favoriteProductIds.length}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="p-4 border-b border-gray-100 dark:border-neutral-700">
          <h3 className="font-semibold text-gray-800 dark:text-neutral-200">
            Favorites ({favoriteProductIds.length})
          </h3>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {loading ? (
             <div className="flex justify-center py-8">
               <div className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-emerald-600 rounded-full" role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
                </div>
             </div>
          ) : products.length > 0 ? (
            <div className="flex flex-col gap-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Link
                    href={`/product/${product.slug || product.id}`}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-gray-100 border border-gray-200 dark:border-neutral-700">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate pr-6 group-hover:text-emerald-600 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-neutral-100">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => handleRemove(e, product.id)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Remove from favorites"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Heart className="size-10 mx-auto text-gray-300 dark:text-neutral-600 mb-2" />
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                Your favorites list is empty
              </p>
            </div>
          )}
        </div>

        {products.length > 0 && (
          <div className="p-4 border-t border-gray-100 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900/50">
            <Link
              href="/listing"
              className="flex justify-center items-center w-full py-2.5 px-4 text-sm font-medium rounded-lg border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
