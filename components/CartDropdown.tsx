"use client";

import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart, updateCartQuantity } from "@/store/slices/dataSlice";
import { useState, useRef, useEffect } from "react";

export function CartDropdown() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { cartItems } = useSelector((state: RootState) => state.data);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleRemoveItem = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (newQuantity > 0) {
      dispatch(updateCartQuantity({ id: productId, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex flex-col justify-center items-center gap-1 min-w-14 min-h-8 text-xs rounded-full text-gray-800 hover:text-emerald-600 focus:outline-none focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Shopping Cart"
      >
        <ShoppingCart className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" />
        Cart
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center size-4 text-xs font-bold text-white bg-neutral-700 rounded-full">
            {totalItems}
            <span className="sr-only">Cart items</span>
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-full sm:w-96 z-50 bg-white border border-gray-200 sm:border-gray-100 rounded-xl shadow-lg dark:bg-neutral-900 dark:border-neutral-700"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-4 px-6">
            <span className="block font-medium text-gray-800 dark:text-neutral-200">
              Shopping Cart
            </span>
          </div>

          <div className="px-6 max-h-[480px] overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {cartItems.length > 0 ? (
              <div className="space-y-5 pb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-x-4 transition-opacity duration-300"
                  >
                    <div className="relative">
                      <Link
                        href={`/product/${item.slug || item.id}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Image
                          className="shrink-0 w-20 h-28 object-cover bg-gray-100 rounded-lg dark:bg-neutral-700"
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={112}
                        />
                      </Link>
                    </div>

                    <div className="grow flex flex-col">
                      <Link
                        href={`/product/${item.slug || item.id}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <h4 className="text-sm text-gray-800 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-500 line-clamp-2">
                          {item.name}
                        </h4>
                      </Link>

                      <span className="mt-1.5 text-sm font-semibold text-gray-800 dark:text-neutral-200">
                        ${item.price}
                      </span>

                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center gap-1 border border-gray-200 dark:border-neutral-700 rounded-lg">
                          <button
                            type="button"
                            onClick={(e) => handleUpdateQuantity(item.id, item.quantity - 1, e)}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-l-lg"
                          >
                            <Minus className="size-3 text-gray-600 dark:text-neutral-400" />
                          </button>
                          <span className="px-2 text-sm text-gray-800 dark:text-neutral-200 min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleUpdateQuantity(item.id, item.quantity + 1, e)}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-r-lg"
                          >
                            <Plus className="size-3 text-gray-600 dark:text-neutral-400" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleRemoveItem(item.id, e)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg"
                          title="Remove item"
                        >
                          <Trash2 className="size-3.5 text-gray-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <ShoppingCart className="mx-auto size-12 text-gray-300 dark:text-neutral-600 mb-3" />
                <p className="text-sm text-gray-500 dark:text-neutral-400">
                  Your cart is empty
                </p>
                <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
                  Add items to get started
                </p>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <>
              <div className="py-4 px-6 border-t border-gray-200 dark:border-neutral-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600 dark:text-neutral-400">
                    Subtotal
                  </span>
                  <span className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  View Cart
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
