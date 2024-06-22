import { Inter } from "next/font/google";
import "./globals.css";
import EventRegistrationForm from "./components/EventRegistrationForm";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event Registration Form",
  description: "A simple event registration form built with Tailwind CSS and ReactJS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EventRegistrationForm />
        {children}
      </body>
    </html>
  );
}
