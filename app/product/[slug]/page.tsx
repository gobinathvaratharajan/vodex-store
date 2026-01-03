'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getDetailBySlug, getRelatedProducts } from '@/services/api';
import { ProductDetails } from '@/types';
import {
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  CheckIcon,
  ShoppingCartIcon,
  HeartIcon,
  ChevronRightIcon,
  BoxIcon,
  LoadingSpinner,
  productHighlights
} from '@/constant/productIcons';
import { ExploreInterest } from '@/components/exploreInterest';
import { Feature } from '@/components/feature';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = React.use(params);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<ProductDetails[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getDetailBySlug(resolvedParams.slug);
        if (data) {
          setProduct(data);
          const related = await getRelatedProducts(data.badgeCategory || data.brand, data.id);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [resolvedParams.slug]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} filled={index < Math.floor(rating)} />
    ));
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">``
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <BoxIcon />
        <p className="mt-4 text-lg text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="pt-6">
        <div className="-ms-1.5 pb-3">
          {/* Breadcrumb */}
          <ol className="flex items-center whitespace-nowrap">
            <li className="inline-flex items-center">
              <a className="flex items-center text-xs text-gray-500 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-500 dark:focus:text-emerald-500" href="/">
                Home
              </a>
              <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center">
              <a className="flex items-center text-xs text-gray-500 hover:text-emerald-600 focus:outline-hidden focus:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-500 dark:focus:text-emerald-500" href="/listing">
                Products
              </a>
              <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center text-xs font-medium text-gray-800 truncate dark:text-neutral-200" aria-current="page">
              {product.shortName || product.name}
            </li>
          </ol>
          {/* End Breadcrumb */}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-10">
          <div className="lg:col-span-3">
            {/* Image Gallery */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              {/* Thumbnails */}
              <div className="flex-none order-2 sm:order-1">
                <div className="sm:h-[700px] flex flex-row sm:flex-col gap-3 pb-1.5 sm:pb-0 overflow-x-auto sm:overflow-x-hidden sm:overflow-y-auto [&::-webkit-scrollbar]:h-1 sm:[&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                  {product.gallery?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative shrink-0 size-20 rounded-md sm:rounded-lg overflow-hidden cursor-pointer after:absolute after:inset-0 after:size-full after:rounded-md sm:after:rounded-lg border ${
                        selectedImage === index
                          ? 'border-gray-800 after:bg-black/10 dark:border-white'
                          : 'border-gray-200 dark:border-neutral-700'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="bg-gray-100 object-cover rounded-md sm:rounded-lg dark:bg-neutral-800"
                      />
                    </button>
                  ))}
                </div>
              </div>
              {/* End Thumbnails */}

              {/* Preview */}
              <div className="relative group grow overflow-hidden h-[550px] sm:h-[700px] order-1 sm:order-2 bg-gray-100 rounded-lg dark:bg-neutral-800">
                <Image
                  src={
                    product.gallery?.[selectedImage] ||
                    product.gallery?.[0] ||
                    product.image ||
                    'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=480&auto=format&fit=crop' // Fallback image
                  }
                  alt={product.name}
                  fill
                  className="bg-gray-100 object-cover rounded-lg dark:bg-neutral-800"
                  priority
                />
              </div>
              {/* End Preview */}
            </div>
            {/* End Image Gallery */}
          </div>
          {/* End Col */}

          <div className="lg:col-span-2 ml-8">
            <div className="sticky top-20">
              {/* Badge */}
              {product.badge && (
                <div className="mb-3">
                  <span className="py-1.5 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-500/10 dark:text-emerald-500">
                    <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M2 12h20"></path>
                    </svg>
                    {product.badge}
                  </span>
                </div>
              )}
              {/* End Badge */}

              {/* Title */}
              <h1 className="font-semibold text-lg text-gray-800 dark:text-neutral-200">
                {product.name}
              </h1>
              {/* End Title */}

              {/* Rating */}
              <div className="mt-3 flex flex-wrap justify-between items-center gap-3">
                <div className="font-medium text-gray-800 dark:text-neutral-200">
                  <ul className="flex flex-wrap items-center gap-2">
                    <li className="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
                      <div className="flex flex-wrap items-center">
                        <span className="me-1">{product.rating}</span>
                        <div className="inline-flex items-center gap-x-0.5">
                          {renderStars(product.rating)}
                        </div>
                      </div>
                    </li>
                    <li className="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
                      <span className="text-sm text-gray-800 dark:text-neutral-200">{product.reviewCount} reviews</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* End Rating */}

              {/* Price */}
              <div className="mt-5 sm:mt-7">
                <div className="flex items-center gap-x-3">
                  <span className="font-semibold text-3xl text-gray-800 dark:text-neutral-200">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-500 line-through dark:text-neutral-500">
                        ${product.originalPrice}
                      </span>
                      <span className="py-1.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
                        <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                          <polyline points="16 7 22 7 22 13"></polyline>
                        </svg>
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
              {/* End Price */}

              {/* List */}
              <ul className="mt-5 sm:mt-7 flex flex-col gap-y-2.5">
                {/* Stock Status */}
                <li className="flex gap-x-2.5">
                  {product.inStock ? (
                    <>
                      <CheckCircleIcon />
                      <span className="text-sm text-gray-600 dark:text-neutral-400">In Stock</span>
                    </>
                  ) : (
                    <>
                      <XCircleIcon />
                      <span className="text-sm text-gray-600 dark:text-neutral-400">Out of Stock</span>
                    </>
                  )}
                </li>
                {/* End Stock Status */}

                {/* Description Items */}
                {product.description && Array.isArray(product.description) && product.description.slice(0, 3).map((desc, index) => (
                  <li key={index} className="flex gap-x-2.5">
                    <CheckIcon />
                    <span className="text-sm text-gray-600 dark:text-neutral-400">{desc}</span>
                  </li>
                ))}
                {/* End Description Items */}
              </ul>
              {/* End List */}

              {/* Models/Variants */}
              {product.models && product.models.length > 0 && (
                <div className="mt-5 sm:mt-7">
                  <h4 className="mb-2.5 font-medium text-sm text-gray-800 dark:text-neutral-200">
                    Select Model
                  </h4>
                  <div className="flex flex-col gap-2">
                    {product.models.map((model, index) => (
                      <button
                        key={index}
                        type="button"
                        disabled={!model.isAvailable}
                        className={`py-2.5 px-3 inline-flex justify-between items-center w-full text-sm font-medium text-start border rounded-lg shadow-sm ${
                          model.isAvailable
                            ? 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
                            : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-600'
                        }`}
                      >
                        <span>{model.name}</span>
                        <span className="font-semibold">${model.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-5 sm:mt-7">
                <h4 className="mb-2.5 font-medium text-sm text-gray-800 dark:text-neutral-200">
                  Quantity
                </h4>
                <div className="flex items-center gap-x-1.5">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  >
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                    </svg>
                  </button>
                  <input
                    className="p-0 w-10 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white"
                    type="number"
                    value={quantity}
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  >
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </button>
                </div>
              </div>
              {/* End Quantity */}

              {/* Buttons */}
              <div className="mt-5 sm:mt-7 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-hidden focus:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <ShoppingCartIcon />
                  Add to cart
                </button>
                <button
                  type="button"
                  className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  <HeartIcon />
                </button>
              </div>
              {/* End Buttons */}

              {/* Divider */}
              <div className="mt-5 sm:mt-7 border-t border-gray-200 dark:border-neutral-700"></div>
              {/* End Divider */}

              {/* Product Highlights */}
              <ul className="mt-5 sm:mt-7 flex flex-col gap-y-2.5">
                {productHighlights.map((highlight, index) => (
                  <li key={index} className="flex gap-x-2.5">
                    {highlight.icon()}
                    <div>
                      <h5 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                        {highlight.title}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-neutral-500">
                        {highlight.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              {/* End Product Highlights */}
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>

      {/* Specifications */}
      {product.specifications && (
        <div className="py-6 sm:py-12 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="mb-4">
            <h2 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
              Specifications
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
            <div className="divide-y divide-gray-200 dark:divide-neutral-700">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4">
                  <div className="font-medium text-sm text-gray-800 capitalize dark:text-neutral-200">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="col-span-2 text-sm text-gray-600 dark:text-neutral-400">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Explore Interests / Related Products */}
      {relatedProducts.length > 0 && (
        <div className="py-6 sm:py-12 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Header */}
          <div className="mb-4 flex flex-wrap justify-between items-center gap-3">
            <h2 className="font-medium text-xl text-gray-800 dark:text-neutral-200">
              Related Products
            </h2>
            <a
              href="/listing"
              className="group py-2 px-3 inline-flex items-center gap-x-2 text-sm text-start bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
            >
              View all
              <ChevronRightIcon />
            </a>
          </div>
          {/* End Header */}

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-y-10 gap-x-4">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="h-full flex flex-col">
                <div className="group relative">
                  <div className="relative h-60 overflow-hidden bg-gray-100 rounded-lg dark:bg-neutral-800">
                      <a href={`/product/${relatedProduct.slug || relatedProduct.id}`}>
                        <Image
                          src={
                            relatedProduct.gallery?.[0] ||
                            relatedProduct.thumbnails?.[0] ||
                            relatedProduct.image ||
                            'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=480&auto=format&fit=crop'
                          }
                          alt={relatedProduct.name}
                          fill
                          className="size-full absolute top-0 start-0 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                        />
                      </a>
                    <button
                      type="button"
                      className="absolute top-2 end-2 inline-flex justify-center items-center size-8 text-gray-800 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                      <HeartIcon />
                    </button>
                  </div>

                  <div className="mt-2.5">
                    <a href={`/product/${relatedProduct.slug}`}>
                      <h3 className="font-medium text-sm text-gray-800 group-hover:text-emerald-600 dark:text-neutral-200 dark:group-hover:text-emerald-500">
                        {relatedProduct.shortName || relatedProduct.name}
                      </h3>
                    </a>
                    <div className="mt-1 flex items-center gap-x-1">
                      <div className="flex">{renderStars(relatedProduct.rating)}</div>
                      <span className="text-xs text-gray-500 dark:text-neutral-500">
                        ({relatedProduct.reviewCount})
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-x-2">
                      <span className="font-medium text-base text-gray-800 dark:text-neutral-200">
                        ${relatedProduct.price}
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-gray-500 line-through dark:text-neutral-500">
                          ${relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* End Grid */}
        </div>
      )}
      {/* <ExploreInterest /> */}

      {/* Explore Interests */}
      {/* <div className="py-6 w-full max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mb-4">
          <h2 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
            Explore more
          </h2>
        </div>
          <Feature />
      </div> */}
    </div>
  );
}
