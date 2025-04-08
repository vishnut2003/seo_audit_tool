import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RouteLoader from "@/Components/RouteLoader";

const rubik = localFont({
  src: './fonts/RubikFont.ttf',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: "SEO Audit Tool",
  description: "By Web Spider Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} antialiased`}
      >
        {children}
        <RouteLoader/>
      </body>
    </html>
  );
}
