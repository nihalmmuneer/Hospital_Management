"use client";
import React from "react";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Accept `categories` as a prop
const CategorySearch = ({ categories }) => {
  return (
    <div className="mb-14 items-center flex flex-col gap-2">
      <h2 className="text-4xl font-bold tracking-wide">
        Search <span className="text-primary">Doctors</span>
      </h2>
      <h2 className="text-gray-500 text-lg px-2 ">
        Search Your Doctor and Book Appointment in one click!
      </h2>
      <div className="flex w-full max-w-sm items-center space-x-2 mt-2 px-2">
        <Input type="text" placeholder="Search..." />
        <Button type="submit">
          <Search className="h-4 w-4 mr-1" />
          Search
        </Button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6">
        {categories && categories.length > 0
          ? categories.map((category, index) =>
              index < 6 ? (
                <Link
                  key={category.id}
                  href={`/search/${category.Name}`}
                  className="mt-5 flex flex-col rounded-lg items-center gap-2 p-5 bg-blue-50 m-2 cursor-pointer hover:scale-110 transition-all ease-in-out"
                >
                  <Image
                    src={category?.Icon}
                    alt={category?.Name}
                    width={40}
                    height={40}
                  />
                  <label className="whitespace-nowrap text-sm text-blue-600">
                    {category?.Name}
                  </label>
                </Link>
              ) : null
            )
          : [1, 2, 3, 4, 5, 6].map((category) => (
              <div
                key={category}
                className="h-[105px] w-[135px] mt-5 m-2 p-5 flex flex-row animate-pulse rounded-lg bg-slate-200"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default CategorySearch;
