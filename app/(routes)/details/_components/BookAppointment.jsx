"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Calendar1, Clock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useDoctorContext } from "@/context/DoctorContext";

const BookAppointment = ({ doctor }) => {
  const [date, setDate] = useState();
  const [timeSlot, setTimeSlot] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [note, setNote] = useState("");
  const user = useKindeBrowserClient();

  const { addAppointment, appointments } = useDoctorContext();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ":00 PM" });
      timeList.push({ time: i + ":30 PM" });
    }
    setTimeSlot(timeList);
  };

  const pastDay = (day) => day <= new Date();

  const saveAppointment = () => {
    const newAppointment = {
      UserName: `${user?.user?.given_name} ${user?.user?.family_name}`,
      Email: user?.user?.email,
      Date: date,
      Time: selectedTimeSlot,
      Note: note,
      doctor: doctor?.name,
    };

    const isSaved = addAppointment(newAppointment);

    if (isSaved) {
      toast.success("Appointment successfully booked!");
    } else {
      toast.error("Failed to book the appointment.");
    }
  };

  return (
    <Dialog className="">
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-700 mt-5 md:w-fit sm:w-full rounded-full">
          Book Appointment
        </Button>
      </DialogTrigger>

      <DialogContent className="h-4/5 rounded-lg md:h-fit overflow-x-hidden overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Book Appointment</DialogTitle>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-baseline gap-2">
              <h2 className="flex gap-1 items-center mt-5 md:mt-2">
                <Calendar1 className="text-primary h-5 w-5" />
                <span className="text-sm text-gray-500">Select Date</span>
              </h2>

              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border max-w-fit"
                disabled={pastDay}
              />
            </div>

            <div className="mt-2">
              <h2 className="flex text-gray-500 text-sm items-center mb-2 gap-1">
                <Clock className="w-5 h-5" />
                <span>Select Time Slot</span>
              </h2>
              <div className="grid grid-cols-3 gap-2 border p-2 rounded-xl">
                {timeSlot &&
                  timeSlot.map((slot, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedTimeSlot(slot?.time)}
                      className={`${
                        selectedTimeSlot === slot?.time
                          ? "bg-primary text-white"
                          : "text-slate-700"
                      }
                      border cursor-pointer hover:bg-primary hover:text-white p-2 text-sm text-center rounded-lg`}
                    >
                      {slot.time}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </DialogHeader>

        <Textarea
          placeholder="Note"
          className="border-black border-2"
          onChange={(e) => setNote(e.target.value)}
        />

        <DialogFooter className="sm:justify-end items-baseline">
          <DialogClose asChild className="">
            <div className="flex justify-end w-full gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-red-500 hover:bg-red-500 hover:text-white text-red-500"
              >
                Close
              </Button>
              <Button
                type="button"
                disabled={!(date && selectedTimeSlot)}
                onClick={saveAppointment}
                className="bg-primary text-white hover:bg-blue-600 hover:text-white"
              >
                Submit
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
