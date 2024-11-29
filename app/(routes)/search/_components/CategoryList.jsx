"use client";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,

} from "@/components/ui/command";
import Image from "next/image";

import { useDoctorContext } from "../../../../context/DoctorContext.js"; // Import the context hook
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryList = () => {
  const { categories } = useDoctorContext(); // Access the categories from context
  const pathname = usePathname();
  const categoryName = decodeURIComponent(pathname.split("/")[2]);

  return (
    <div className="shadow-sm h-screen w-full static flex flex-col mt-5 mb-5">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading={categories.length > 0 ? "Suggestions" : ""}>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <CommandItem
                  key={index}
                  className={`${
                    category.Name === categoryName && "bg-blue-100"
                  }`}
                >
                  <Link
                    href={`/search/${encodeURIComponent(category?.Name)}`}
                    className="flex gap-2 p-2 items-center rounded-md w-full cursor-pointer"
                  >
                    <Image
                      src={category?.Icon}
                      alt="category-img"
                      width={25}
                      height={25}
                    />
                    <label className="text-blue-600 cursor-pointer text-[14px] font-bold whitespace-nowrap">
                      {category?.Name}
                    </label>
                  </Link>
                </CommandItem>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <Image
                  src="/spinner.gif"
                  alt="loading..."
                  width={40}
                  height={40}
                />
              </div>
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default CategoryList;
