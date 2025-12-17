import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Events Admin Dashboard",
  description: "ServiceNow-like admin dashboard for managing events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
