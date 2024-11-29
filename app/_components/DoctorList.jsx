import Image from "next/image";
import Link from "next/link";
import React from "react";

const DoctorList = ({ doctors, heading = "Popular Doctors" }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-2  p-5">
        {decodeURIComponent(heading).replace(/[\s_%20-]+/g, " ")}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2">
        {doctors?.length > 0
          ? doctors.map(
              (doctor, index) =>
                index < 8 && (
                  <div
                    key={doctor.id}
                    className="border-[1px] p-3 rounded-lg hover:border-primary hover:shadow-md"
                  >
                    <Image
                      src={doctor.image} // Access `image` directly
                      alt={doctor.name} // Access `name` directly
                      width={500}
                      height={260}
                      className="h-[260px] w-full object-cover rounded-lg"
                    />
                    <div className="mt-2 flex items-baseline flex-col gap-1">
                      {/* Render specialization as a badge */}
                      {doctor.specialization && (
                        <h2 className="font-bold text-xs bg-blue-100 text-primary rounded-full p-2">
                          {doctor.specialization}
                        </h2>
                      )}
                      <h2 className="font-bold">{doctor.name}</h2>
                      <h2 className="text-xs text-primary font-bold">
                        {doctor.yearOfExperience} years
                      </h2>
                      <h2 className="text-gray-500 text-sm line-clamp-1">
                        {doctor.address}
                      </h2>
                      <Link href={`/details/${doctor.id}`} className="w-full">
                        <h2 className="cursor-pointer text-primary w-full text-center mt-2 border-[1px] p-2 px-3 text-xs font-bold hover:bg-blue-500 hover:text-white border-primary rounded-full">
                          Book Now
                        </h2>
                      </Link>
                    </div>
                  </div>
                )
            )
          : [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div
                key={index}
                className="bg-slate-200 h-[260px] w-full rounded-lg animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default DoctorList;
