"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/navbar/navbar";
import Loader from "@/components/loader/loader";
import Footer from "@/components/footer/footer";
import Saturnbackground from "@/components/satturn/satturnbackground";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "rgba(255, 249, 255, 1)",
        }}
      >
        <Saturnbackground />

        <Loader />

        <Navbar />

        {children}

        {/* Footer will NOT load on "/" and "/timeline" */}
        {pathname !== "/" && pathname !== "/timeline" && <Footer />}
      </body>
    </html>
  );
}