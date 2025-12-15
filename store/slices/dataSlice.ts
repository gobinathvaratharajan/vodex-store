import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/services/api";
import { Category, Banner, Product, Brand, NavigationLink, HeaderAction, FooterSection, CartItem } from "@/types";

interface DataState {
  categories: Category[];
  banners: Banner[];
  featuredProducts: Product[];
  exploreProducts: Product[];
  newArrivals: Product[];
  listingProducts: Product[];
  topCategories: Category[];
  newNowCategories: Category[];
  interestCategories: Category[];
  brands: Brand[];
  navigationLinks: NavigationLink[];
  headerActions: HeaderAction[];
  footerSections: FooterSection[];
  cartItems: CartItem[];
  favoriteProductIds: string[];
  searchQuery: string;
  listingFilters: {
    selectedCategories: string[];
    selectedBrands: string[];
    selectedColors: string[];
    selectedRating: number | null;
    selectedConditions: string[];
    onSale: boolean;
  };
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  categories: [],
  banners: [],
  featuredProducts: [],
  exploreProducts: [],
  newArrivals: [],
  listingProducts: [],
  topCategories: [],
  newNowCategories: [],
  interestCategories: [],
  brands: [],
  navigationLinks: [],
  headerActions: [],
  footerSections: [],
  cartItems: [],
  favoriteProductIds: [],
  searchQuery: "",
  listingFilters: {
    selectedCategories: [],
    selectedBrands: [],
    selectedColors: [],
    selectedRating: null,
    selectedConditions: [],
    onSale: false,
  },
  loading: false,
  error: null,
};

export const fetchHomeData = createAsyncThunk("data/fetchHomeData", async () => {
  const [
    categories,
    banners,
    featuredProducts,
    exploreProducts,
    newArrivals,
    topCategories,
    newNowCategories,
    brands,
    navigationLinks,
    headerActions,
    footerSections,
    interestCategories,
  ] = await Promise.all([
    api.getCategories(),
    api.getBanners(),
    api.getFeaturedProducts(),
    api.getExploreProducts(),
    api.getNewArrivals(),
    api.getTopCategories(),
    api.getNewNowCategories(),
    api.getBrands(),
    api.getNavigationLinks(),
    api.getHeaderActions(),
    api.getFooterSections(),
    api.getInterestCategories(),
  ]);

  return {
    categories,
    banners,
    featuredProducts,
    exploreProducts,
    newArrivals,
    topCategories,
    newNowCategories,
    brands,
    navigationLinks,
    headerActions,
    footerSections,
    interestCategories,
  };
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (i) => i.id !== action.payload.id
          );
        }
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (state.favoriteProductIds.includes(action.payload)) {
        state.favoriteProductIds = state.favoriteProductIds.filter(
          (id) => id !== action.payload
        );
      } else {
        state.favoriteProductIds.push(action.payload);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setListingFilters: (
      state,
      action: PayloadAction<Partial<DataState["listingFilters"]>>
    ) => {
      state.listingFilters = { ...state.listingFilters, ...action.payload };
    },
    toggleListingCategory: (state, action: PayloadAction<string>) => {
      const index = state.listingFilters.selectedCategories.indexOf(action.payload);
      if (index > -1) {
        state.listingFilters.selectedCategories.splice(index, 1);
      } else {
        state.listingFilters.selectedCategories.push(action.payload);
      }
    },
    toggleListingBrand: (state, action: PayloadAction<string>) => {
      const index = state.listingFilters.selectedBrands.indexOf(action.payload);
      if (index > -1) {
        state.listingFilters.selectedBrands.splice(index, 1);
      } else {
        state.listingFilters.selectedBrands.push(action.payload);
      }
    },
    toggleListingColor: (state, action: PayloadAction<string>) => {
      const index = state.listingFilters.selectedColors.indexOf(action.payload);
      if (index > -1) {
        state.listingFilters.selectedColors.splice(index, 1);
      } else {
        state.listingFilters.selectedColors.push(action.payload);
      }
    },
    toggleListingCondition: (state, action: PayloadAction<string>) => {
      const index = state.listingFilters.selectedConditions.indexOf(action.payload);
      if (index > -1) {
        state.listingFilters.selectedConditions.splice(index, 1);
      } else {
        state.listingFilters.selectedConditions.push(action.payload);
      }
    },
    setListingRating: (state, action: PayloadAction<number | null>) => {
      state.listingFilters.selectedRating = action.payload;
    },
    setListingSale: (state, action: PayloadAction<boolean>) => {
      state.listingFilters.onSale = action.payload;
    },
    clearListingFilters: (state) => {
      state.listingFilters = {
        selectedCategories: [],
        selectedBrands: [],
        selectedColors: [],
        selectedRating: null,
        selectedConditions: [],
        onSale: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.banners = action.payload.banners;
        state.featuredProducts = action.payload.featuredProducts;
        state.exploreProducts = action.payload.exploreProducts;
        state.newArrivals = action.payload.newArrivals;
        state.topCategories = action.payload.topCategories;
        state.newNowCategories = action.payload.newNowCategories;
        state.brands = action.payload.brands;
        state.navigationLinks = action.payload.navigationLinks;
        state.headerActions = action.payload.headerActions;
        state.footerSections = action.payload.footerSections;
        state.interestCategories = action.payload.interestCategories;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  toggleFavorite,
  setSearchQuery,
  setListingFilters,
  toggleListingCategory,
  toggleListingBrand,
  toggleListingColor,
  toggleListingCondition,
  setListingRating,
  setListingSale,
  clearListingFilters,
} = dataSlice.actions;

export default dataSlice.reducer;
