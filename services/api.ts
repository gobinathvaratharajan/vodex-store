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
import {
  Category,
  Banner,
  Product,
  Brand,
  NavigationLink,
  HeaderAction,
  FooterSection,
} from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generic function to fetch all items from a data source
 */
const fetchAll = async <T>(dataSource: T[]): Promise<T[]> => {
  await delay(500);
  return dataSource;
};

/**
 * Generic function to fetch a single item by ID
 */
const fetchById = async <T extends { id: string }>(
  dataSource: T[],
  id: string
): Promise<T | null> => {
  await delay(500);
  const item = dataSource.find((item) => item.id === id);
  return item || null;
};

/**
 * Generic function to fetch multiple items by IDs
 */
const fetchByIds = async <T extends { id: string }>(
  dataSource: T[],
  ids: string[]
): Promise<T[]> => {
  await delay(500);
  return dataSource.filter((item) => ids.includes(item.id));
};

/**
 * Generic function to fetch items with pagination
 */
const fetchPaginated = async <T>(
  dataSource: T[],
  page: number = 1,
  limit: number = 10
): Promise<{ data: T[]; total: number; page: number; limit: number }> => {
  await delay(500);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = dataSource.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: dataSource.length,
    page,
    limit,
  };
};

/**
 * Generic function to search items by name or property
 */
const searchItems = async <T extends Record<string, any>>(
  dataSource: T[],
  searchTerm: string,
  searchKey: keyof T = "name" as keyof T
): Promise<T[]> => {
  await delay(500);
  const lowerSearchTerm = searchTerm.toLowerCase();
  return dataSource.filter((item) =>
    String(item[searchKey]).toLowerCase().includes(lowerSearchTerm)
  );
};

