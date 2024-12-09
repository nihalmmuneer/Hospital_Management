"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList.jsx";
import { useDoctorContext } from "../../../context/DoctorContext.js";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image.js";
const MyBooking = () => {
  const { getAppointments, removeAppointment } = useDoctorContext();
  const { user } = useKindeBrowserClient();
  const [userAppointments, setUserAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchUserAppointments();
    }
  }, [user]);

  const fetchUserAppointments = async () => {
    setLoading(true);
    try {
      const fetchedAppointments = await getAppointments(user.email);
      setUserAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = (type) => {
    return userAppointments?.filter((appointment) =>
      type === "upcoming"
        ? new Date(appointment?.Date) >= new Date()
        : new Date(appointment?.Date) < new Date()
    );
  };

  const handleCancelAppointment = (id) => {
    // Remove the appointment from the server
    removeAppointment(id);

    // Update the userAppointments state immediately
    setUserAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="px-5 mb-10">
      <h2 className="text-2xl font-bold mt-5">My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mt-3 mb-5 w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {loading ? (
            <div className="flex w-full justify-center">
              <Image src={"/spinner.gif"} alt="Loading..." className="w-6 h-6" width={30} height={30} />
            </div>
          ) : userAppointments.length > 0 ? (
            <BookingList
              bookingList={filterAppointments("upcoming")}
              expired={false}
              onDelete={handleCancelAppointment} // Pass handleCancelAppointment
            />
          ) : (
            <div className="flex w-full justify-center text-gray-500">No Upcoming Bookings</div>
          )}
        </TabsContent>
        <TabsContent value="expired">
          {loading ? (
            <div className="flex w-full justify-center">
              <Image src={"/spinner.gif"} alt="Loading..." className="w-6 h-6" width={30} height={30} />
            </div>
          ) : userAppointments.length > 0 ? (
            <BookingList
              bookingList={filterAppointments("expired")}
              expired={true}
              onDelete={handleCancelAppointment} // Pass handleCancelAppointment
            />
          ) : (
            <div className="flex w-full justify-center text-gray-500">No Expired Bookings</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBooking;
