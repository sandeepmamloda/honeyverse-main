"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/navbar/navbar";
import Loader from "@/components/loader/loader";
import Footer from "@/components/footer/footer";
import Saturnbackground from "@/components/satturn/satturnbackground";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
    <>
      <Saturnbackground />
      <Loader />
      <Navbar />

      {children}

      {pathname !== "/" &&
        pathname !== "/timeline" &&
        pathname !== "/video-player" && <Footer />}
    </>
  );
}