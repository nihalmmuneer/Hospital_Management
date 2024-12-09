import { useDoctorContext } from "@/context/DoctorContext";
import { Button } from "@/components/ui/button";
import CancelAppointment from "./CancelAppointment";
import Image from "next/image";
import moment from "moment";
import { Calendar, MapPin, Timer } from "lucide-react";
import { toast } from "sonner";

const BookingList = ({ bookingList, expired, onDelete }) => {
  // Receive onDelete as a prop
  const { categories } = useDoctorContext();

  // Helper function to find doctor details based on the name
  const findDoctorDetails = (doctorName) => {
    for (const category of categories) {
      const doctor = category.doctors.find((doc) => doc.name === doctorName);
      if (doctor) return doctor;
    }
    return null;
  };

  return (
    <div className="mb-10">
      {bookingList &&
        bookingList.map((booking, index) => {
          const doctorDetails = findDoctorDetails(booking?.doctor); // Find doctor details
          return (
            <div
              key={index}
              className="flex mb-3 shadow-md items-center gap-4 border p-6 rounded-lg"
            >
              {doctorDetails?.image ? (
                <Image
                  src={doctorDetails.image}
                  alt={doctorDetails.name}
                  width={70}
                  height={70}
                  className="rounded-full h-[70px] w-[70px] object-cover"
                />
              ) : (
                <div className="h-[70px] w-[70px] bg-gray-300 rounded-full flex items-center justify-center">
                  No Image
                </div>
              )}
              <div className="flex flex-col gap-2 w-full">
                <div className="md:flex md:justify-between items-center">
                  <h2 className="font-bold text-[18px]">{booking?.doctor}</h2>
                  <div className="md:inline-block hidden">
                    {!expired && (
                      <CancelAppointment
                        onCancelAppointment={() => {
                          onDelete(booking?.id); // Call the onDelete prop
                          toast("Booking cancelled successfully!");
                        }}
                      />
                    )}
                  </div>
                </div>
                <h2 className="text-sm flex gap-1 items-center">
                  <MapPin className="text-primary w-4 h-4" />
                  <span className="text-gray-500">
                    {doctorDetails?.address || "No Address Available"}
                  </span>
                </h2>
                <h2 className="text-sm flex gap-1 items-center">
                  <Calendar className="text-primary w-4 h-4" />
                  <span className="text-gray-500">
                    <span className="text-black font-semibold mr-1">
                      Appointment On:
                    </span>
                    {moment(booking?.Date).format("DD-MM-YYYY")}
                  </span>
                </h2>
                <h2 className="text-sm flex gap-1 items-center">
                  <Timer className="text-primary w-4 h-4" />
                  <span className="text-gray-500">
                    <b className="text-black mr-1">At Time:</b>
                    {booking?.Time}
                  </span>
                </h2>
                <div className="md:hidden mt-2">
                  {!expired && (
                    <CancelAppointment
                      onCancelAppointment={() => {
                        onDelete(booking?.id); // Call the onDelete prop
                        toast("Booking cancelled successfully!");
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BookingList;
