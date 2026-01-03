import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  Categories,
  Banners,
  FeaturedProducts,
  ExploreProducts,
  NewArrivals,
  ListingProducts,
  TopCategories,
  NewNowCategories,
  Brands,
  ListingCategories,
  ListingBrands,
  ListingColors,
  ListingRatings,
  ListingConditions,
  NavigationLinks,
  HeaderActions,
  footerSections,
  InterestCategories,
  ProductDetails,
} from "@/__mocksData__/mockDataSet";

export const setupMockAdapter = (axiosInstance: AxiosInstance) => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

  // Mock Data Configuration
  const mockDataMap = {
    "/categories": Categories,
    "/banners": Banners,
    "/products/featured": FeaturedProducts,
    "/products/explore": ExploreProducts,
    "/products/new-arrivals": NewArrivals,
    "/products/listing": ListingProducts,
    "/categories/top": TopCategories,
    "/categories/new-now": NewNowCategories,
    "/brands": Brands,
    "/navigation": NavigationLinks,
    "/header-actions": HeaderActions,
    "/footer-sections": footerSections,
    "/categories/interest": InterestCategories,
    "/metadata/categories": ListingCategories,
    "/metadata/brands": ListingBrands,
    "/metadata/colors": ListingColors,
    "/metadata/ratings": ListingRatings,
    "/metadata/conditions": ListingConditions,
  };

  // Register Mock Handlers
  Object.entries(mockDataMap).forEach(([url, data]) => {
    mock.onGet(url).reply(200, data);
  });

  // Mock detail handling for dynamic IDs
  mock.onGet(new RegExp("/categories/.+")).reply((config) => {
    const id = config.url?.split("/").pop();
    const item = Categories.find((c) => c.id === id);
    return item ? [200, item] : [404, { message: "Category not found" }];
  });

  mock.onGet(new RegExp("/banners/.+")).reply((config) => {
    const id = config.url?.split("/").pop();
    const item = Banners.find((b) => b.id === id);
    return item ? [200, item] : [404, { message: "Banner not found" }];
  });

  mock.onGet(new RegExp("/products/detail/.+")).reply((config) => {
    const id = config.url?.split("/").pop();
    const item = [
      ...ListingProducts,
      ...ProductDetails,
      ...FeaturedProducts,
      ...ExploreProducts,
      ...NewArrivals,
    ].find((p: any) => p.id === id || p.slug === id);
    return item ? [200, item] : [404, { message: "Product not found" }];
  });

  mock.onGet(new RegExp("/products/.+")).reply((config) => {
    const id = config.url?.split("/").pop();
    const item = [
      ...ListingProducts,
      ...FeaturedProducts,
      ...ExploreProducts,
      ...NewArrivals,
    ].find((p: any) => p.id === id);
    return item ? [200, item] : [404, { message: "Product not found" }];
  });
};
