import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RouteLoader from "@/Components/RouteLoader";
import NextTopLoader from "nextjs-toploader";

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
        <NextTopLoader color="#3c50e0" showSpinner={false} />
        {children}
        <RouteLoader/>
      </body>
    </html>
  );
}
