"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function Category() {
  const { categories } = useSelector((state: RootState) => state.data);

  if (!categories || categories.length === 0) {
    return (
      <div className="w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center bg-white border border-gray-200 rounded-xl dark:bg-neutral-900 dark:border-neutral-700 h-[80px]"
            >
              <div className="relative shrink-0 w-20 sm:w-28 h-20 bg-stone-100 dark:bg-stone-800 rounded-s-xl animate-pulse" />
              <div className="grow p-3">
                <div className="h-4 w-24 bg-stone-100 dark:bg-stone-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            className="flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600"
            href={category.url || "#"}
          >
            <div className="relative shrink-0 w-20 sm:w-28 h-20">
              <Image
                className="size-full absolute inset-0 object-cover object-center rounded-s-xl"
                src={category.icon || ""}
                alt={category.name}
                width={112}
                height={80}
                sizes="(max-width: 640px) 80px, 112px"
              />
            </div>
            <div className="grow p-3">
              <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
