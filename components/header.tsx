"use client";

import Link from "next/link";
import {
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { SearchInput } from "@/components/SearchInput";
import { FavoritesDropdown } from "@/components/FavoritesDropdown";
import { CartDropdown } from "@/components/CartDropdown";

export function Header() {
  const { navigationLinks, headerActions } = useSelector(
    (state: RootState) => state.data
  );

  return (
    <header className="flex flex-col lg:flex-nowrap z-50 bg-white dark:bg-neutral-900">
      <div className="max-w-340 basis-full w-full mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex md:flex-nowrap md:items-center gap-2 lg:gap-6">
          <div className="order-1 md:w-auto flex items-center gap-x-1">
            <Link
              href="/"
              className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              aria-label="Logo"
            >
              <span className="text-emerald-600 dark:text-emerald-500 font-bold text-2xl">
                Vodex.
              </span>
            </Link>
          </div>

          <div className="md:grow order-2">
            <div className="relative flex basis-full items-center gap-x-1 md:gap-x-3">
              <div className="hidden md:block w-full">
                <SearchInput />
              </div>
            </div>
          </div>

          <div className="order-2 md:order-3 ms-auto lg:ms-0">
            <div className="flex justify-end items-center gap-x-2">
              {headerActions.map((action) => {
                if (action.id === "favorite") {
                  return <FavoritesDropdown key={action.id} />;
                } else if (action.id === "cart") {
                  return <CartDropdown key={action.id} />;
                }

                const Icon =
                  {
                    user: User,
                    heart: Heart,
                    "shopping-cart": ShoppingCart,
                  }[action.icon] || User;

                const badgeCount = action.badge || 0;

                return (
                  <Link
                    key={action.id}
                    href={action.href}
                    className="relative flex flex-col justify-center items-center gap-1 min-w-14 min-h-8 text-xs rounded-full text-gray-800 hover:text-emerald-600 focus:outline-none focus:text-emerald-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                  >
                    <Icon className="shrink-0 size-4 text-gray-800 dark:text-neutral-200" />
                    {action.label}
                    {badgeCount > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center size-4 text-xs font-bold text-white bg-neutral-700 rounded-full">
                        {badgeCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="md:hidden mt-2.5 md:mt-0 w-full">
          <SearchInput />
        </div>
      </div>

      <div className="max-w-340 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-1">
        <div className="relative flex basis-full items-center gap-x-1 min-h-11">
          <div className="flex flex-row items-center gap-x-1 overflow-x-auto [&::-webkit-scrollbar]:h-0 w-full">
            {navigationLinks.map((link) => {
              if (link.subItems) {
                return (
                  <DropdownMenu key={link.id}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`relative py-2 px-3 w-full lg:w-auto flex items-center gap-x-1.5 text-sm whitespace-nowrap text-start text-gray-800 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-800 ${
                          link.isActive
                            ? "cursor-pointer after:absolute after:start-1/2 after:bottom-[3px] after:w-4 after:h-[3px] after:bg-emerald-500 after:rounded-full after:-translate-x-1/2"
                            : ""
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="shrink-0 size-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {link.subItems.map((subItem) => (
                        <DropdownMenuItem key={subItem.label} asChild>
                          <Link
                            href={subItem.href}
                            className={`cursor-pointer ${
                              subItem.isActive
                                ? "bg-gray-100 dark:bg-neutral-800"
                                : ""
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={link.id}
                  href={link.href || "#"}
                  className="relative py-2 px-3 w-full lg:w-auto flex items-center gap-x-1.5 text-sm whitespace-nowrap text-start text-gray-800 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
