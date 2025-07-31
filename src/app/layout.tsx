import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ResponsiveDashboardLayout } from "@/components/layout/ResponsiveDashboardLayout";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ADmyBRAND Insights Dashboard",
  description: "Analytics dashboard for ADmyBRAND Insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <ResponsiveDashboardLayout>
            {children}
          </ResponsiveDashboardLayout>
        </AuthProvider>
      </body>
    </html>
  );
}