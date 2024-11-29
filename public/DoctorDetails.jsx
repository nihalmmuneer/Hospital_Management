import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookAppointment from "./BookAppointment";

const DoctorDetails = ({ doctor }) => {
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
      {/* Doctor Image */}
      {doctor ? (
        <div className="max-w-fit md:col-span-1">
          <Image
            src={doctor[0]?.image?.url}
            alt="doctor-img"
            width={200}
            height={200}
            className="w-full rounded-lg md:object-cover lg:object-cover sm:object-cover h-full"
          />
        </div>
      ) : (
        <div className="bg-slate-200 h-[260px] animate-pulse rounded-lg w-full"></div>
      )}
      {/* Doctor Info */}
      {doctor ? (
        <div className=" lg:col-span-2 md:col-span-1 mt-5 flex flex-col gap-2">
          <h2 className=" text-xl md:text-2xl font-semibold whitespace-nowrap">
            {doctor && doctor[0]?.Name}
          </h2>
          <h2 className="text-gray-600 flex gap-2  text-[13px] md:text-sm items-center">
            <GraduationCap />
            <span className="whitespace-nowrap">
              {doctor && doctor[0]?.Year_of_Experience}Years of Experience
            </span>
          </h2>
          <h2 className="  text-[13px] md:text-sm text-gray-600 flex gap-2 items-center">
            <MapPin className="" />
            <span className="">{doctor && doctor[0]?.Address}</span>
          </h2>
          <h2 className="flex gap-2">
            {doctor &&
              doctor[0]?.categories?.map((category, index) => (
                <span
                  key={index}
                  className="text-primary whitespace-nowrap text-xs p-1 px-2 w-full text-center max-w-fit bg-blue-200 rounded-full"
                >
                  {category?.Name}
                </span>
              ))}
          </h2>
          <div className="flex gap-4 mt-1">
            {socialMedia?.map((media) => (
              <>
                <Image
                  src={media?.icon}
                  width={25}
                  height={25}
                  alt="media-icons"
                  className="hover:scale-110 cursor-pointer transition-all duration-100"
                />
              </>
            ))}
          </div>

          <BookAppointment doctor={doctor} />
          <div className="p-1">
            <span className="text-gray-600 text-sm tracking-wide list-inside">
              {doctor && doctor[0]?.About}
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
