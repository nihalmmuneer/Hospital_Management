"use client";
import React, { useEffect, useState } from "react";
import { useDoctorContext } from "@/context/DoctorContext";
import DoctorList from "@/app/_components/DoctorList";

const Search = ({ params }) => {
  const { categories } = useDoctorContext();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  
  // Unwrap params using React.use()
  const { cname } = React.use(params); // Access params using React.use()

  useEffect(() => {
    filteredDoctorsByCategory();
  }, [categories, cname]);

  const filteredDoctorsByCategory = () => {
    if (cname === "") {
      // If cname is an empty string, get all doctors
      const allDoctors = categories.reduce((acc, category) => {
        return [...acc, ...category.doctors];
      }, []);
      setFilteredDoctors(allDoctors);
    } else {
      // Otherwise, filter by category
      const decodedCategoryName = decodeURIComponent(cname);
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
    }
  };

  return (
    <div>
      <DoctorList
        doctors={filteredDoctors}
        heading={decodeURIComponent(cname) !== "" ? decodeURIComponent(cname) : undefined} // Only set heading if cname is not empty
      />
    </div>
  );
};

export default Search;
