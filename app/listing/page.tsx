"use client";

import { useState } from "react";
import ListingHeader from "./components/ListingHeader";
import ListingSidebar from "./components/ListingSidebar";
import ActiveFilters from "./components/ActiveFilters";
import ProductGrid from "./components/ProductGrid";
import { ListingProducts } from "@/__mocksData__/mockDataSet";

export default function ListingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <ListingHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            totalProducts={ListingProducts.length}
        />

        <div className="w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="lg:flex">
            <ListingSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="grow overflow-hidden pb-10 lg:pt-10 lg:ps-4 xl:ps-8">
              <ActiveFilters />
              <ProductGrid />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
