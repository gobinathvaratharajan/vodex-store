"use client";

import { DownloadIcons, PaymentIcons, SocialIcons } from "@/constant/icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function Footer() {
  const { footerSections } = useSelector((state: RootState) => state.data);

  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-neutral-900 dark:border-neutral-700">
      <div className="w-full max-w-340 mx-auto py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 font-medium text-sm text-gray-800 dark:text-neutral-200">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-10">
            <div>
              <div className="mt-2 flex flex-col gap-2">
                {DownloadIcons.map((icon) => (
                  <Link
                    key={icon.id}
                    href={icon.href}
                    className="flex items-center w-[10rem] gap-2 border p-2 rounded-full dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800"
                  >
                    {icon.svg}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-800 dark:text-neutral-600">
                        Download on the
                      </span>
                      <span className="font-medium text-sm dark:text-neutral-200">
                        {icon.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Stay connected
              </h4>

              <div className="mt-2 flex items-center gap-3">
                {SocialIcons.map((social) => (
                  <Link
                    key={social.id}
                    href={social.href}
                    className="flex justify-center items-center size-9 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-neutral-800"
                  >
                    {social.svg}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-340 pb-10 mx-auto px-4 sm:px-6 lg:px-8">
        <h4 className="mb-3 text-sm font-medium text-gray-800 dark:text-neutral-200">
          We accept
        </h4>
        <div className="flex gap-3">
          {PaymentIcons.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="flex items-center justify-center"
            >
              {p.svg}
            </Link>
          ))}
        </div>
        <ul className="flex flex-wrap mt-8 text-xs text-gray-500 dark:text-neutral-500 gap-4">
          <li>© 2025 Vodex.</li>
          <li>
            <Link href="#" className="underline">
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
