import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VS Holdings | Excellence in Strategic Investment & Management",
  description: "VS Holdings represents global excellence in strategic investment, asset management, and visionary business development.",
  keywords: ["VS Holdings", "Strategic Investment", "Asset Management", "Visionary Business", "Portfolio Management"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
