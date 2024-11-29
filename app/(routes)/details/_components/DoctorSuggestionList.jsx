import React from "react";
import { useDoctorContext } from "../../../../context/DoctorContext.js";
import Link from "next/link.js";

const DoctorSuggestionList = () => {
  const { categories } = useDoctorContext();

  const allDoctors = categories.reduce((acc, category) => {
    return [...acc, ...category.doctors];
  }, []);
  return (
    <div className="border-[1px] p-5">
      <h2 className="font-bold text-md">Suggestions</h2>
      <div className="flex flex-col mt-5 gap-3">
        {allDoctors ? (
          allDoctors?.map((doctor, index) => (
            <Link key={index} href={`/details/${doctor?.id}`}>
              <div className="flex shadow-sm p-5 gap-2 cursor-pointer hover:bg-gray-200 rounded-lg">
                <img
                  src={doctor && doctor?.image}
                  alt="doctor-img"
                  width={100}
                  height={100}
                  className="w-20 h-20 flex-shrink-0 object-cover rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="mr-2 lg:inline md:flex md:mt-1 text-primary whitespace-nowrap text-xs p-1 px-2 w-full text-center max-w-fit bg-blue-200 rounded-full">
                    {doctor && doctor?.specialization}
                  </h2>
                  <h2 className=" text-sm font-semibold whitespace-nowrap">
                    {doctor && doctor?.name}
                  </h2>
                  <h2 className="text-xs text-primary font-bold">
                    {" "}
                    {doctor && doctor?.yearOfExperience} Years{" "}
                  </h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className=" w-full flex items-center justify-center">
            <Image
              src="/spinner.gif"
              alt="loading.."
              width={20}
              height={20}
              className=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSuggestionList;