export const api = {
  // Categories
  categories: {
    getAll: async (): Promise<Category[]> => fetchAll(Categories),
    getById: async (id: string): Promise<Category | null> =>
      fetchById(Categories, id),
    getByIds: async (ids: string[]): Promise<Category[]> =>
      fetchByIds(Categories, ids),
    search: async (searchTerm: string): Promise<Category[]> =>
      searchItems(Categories, searchTerm, "name"),
  },

  // Banners
  banners: {
    getAll: async (): Promise<Banner[]> => fetchAll(Banners),
    getById: async (id: string): Promise<Banner | null> =>
      fetchById(Banners, id),
    getByIds: async (ids: string[]): Promise<Banner[]> =>
      fetchByIds(Banners, ids),
  },

  // Products
  products: {
    getFeatured: async (): Promise<Product[]> => fetchAll(FeaturedProducts),
    getExplore: async (): Promise<Product[]> => fetchAll(ExploreProducts),
    getNewArrivals: async (): Promise<Product[]> => fetchAll(NewArrivals),
    getListing: async (): Promise<Product[]> => fetchAll(ListingProducts),
    getById: async (id: string): Promise<Product | null> =>
      fetchById(ListingProducts, id),
    getByIds: async (ids: string[]): Promise<Product[]> =>
      fetchByIds(ListingProducts, ids),
    search: async (searchTerm: string): Promise<Product[]> =>
      searchItems(ListingProducts, searchTerm, "name"),
    getPaginated: async (page: number = 1, limit: number = 12) =>
      fetchPaginated(ListingProducts, page, limit),
    getDetailBySlug: async (slug: string): Promise<any | null> => {
      await delay(500);
      console.log("API: Searching for product with slug:", slug);
      console.log("API: Available products:", ProductDetails.map((p: any) => ({ id: p.id, slug: p.slug })));
      const product = ProductDetails.find((p: any) => p.slug === slug);
      console.log("API: Found product:", product ? product.name : "Not found");
      return product || null;
    },
    getDetailById: async (id: string): Promise<any | null> =>
      fetchById(ProductDetails as any, id),
    getRelatedProducts: async (productIds: string[]): Promise<Product[]> =>
      fetchByIds(ListingProducts, productIds),
  },

  // Top Categories
  topCategories: {
    getAll: async (): Promise<Category[]> =>
      fetchAll(TopCategories as unknown as Category[]),
    getById: async (id: string): Promise<Category | null> =>
      fetchById(TopCategories as unknown as Category[], id),
  },

  // New Now Categories
  newNowCategories: {
    getAll: async (): Promise<Category[]> =>
      fetchAll(NewNowCategories as unknown as Category[]),
    getById: async (id: string): Promise<Category | null> =>
      fetchById(NewNowCategories as unknown as Category[], id),
  },

  // Brands
  brands: {
    getAll: async (): Promise<Brand[]> => fetchAll(Brands),
    getById: async (id: string): Promise<Brand | null> =>
      fetchById(Brands, id),
    search: async (searchTerm: string): Promise<Brand[]> =>
      searchItems(Brands, searchTerm, "name"),
  },

  // Listing Metadata
  listingMetadata: {
    getAll: async () => {
      await delay(500);
      return {
        categories: ListingCategories,
        brands: ListingBrands,
        colors: ListingColors,
        ratings: ListingRatings,
        conditions: ListingConditions,
      };
    },
    getCategories: async () => fetchAll(ListingCategories),
    getCategoryById: async (id: string) =>
      fetchById(ListingCategories, id),
    getBrands: async () => fetchAll(ListingBrands),
    getBrandById: async (id: string) => fetchById(ListingBrands, id),
    getColors: async () => fetchAll(ListingColors),
    getColorById: async (id: string) => fetchById(ListingColors, id),
    getRatings: async () => fetchAll(ListingRatings),
    getRatingById: async (id: string) => fetchById(ListingRatings, id),
    getConditions: async () => fetchAll(ListingConditions),
    getConditionById: async (id: string) =>
      fetchById(ListingConditions, id),
  },

  // Navigation
  navigation: {
    getLinks: async (): Promise<NavigationLink[]> =>
      fetchAll(NavigationLinks),
    getLinkById: async (id: string): Promise<NavigationLink | null> =>
      fetchById(NavigationLinks, id),
  },

  // Header Actions
  headerActions: {
    getAll: async (): Promise<HeaderAction[]> => fetchAll(HeaderActions),
    getById: async (id: string): Promise<HeaderAction | null> =>
      fetchById(HeaderActions, id),
  },

  // Footer
  footer: {
    getSections: async (): Promise<FooterSection[]> =>
      fetchAll(footerSections),
  },

  // Interest Categories
  interestCategories: {
    getAll: async (): Promise<Category[]> => fetchAll(InterestCategories),
    getById: async (id: string): Promise<Category | null> =>
      fetchById(InterestCategories, id),
    getActive: async (): Promise<Category | null> => {
      await delay(500);
      const active = InterestCategories.find((cat: any) => cat.isActive);
      return active || null;
    },
  },

  // Legacy compatibility methods (deprecated)
  getCategories: async (): Promise<Category[]> => fetchAll(Categories),
  getBanners: async (): Promise<Banner[]> => fetchAll(Banners),
  getFeaturedProducts: async (): Promise<Product[]> =>
    fetchAll(FeaturedProducts),
  getExploreProducts: async (): Promise<Product[]> =>
    fetchAll(ExploreProducts),
  getNewArrivals: async (): Promise<Product[]> => fetchAll(NewArrivals),
  getListingProducts: async (): Promise<Product[]> =>
    fetchAll(ListingProducts),
  getTopCategories: async (): Promise<Category[]> =>
    fetchAll(TopCategories as unknown as Category[]),
  getNewNowCategories: async (): Promise<Category[]> =>
    fetchAll(NewNowCategories as unknown as Category[]),
  getBrands: async (): Promise<Brand[]> => fetchAll(Brands),
  getListingMetaData: async () => {
    await delay(500);
    return {
      categories: ListingCategories,
      brands: ListingBrands,
      colors: ListingColors,
      ratings: ListingRatings,
      conditions: ListingConditions,
    };
  },
  getNavigationLinks: async (): Promise<NavigationLink[]> =>
    fetchAll(NavigationLinks),
  getHeaderActions: async (): Promise<HeaderAction[]> =>
    fetchAll(HeaderActions),
  getFooterSections: async (): Promise<FooterSection[]> =>
    fetchAll(footerSections),
  getInterestCategories: async (): Promise<Category[]> =>
    fetchAll(InterestCategories),
};

// Named exports for direct imports
export const getDetailBySlug = async (slug: string): Promise<any | null> => {
  await delay(500);
  console.log("API: Searching for product with slug:", slug);
  console.log("API: Available products:", ProductDetails.map((p: any) => ({ id: p.id, slug: p.slug })));
  const product = ProductDetails.find((p: any) => p.slug === slug);
  console.log("API: Found product:", product ? product.name : "Not found");
  return product || null;
};

export const getRelatedProducts = async (category: string, excludeId: string): Promise<any[]> => {
  await delay(500);
  return ProductDetails.filter((p: any) => p.category === category && p.id !== excludeId).slice(0, 4);
};
