"use client";
import React, { useEffect, useState } from "react";
import DoctorDetails from "../_components/DoctorDetails";
import DoctorSuggestionList from "../_components/DoctorSuggestionList";
import { useDoctorContext } from "@/context/DoctorContext";

const Details = ({ params }) => {
  const { categories } = useDoctorContext();
  const [doctorDetails, setDoctorDetails] = useState();
  const { recordId } = React.use(params);

  useEffect(() => {
    filteredDoctorDetails();
  }, []);
  const filteredDoctorDetails = () => {
    const allDoctors = categories.reduce((acc, category) => {
      return [...acc, ...category.doctors];
    }, []);
    const doctors = allDoctors.find((doctor) => doctor.id === recordId);
    if (doctors) {
      setDoctorDetails(doctors);
    }
  };
  return (
    <div className=" p-5">
      <h2 className="text-xl font-semibold">Details</h2>
      <div className="grid  lg:grid-cols-5 sm:grid-cols-1 md:grid-cols-4 mt-2 gap-5">
        <div className="md:col-span-2 lg:col-span-3  border-[1px] p-5 max-h-fit">
          <DoctorDetails doctor={doctorDetails} />
        </div>
        <div className="md:col-span-2  lg:col-span-2 ">
          <DoctorSuggestionList />
        </div>
      </div>
    </div>
  );
};

export default Details;
