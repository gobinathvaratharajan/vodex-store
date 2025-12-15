export interface Category {
  id: string;
  name: string;
  icon?: string;
  image?: string;
  url?: string;
  isActive?: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  gridImages?: string[];
}

export interface NavigationLink {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  isActive?: boolean;
  subItems?: { label: string; href: string; isActive?: boolean }[];
}

export interface HeaderAction {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

export interface Collection {
  id: string;
  title: string;
  productIds: string[];
  images: string;
}

export interface FooterSection {
  title: string;
  links: string[];
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number | null;
  currency?: string;
  soldCount?: number;
  rating?: number;
  reviewCount?: number; // or reviews
  badge?: string | null;
  url?: string;
  isFavorite?: boolean;
  discount?: number;
  isNew?: boolean;
  inStock?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  url?: string;
  count?: number;
}

export interface ListingBrand {
  id: string;
  name: string;
  count: number;
}

export interface ListingCategory {
  id: string;
  name: string;
  count: number;
}

export interface ListingColor {
  id: string;
  name: string;
  value: string;
  bgClass: string;
}

export interface ListingRating {
  id: string;
  stars: number;
  label: string;
}

export interface ListingCondition {
  id: string;
  name: string;
  count: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductDetails {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  price: number;
  originalPrice: number;
  currency: string;
  badge: string;
  badgeCategory: string;
  rating: number;
  reviewCount: number;
  articleCode: string;
  color: string;
  brand: string;
  material: string;
  inStock: boolean;
  soldCount: number;
  breadcrumbs: Array<{ label: string; href: string }>;
  gallery: string[];
  thumbnails: string[];
  specifications: {
    numberOfBatteries: string;
    compatibleDevices: string;
    itemDimensions: string;
    areBatteriesIncluded: string;
    batteriesRequired: string;
    upc: string;
    gtin: string;
  };
  description: string[];
  reviews: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoAndBelow: number;
    featured: Array<{
      id: string;
      author: string;
      rating: number;
      timeAgo: string;
      content: string;
      images: string[];
    }>;
  };
  models: Array<{
    id: string;
    name: string;
    price: number;
    isAvailable: boolean;
  }>;
  relatedProducts: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
}
