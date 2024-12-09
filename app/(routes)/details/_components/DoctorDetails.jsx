import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import BookAppointment from "./BookAppointment";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";

const DoctorDetails = ({ doctor }) => {
  const { user } = useKindeBrowserClient();

  const socialMedia = [
    {
      id: 1,
      icon: "/facebook-icon.png",
      url: "",
    },
    {
      id: 2,
      icon: "/youtube-icon.png",
      url: "",
    },
    {
      id: 3,
      icon: "/twitter-icon.png",
      url: "",
    },
    {
      id: 4,
      icon: "/linkedin-icon.png",
      url: "",
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-6">
      {doctor ? (
        <div className="max-w-fit md:col-span-1">
          <Image
            src={doctor?.image}
            alt="doctor-img"
            width={200}
            height={200}
            className="w-full rounded-lg md:object-cover lg:object-cover sm:object-cover h-full"
          />
        </div>
      ) : (
        <div className="bg-slate-200 h-[260px] animate-pulse rounded-lg w-full"></div>
      )}
      {doctor ? (
        <div className=" lg:col-span-2 md:col-span-1 mt-5 flex flex-col gap-2">
          <h2 className=" text-xl md:text-2xl font-semibold whitespace-nowrap">
            {doctor && doctor?.name}
          </h2>
          <h2 className="text-gray-600 flex gap-2  text-[13px] md:text-sm items-center">
            <GraduationCap />
            <span className="whitespace-nowrap">
              {doctor && doctor?.yearOfExperience} Years of Experience
            </span>
          </h2>
          <h2 className="  text-[13px] md:text-sm text-gray-600 flex gap-2 items-center">
            <MapPin className="" />
            <span className="">{doctor && doctor?.address}</span>
          </h2>
          <h2 className="text-primary whitespace-nowrap text-xs p-1 px-2 w-full text-center max-w-fit bg-blue-200 rounded-full">
            {doctor?.specialization}
          </h2>
          <div className="flex gap-4 mt-1">
            {socialMedia?.map((media, index) => (
              <div key={index}>
                <Image
                  src={media?.icon}
                  width={25}
                  height={25}
                  alt="media-icons"
                  className="hover:scale-110 cursor-pointer transition-all duration-100"
                />
              </div>
            ))}
          </div>
          {user ? (
            <BookAppointment doctor={doctor} />
          ) : (
            <LoginLink>
              <Button>Book Appointment</Button>
            </LoginLink>
          )}
          <div className="p-1">
            <span className="text-gray-600 text-sm tracking-wide list-inside">
              {doctor && doctor?.about}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <Image
            src="/spinner.gif"
            alt="loading"
            width={20}
            height={20}
            className=""
          />
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
