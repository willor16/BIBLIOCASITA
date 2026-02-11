import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bibliocasita - Literary Elegance",
  description: "A sanctuary for thought and reading.",
  openGraph: {
    images: ['/images/lOGO BIBLIOCASITA.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${workSans.variable} antialiased bg-background-light text-charcoal font-display`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>

    </html>
  );
}
