import axios from "axios";
import { setupMockAdapter } from "./mockAdapter";
import {
  Category,
  Banner,
  Product,
  Brand,
  NavigationLink,
  HeaderAction,
  FooterSection,
} from "@/types";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// Setup Mock Adapter (Simulating Backend)
setupMockAdapter(axiosInstance);

// Generic API Helpers
const get = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};

export const api = {
  // Categories
  categories: {
    getAll: () => get<Category[]>("/categories"),
    getById: (id: string) => get<Category>(`/categories/${id}`),
    // For getByIds, we simulate it by filtering on client for now or adding a mock that accepts params
    getByIds: async (ids: string[]) => {
      const all = await get<Category[]>("/categories");
      return all.filter((c) => ids.includes(c.id));
    },
    search: async (searchTerm: string) => {
      const all = await get<Category[]>("/categories");
      return all.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
  },

  // Banners
  banners: {
    getAll: () => get<Banner[]>("/banners"),
    getById: (id: string) => get<Banner>(`/banners/${id}`),
    getByIds: async (ids: string[]) => {
      const all = await get<Banner[]>("/banners");
      return all.filter((b) => ids.includes(b.id));
    },
  },

  // Products
  products: {
    getFeatured: () => get<Product[]>("/products/featured"),
    getExplore: () => get<Product[]>("/products/explore"),
    getNewArrivals: () => get<Product[]>("/products/new-arrivals"),
    getListing: () => get<Product[]>("/products/listing"),
    getById: (id: string) => get<Product>(`/products/${id}`),
    getByIds: async (ids: string[]) => {
      const [listing, featured, explore, newArrivals] = await Promise.all([
        get<Product[]>("/products/listing"),
        get<Product[]>("/products/featured"),
        get<Product[]>("/products/explore"),
        get<Product[]>("/products/new-arrivals"),
      ]);
      const all = [...listing, ...featured, ...explore, ...newArrivals];
      const uniqueAll = Array.from(new Map(all.map((item) => [item.id, item])).values());
      return uniqueAll.filter((p) => ids.includes(p.id));
    },
    search: async (searchTerm: string) => {
      const all = await get<Product[]>("/products/listing");
      return all.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    getPaginated: async (page: number = 1, limit: number = 12) => {
      const all = await get<Product[]>("/products/listing");
      const start = (page - 1) * limit;
      return {
        data: all.slice(start, start + limit),
        total: all.length,
        page,
        limit,
      };
    },
    getDetailBySlug: async (slug: string) => {
      try {
        const response = await axiosInstance.get(`/products/detail/${slug}`);
        return response.data;
      } catch {
        return null;
      }
    },
    getDetailById: async (id: string) => {
      try {
        const response = await axiosInstance.get(`/products/detail/${id}`);
        return response.data;
      } catch {
        return null;
      }
    },
    getRelatedProducts: async (productIds: string[]) => {
      const all = await get<Product[]>("/products/listing");
      return all.filter((p) => productIds.includes(p.id));
    },
  },

  // Top Categories
  topCategories: {
    getAll: () => get<Category[]>("/categories/top"),
    getById: async (id: string) => {
      // Mocking specific ID fetch for simplicity finding in array
      const all = await get<Category[]>("/categories/top");
      return all.find((c) => c.id === id) || null;
    },
  },

  // New Now Categories
  newNowCategories: {
    getAll: () => get<Category[]>("/categories/new-now"),
    getById: async (id: string) => {
      const all = await get<Category[]>("/categories/new-now");
      return all.find((c) => c.id === id) || null;
    },
  },

  // Brands
  brands: {
    getAll: () => get<Brand[]>("/brands"),
    getById: async (id: string) => {
      const all = await get<Brand[]>("/brands");
      return all.find((b) => b.id === id) || null;
    },
    search: async (searchTerm: string) => {
      const all = await get<Brand[]>("/brands");
      return all.filter((b) =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
  },

  // Listing Metadata
  listingMetadata: {
    getAll: async () => {
      const [categories, brands, colors, ratings, conditions] = await Promise.all([
        get<any[]>("/metadata/categories"),
        get<any[]>("/metadata/brands"),
        get<any[]>("/metadata/colors"),
        get<any[]>("/metadata/ratings"),
        get<any[]>("/metadata/conditions"),
      ]);
      return { categories, brands, colors, ratings, conditions };
    },
    getCategories: () => get<any[]>("/metadata/categories"),
    getCategoryById: async (id: string) => {
      const all = await get<any[]>("/metadata/categories");
      return all.find((i) => i.id === id) || null;
    },
    getBrands: () => get<any[]>("/metadata/brands"),
    getBrandById: async (id: string) => {
      const all = await get<any[]>("/metadata/brands");
      return all.find((i) => i.id === id) || null;
    },
    getColors: () => get<any[]>("/metadata/colors"),
    getColorById: async (id: string) => {
      const all = await get<any[]>("/metadata/colors");
      return all.find((i) => i.id === id) || null;
    },
    getRatings: () => get<any[]>("/metadata/ratings"),
    getRatingById: async (id: string) => {
      const all = await get<any[]>("/metadata/ratings");
      return all.find((i) => i.id === id) || null;
    },
    getConditions: () => get<any[]>("/metadata/conditions"),
    getConditionById: async (id: string) => {
      const all = await get<any[]>("/metadata/conditions");
      return all.find((i) => i.id === id) || null;
    },
  },

  // Navigation
  navigation: {
    getLinks: () => get<NavigationLink[]>("/navigation"),
    getLinkById: async (id: string) => {
      const all = await get<NavigationLink[]>("/navigation");
      return all.find((n) => n.id === id) || null;
    },
  },

  // Header Actions
  headerActions: {
    getAll: () => get<HeaderAction[]>("/header-actions"),
    getById: async (id: string) => {
      const all = await get<HeaderAction[]>("/header-actions");
      return all.find((h) => h.id === id) || null;
    },
  },

  // Footer
  footer: {
    getSections: () => get<FooterSection[]>("/footer-sections"),
  },

  // Interest Categories
  interestCategories: {
    getAll: () => get<Category[]>("/categories/interest"),
    getById: async (id: string) => {
      const all = await get<Category[]>("/categories/interest");
      return all.find((c) => c.id === id) || null;
    },
    getActive: async () => {
      const all = await get<any[]>("/categories/interest");
      return all.find((c) => c.isActive) || null;
    },
  },

  // Legacy compatibility methods
  getCategories: () => get<Category[]>("/categories"),
  getBanners: () => get<Banner[]>("/banners"),
  getFeaturedProducts: () => get<Product[]>("/products/featured"),
  getExploreProducts: () => get<Product[]>("/products/explore"),
  getNewArrivals: () => get<Product[]>("/products/new-arrivals"),
  getListingProducts: () => get<Product[]>("/products/listing"),
  getTopCategories: () => get<Category[]>("/categories/top"),
  getNewNowCategories: () => get<Category[]>("/categories/new-now"),
  getBrands: () => get<Brand[]>("/brands"),
  getListingMetaData: async () => {
    const [categories, brands, colors, ratings, conditions] = await Promise.all([
      get<any[]>("/metadata/categories"),
      get<any[]>("/metadata/brands"),
      get<any[]>("/metadata/colors"),
      get<any[]>("/metadata/ratings"),
      get<any[]>("/metadata/conditions"),
    ]);
    return { categories, brands, colors, ratings, conditions };
  },
  getNavigationLinks: () => get<NavigationLink[]>("/navigation"),
  getHeaderActions: () => get<HeaderAction[]>("/header-actions"),
  getFooterSections: () => get<FooterSection[]>("/footer-sections"),
  getInterestCategories: () => get<Category[]>("/categories/interest"),
};

// Named exports
export const getDetailBySlug = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/products/detail/${slug}`);
    return response.data;
  } catch {
    return null;
  }
};

export const getRelatedProducts = async (category: string, excludeId: string) => {
  try {
    const all = await get<any[]>("/products/listing");
    // Also include details for related if needed, but listing products are usually enough
    // For now, filtering the mock list which we fetched via axios
    return all.filter((p: any) => p.category === category && p.id !== excludeId).slice(0, 4);
  } catch {
    return [];
  }
};
