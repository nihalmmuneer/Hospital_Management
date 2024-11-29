// Home.js or page.js
"use client";
import { useEffect } from "react";
import { useDoctorContext } from "../context/DoctorContext"; 
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";

export default function Home() {
  const { categories } = useDoctorContext();
  
  const allDoctors = categories.reduce((acc, category) => {
    return [...acc, ...category.doctors];
  }, []);

  return (
    <>
      <div>
        <Hero />
        <CategorySearch categories={categories} />{" "}
        {/* Pass categories as props */}
        <DoctorList doctors={allDoctors} />
      </div>
    </>
  );
}
