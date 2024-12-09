import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Hero = () => {
  const handleExploreClick = (event) => {
    event.preventDefault(); // Prevent any default behavior
    const doctorListSection = document.getElementById("doctor-list");
    if (doctorListSection) {
      doctorListSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 2xl:grid-cols-2">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <Image
                alt="Doc-img"
                src="/Doctors.jpg"
                width={800}
                height={800}
                className="absolute inset-0 h-full w-full object-cover rounded-3xl"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Find & Book <span className="text-primary">Appointment</span>{" "}
                with your Fav <span className="text-primary">Doctors</span>
              </h2>

              <p className="mt-4 text-gray-600">
                Easily connect with doctors you know and trust. Our simple
                booking system ensures quick, secure appointments, giving you
                peace of mind and personalized care. Your health, comfort, and
                safety are our top priority. Explore and book today!
              </p>

              <Button className="mt-10" onClick={handleExploreClick}>
                Explore Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
