import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Purin Page",
  description: "Personal dashboard and util links",
};

import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
