"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const { user } = useKindeBrowserClient();
  console.log(user, "userInfo");

  useEffect(() => {}, [user]);
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/",
    },
  ];
  return (
    <div className="flex items-center justify-between shadow-sm p-4">
      <div className="flex items-center gap-10">
        <Link href={"/"}>
          <Image src="/book-doc.png" alt="logo" width={180} height={80} />
        </Link>
        <ul className="md:flex gap-8 hidden">
          {Menu &&
            Menu.map((item, index) => (
              <div key={index}>
                <Link href={item.path}>
                  <li
                    className="hover:text-primary cursor-pointer   hover:scale-105 transition-all ease-in-out"
                    key={index}
                  >
                    {item.name}
                  </li>
                </Link>
              </div>
            ))}
        </ul>
      </div>
      {user ? (
        <>
          <Popover>
            <PopoverTrigger>
              {" "}
              <Image
                src={user?.picture}
                alt="user-img"
                width={50}
                height={50}
                className="rounded-full"
              />
            </PopoverTrigger>
            <PopoverContent className="w-44">
              <ul className="cursor-pointer">
                <li className="hover:bg-slate-100 p-2 rounded-md">Profile</li>
                <li className="p-2 hover:bg-slate-100 rounded-md">
                  <Link href={"/my-booking"}>My Booking</Link>
                </li>
                <li className="p-2 hover:bg-slate-100 rounded-md">
                  <LogoutLink>Log out</LogoutLink>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <LoginLink>
          <Button>Book Now</Button>
        </LoginLink>
      )}
    </div>
  );
};

export default Header;
