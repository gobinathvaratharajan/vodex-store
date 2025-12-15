"use client";

import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  toggleListingCategory,
  toggleListingBrand,
  setListingSale,
  setListingRating,
} from "@/store/slices/dataSlice";
import { ListingCategories, ListingBrands } from "@/__mocksData__/mockDataSet";

export default function ActiveFilters() {
  const dispatch = useDispatch();
  const listingFilters = useSelector(
    (state: RootState) => state.data.listingFilters
  );

  const {
    selectedCategories,
    selectedBrands,
    selectedColors,
    selectedRating,
    selectedConditions,
    onSale,
  } = listingFilters;

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedColors.length > 0 ||
    selectedRating !== null ||
    selectedConditions.length > 0 ||
    onSale;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="pb-3 mb-3 border-b border-gray-200">
      <div className="flex flex-wrap gap-1.5">
        {selectedCategories.map((catId) => {
          const category = ListingCategories.find((c) => c.id === catId);
          return (
            <button
              key={catId}
              onClick={() => dispatch(toggleListingCategory(catId))}
              className="py-1 px-2.5 flex items-center gap-x-1 text-xs bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
            >
              {category?.name}
              <X className="size-3" />
            </button>
          );
        })}
        {selectedBrands.map((brandId) => {
          const brand = ListingBrands.find((b) => b.id === brandId);
          return (
            <button
              key={brandId}
              onClick={() => dispatch(toggleListingBrand(brandId))}
              className="py-1 px-2.5 flex items-center gap-x-1 text-xs bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
            >
              {brand?.name}
              <X className="size-3" />
            </button>
          );
        })}
        {onSale && (
          <button
            onClick={() => dispatch(setListingSale(false))}
            className="py-1 px-2.5 flex items-center gap-x-1 text-xs bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
          >
            On Sale
            <X className="size-3" />
          </button>
        )}
        {selectedRating && (
          <button
            onClick={() => dispatch(setListingRating(null))}
            className="py-1 px-2.5 flex items-center gap-x-1 text-xs bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
          >
            {selectedRating} stars & up
            <X className="size-3" />
          </button>
        )}
      </div>
    </div>
  );
}
