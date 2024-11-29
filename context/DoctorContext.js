// context/DoctorContext.js
"use client";
import { createContext, useContext, useState } from "react";

// Create the context for doctors
const DoctorContext = createContext();

// Create the provider component that will hold the global state
export const DoctorProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      Name: "Cardio",
      Icon: "/Cardio_icon.png",
      doctors: [
        {
          id: "1",
          name: "Dr. Alice Smith",
          gender: "Female",
          specialization: "Cardio",
          address: "123 Health St, Cityville",
          patients: "200+",
          yearOfExperience: "10",
          startTime: "09:00",
          endTime: "17:00",
          about:
            "Dr. Alice is an experienced cardiologist who has been helping patients for over a decade.",
          phone: "123-456-7890",
          image: "/Dr. Asma Afsaruddin.png",
          premium: true,
        },
      ],
    },
    {
      id: 2,
      Name: "Dentist",
      Icon: "/Dentist_icon.png",
      doctors: [
        {
          id: "2",
          name: "Dr. Clara Jones",
          gender: "Female",
          specialization: "Dentist",
          address: "456 Wellness Ave, Healthtown",
          patients: "150+",
          yearOfExperience: "8",
          startTime: "08:00",
          endTime: "16:00",
          about:
            "Dr. Clara specializes in pediatric care, ensuring the health of children across the city.",
          phone: "234-567-8901",
          image: "/Dr. Emily Carter.png",
          premium: false,
        },
      ],
    },
    {
      id: 3,
      Name: "Eye Specialist",
      Icon: "/Eye_Specialist_icon.png",
      doctors: [
        {
          id: "3",
          name: "Dr. Sarah Johnson",
          gender: "Female",
          specialization: "Eye Specialist",
          address: "789 Care Blvd, Medicity",
          patients: "300+",
          yearOfExperience: "12",
          startTime: "10:00",
          endTime: "18:00",
          about:
            "Dr. Sarah is a renowned dermatologist known for her expertise in treating complex skin conditions.",
          phone: "345-678-9012",
          image: "/Dr. Sarah Thompson.png",
          premium: true,
        },
      ],
    },
    {
      id: 4,
      Name: "Neurologist",
      Icon: "/Neurologist_icon.png",
      doctors: [
        {
          id: "4",
          name: "Dr. Emily Davis",
          gender: "Female",
          specialization: "Neurologist",
          address: "101 Neural Dr, Neurocity",
          patients: "250+",
          yearOfExperience: "15",
          startTime: "07:00",
          endTime: "15:00",
          about:
            "Dr. Emily is a neurologist focused on helping patients with critical brain and nervous system issues.",
          phone: "456-789-0123",
          image: "/Dr. Jessica Miller.png",
          premium: true,
        },
      ],
    },
    {
      id: 5,
      Name: "Orthopedic",
      Icon: "/Orthopedic_icon.png",
      doctors: [
        {
          id: "5",
          name: "Dr. Anna Brown",
          gender: "Female",
          specialization: "Orthopedic",
          address: "678 Joint Way, Boneville",
          patients: "100+",
          yearOfExperience: "5",
          startTime: "08:30",
          endTime: "14:30",
          about:
            "Dr. Anna is an orthopedic specialist committed to improving mobility and joint health.",
          phone: "567-890-1234",
          image: "/Dr. Olivia Williams.png",
          premium: false,
        },
      ],
    },
    {
      id: 6,
      Name: "Psychotropic",
      Icon: "/Psychotropic_icon.png",
      doctors: [
        {
          id: "6",
          name: "Dr. John Doe",
          gender: "Male",
          specialization: "Psychotropic",
          address: "321 Mental Ave, Mindcity",
          patients: "300+",
          yearOfExperience: "20",
          startTime: "10:00",
          endTime: "18:00",
          about:
            "Dr. John is a leading psychiatrist, dedicated to understanding and improving mental health.",
          phone: "678-901-2345",
          image: "/Dr. James Anderson.png",
          premium: true,
        },
      ],
    },
    {
      id: 7,
      Name: "General Doctor",
      Icon: "/General_Doctor_icon.png",
      doctors: [
        {
          id: "7",
          name: "Dr. Mark Wilson",
          gender: "Male",
          specialization: "General Doctor",
          address: "987 Xray Lane, Scantown",
          patients: "80+",
          yearOfExperience: "7",
          startTime: "09:30",
          endTime: "17:30",
          about:
            "Dr. Mark is a radiologist offering precision imaging and diagnostic services.",
          phone: "789-012-3456",
          image: "/Dr. John Wilson.png",
          premium: false,
        },
      ],
    },
    {
      id: 8,
      Name: "Surgeon",
      Icon: "/Surgon_icon.png",
      doctors: [
        {
          id: "8",
          name: "Dr. Michael Taylor",
          gender: "Male",
          specialization: "Surgeon",
          address: "654 Scalpel St, Cutcity",
          patients: "500+",
          yearOfExperience: "25",
          startTime: "06:00",
          endTime: "14:00",
          about:
            "Dr. Michael is a top surgeon specializing in complex surgeries with high success rates.",
          phone: "890-123-4567",
          image: "/Dr. Michael Green.png",
          premium: true,
        },
      ],
    },
    // Include the other categories here...
  ]);
  const [appointments, setAppointments] = useState([]);
  const addAppointment = (appointment) => {
    if(!appointment){
        return false;
    }
    setAppointments((prev) => [...prev, appointment]);
    return true
  };

  const getAppointments = (userEmail) => {
    if (!userEmail) {
      throw new Error("User Email is required to Fetch Appointments");
    }
    return appointments.filter(
      (appointment) => appointment?.email === userEmail
    );
  };

  // Return the provider with the value you want to share across your app
  return (
    <DoctorContext.Provider
      value={{
        categories,
        setCategories,
        appointments,
        addAppointment,
        getAppointments,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

// Custom hook to use the DoctorContext
export const useDoctorContext = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error("useDoctorContext must be used within a DoctorProvider");
  }
  return context;
};
