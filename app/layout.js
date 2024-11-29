// layout.js or _app.js (depending on your Next.js version)

import { DoctorProvider } from "../context/DoctorContext"; // Adjust the path as needed
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DoctorProvider>
          {" "}
          {/* Wrap the entire application with the DoctorProvider */}
          <div className="md:px-20">
            <Header />
            {children}
            <Toaster />
          </div>
          <Footer />
        </DoctorProvider>
      </body>
    </html>
  );
}
