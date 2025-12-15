"use client";

import { useState } from "react";
import { Search, X, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  toggleListingCategory,
  toggleListingBrand,
  toggleListingColor,
  toggleListingCondition,
  setListingRating,
  setListingSale,
  clearListingFilters,
} from "@/store/slices/dataSlice";
import {
  ListingCategories,
  ListingBrands,
  ListingColors,
  ListingRatings,
  ListingConditions,
} from "@/__mocksData__/mockDataSet";

interface ListingSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function ListingSidebar({
  sidebarOpen,
  setSidebarOpen,
}: ListingSidebarProps) {
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

  const [searchBrand, setSearchBrand] = useState("");
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const filteredBrands = ListingBrands.filter((brand) =>
    brand.name.toLowerCase().includes(searchBrand.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`size-3 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div
      className={`pt-6 lg:pt-0 ${sidebarOpen ? "block" : "hidden"} lg:block`}
    >
      <div
        className={`w-80 lg:w-72 h-full ${
          sidebarOpen ? "fixed" : "lg:static"
        } inset-y-0 left-0 z-50 bg-white lg:bg-transparent dark:bg-neutral-900 overflow-y-auto`}
      >
        <div className="h-full flex-1 flex flex-col">
          <div className="lg:hidden py-3 px-5 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
            <span className="font-medium text-gray-800 dark:text-neutral-200">
              Filter
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="size-6 inline-flex justify-center items-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="h-full overflow-y-auto p-5 lg:pt-10 lg:ps-0">
            {/* Categories */}
            <div className="pb-6 mb-6 border-b border-gray-200 dark:border-neutral-700">
              <div className="mb-3">
                <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                  Category
                </span>
              </div>
              <div className="space-y-0.5">
                {(showAllCategories
                  ? ListingCategories
                  : ListingCategories.slice(0, 4)
                ).map((category) => (
                  <label
                    key={category.id}
                    className="p-2 flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() =>
                        dispatch(toggleListingCategory(category.id))
                      }
                      className="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800"
                    />
                    <span className="ms-2 grow text-gray-800 dark:text-neutral-200">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>

              {ListingCategories.length > 4 && (
                <button
                  type="button"
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium dark:hover:bg-gray-800"
                >
                  {showAllCategories ? "Show less" : "See more"}
                </button>
              )}
            </div>

            {/* Sale Toggle */}
            <div className="pb-6 mb-6 border-b border-gray-200 dark:border-neutral-700">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="sale-toggle"
                  className="cursor-pointer font-semibold text-sm text-gray-800 dark:text-gray-200"
                >
                  Sale
                </label>
                <label
                  htmlFor="sale-toggle"
                  className="relative inline-block w-11 h-6 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="sale-toggle"
                    checked={onSale}
                    onChange={(e) =>
                      dispatch(setListingSale(e.target.checked))
                    }
                    className="peer sr-only"
                  />
                  <span className="block w-full h-full bg-gray-200 rounded-full peer-checked:bg-emerald-600 transition"></span>
                  <span className="absolute left-0.5 top-0.5 size-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                </label>
              </div>
            </div>

            {/* Brands */}
            <div className="pb-6 mb-6 border-b border-gray-200 dark:border-neutral-700">
              <div className="mb-3">
                <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                  Brand
                </span>
              </div>

              <div className="relative mb-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2.5">
                  <Search className="size-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchBrand}
                  onChange={(e) => setSearchBrand(e.target.value)}
                  placeholder="Search brands"
                  className="py-1.5 sm:py-2 ps-8 pe-3 block w-full bg-white dark:text-white dark:bg-neutral-800 dark:border-gray-800 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-600 focus:ring-emerald-600"
                />
              </div>

              <div className="space-y-0.5">
                {(showAllBrands
                  ? filteredBrands
                  : filteredBrands.slice(0, 4)
                ).map((brand) => (
                  <label
                    key={brand.id}
                    className="p-2 flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => dispatch(toggleListingBrand(brand.id))}
                      className="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800"
                    />
                    <span className="ms-2 grow text-gray-800 dark:text-neutral-200">
                      {brand.name}
                    </span>
                  </label>
                ))}
              </div>

              {filteredBrands.length > 4 && (
                <button
                  type="button"
                  onClick={() => setShowAllBrands(!showAllBrands)}
                  className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {showAllBrands ? "Show less" : "See more"}
                </button>
              )}
            </div>

            {/* Colors */}
            <div className="pb-6 mb-6 border-b border-gray-200 dark:border-neutral-700">
              <div className="mb-3">
                <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                  Color
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {ListingColors.map((color) => (
                  <label
                    key={color.id}
                    className="p-2 inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color.id)}
                      onChange={() => dispatch(toggleListingColor(color.id))}
                      className={`shrink-0 size-4.5 rounded-sm border-2 appearance-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${
                        color.bgClass
                      } ${
                        color.value === "white"
                          ? "border-gray-300  checked:after:text-black"
                          : "border-transparent checked:after:text-white"
                      } checked:after:content-['✓'] checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-xs checked:after:font-bold`}
                    />
                    <span className="ms-2 text-gray-800 dark:text-neutral-200">
                      {color.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="pb-6 mb-6 border-b border-gray-200 dark:border-neutral-700">
              <div className="mb-3">
                <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                  Customer reviews
                </span>
              </div>
              <div className="space-y-0.5">
                {ListingRatings.map((rating) => (
                  <label
                    key={rating.id}
                    className="p-2 flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating.stars}
                      onChange={() =>
                        dispatch(setListingRating(rating.stars))
                      }
                      className="shrink-0 size-4.5 border-gray-300 rounded-full text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800"
                    />
                    <span className="ms-2 flex items-center gap-1">
                      {renderStars(rating.stars)}
                      <span className="ms-1 text-gray-800 dark:text-neutral-200">
                        {rating.label}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div className="pb-6 mb-6 border-b-0 last:border-b-0">
              <div className="mb-3">
                <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                  Condition
                </span>
              </div>
              <div className="space-y-0.5">
                {ListingConditions.map((condition) => (
                  <label
                    key={condition.id}
                    className="p-2 flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedConditions.includes(condition.id)}
                      onChange={() =>
                        dispatch(toggleListingCondition(condition.id))
                      }
                      className="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500"
                    />
                    <span className="ms-2 grow text-gray-800 dark:text-neutral-200">
                      {condition.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="py-4 px-5 lg:py-6 lg:ps-0 flex items-center gap-x-2 border-t border-gray-200">
            <button
              type="button"
              onClick={() => dispatch(clearListingFilters())}
              className="py-2 px-3 w-full inline-flex justify-center items-center text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
            >
              <X className="size-4 mr-1" />
              Clear filters
            </button>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden py-2 px-3 w-full inline-flex justify-center items-center text-sm font-medium rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Show items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
