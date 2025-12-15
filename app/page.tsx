"use client";

import { BannerCarousel } from "@/components/ui/carousel/banner-carousel";
import { Category } from "@/components/category";
import { ExploreInterest } from "@/components/exploreInterest";
import { Feature } from "@/components/feature";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchHomeData } from "@/store/slices/dataSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  // Data fetching moved to DataInitializer in layout


  return (
    <>
      <BannerCarousel />
      <Category />
      <Feature />
      <ExploreInterest />
    </>
  );
}
