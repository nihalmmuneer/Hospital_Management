"use client";
import React, { useEffect, useState } from "react";
import { useDoctorContext } from "@/context/DoctorContext";
import DoctorList from "@/app/_components/DoctorList";

const Search = ({ params }) => {
  const { categories } = useDoctorContext();
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const { cname } = React.use(params);
  const decodedCategoryName = decodeURIComponent(cname); 

  useEffect(() => {
    filteredDoctorsByCategory();
  }, [categories, cname]); 

  const filteredDoctorsByCategory = () => {
    const doctorDetails = categories.find(
      (category) =>
        category.Name.toLowerCase() === decodedCategoryName.toLowerCase()
    );
    if (doctorDetails) {
      setFilteredDoctors(doctorDetails?.doctors);
    } else {
      const allDoctors = categories.reduce((acc, category) => {
        return [...acc, ...category.doctors];
      }, []);
      setFilteredDoctors(allDoctors);
    }
  };


  return (
    <div>
      <DoctorList
        doctors={filteredDoctors}
        heading={decodeURIComponent(cname)}
      />
    </div>
  );
};

export default Search;
