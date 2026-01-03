"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setSearchQuery } from "@/store/slices/dataSlice";
import { api } from "@/services/api";
import { Product } from "@/types";

export function SearchInput() {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector((state: RootState) => state.data.searchQuery);

  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch results handling debounce and empty state
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        if (!searchQuery.trim()) {
          // If empty query, show "Available Products" (Featured)
          const featured = await api.products.getFeatured();
          setSearchResults(featured.slice(0, 5));
        } else {
          // If query exists, search products
          const results = await api.products.search(searchQuery);
          setSearchResults(results.slice(0, 5));
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce for search query, immediate for empty (default view)
    const timeoutId = setTimeout(
      () => {
        if (isFocused) {
          fetchResults();
        }
      },
      searchQuery ? 300 : 0
    );

    return () => clearTimeout(timeoutId);
  }, [searchQuery, isFocused]);

  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        className="py-1.5 ps-4 sm:py-2.5 pe-10 block w-full bg-white border border-gray-200 text-base sm:text-sm rounded-full focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400"
        placeholder="Search products..."
      />
      <div className="absolute inset-y-0 end-0 z-10 flex items-center pe-1 sm:pe-1.5">
        <button
          type="button"
          className="inline-flex shrink-0 justify-center items-center w-10 h-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:bg-emerald-600"
        >
          <Search className="shrink-0 size-4" />
        </button>
      </div>

      {/* Search Dropdown */}
      {isFocused && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-700 overflow-hidden z-50">
          <div className="p-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 dark:text-neutral-400">
              {searchQuery ? "Search Results" : "Available Products"}
            </h3>
            {loading ? (
              <div className="flex justify-center py-4">
                <div
                  className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-emerald-600 rounded-full"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="flex flex-col gap-2">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug || product.id}`}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition-colors group"
                    onClick={() => setIsFocused(false)}
                  >
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate group-hover:text-emerald-600 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-neutral-400">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-sm text-gray-500">
                No products found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
