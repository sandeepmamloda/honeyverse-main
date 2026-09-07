"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Navbar from "@/components/navbar/navbar";
import Loader from "@/components/loader/loader";
import Footer from "@/components/footer/footer";
import Saturnbackground from "@/components/satturn/satturnbackground";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const bgAudioRef = useRef(null);

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

  /* ══════════════════════════════
     BACKGROUND AUDIO
     - /audio/audio.mp3 loop mein background mein bajta rehta hai
     - Browsers autoplay-with-sound block karte hain, isliye pehle
       play() try karte hain (muted policies allow kar sakti hain),
       agar block ho jaye to first user interaction (click/scroll/
       keydown/touch) pe play kar dete hain — ek baar hi listener
       chalta hai, phir hat jata hai
  ══════════════════════════════ */
  useEffect(() => {
    const bgAudio = new Audio("/audio/audio.mp3");
    bgAudio.loop = true;
    bgAudio.volume = 0.5;
    bgAudioRef.current = bgAudio;

    const tryPlay = () => {
      bgAudio.play().catch(() => {
        // Autoplay block hua — first interaction ka wait karenge
      });
    };

    tryPlay();

    const resumeOnInteraction = () => {
      tryPlay();
      window.removeEventListener("click", resumeOnInteraction);
      window.removeEventListener("touchstart", resumeOnInteraction);
      window.removeEventListener("keydown", resumeOnInteraction);
      window.removeEventListener("scroll", resumeOnInteraction);
    };

    window.addEventListener("click", resumeOnInteraction);
    window.addEventListener("touchstart", resumeOnInteraction);
    window.addEventListener("keydown", resumeOnInteraction);
    window.addEventListener("scroll", resumeOnInteraction);

    return () => {
      window.removeEventListener("click", resumeOnInteraction);
      window.removeEventListener("touchstart", resumeOnInteraction);
      window.removeEventListener("keydown", resumeOnInteraction);
      window.removeEventListener("scroll", resumeOnInteraction);
      bgAudio.pause();
      bgAudioRef.current = null;
    };
  }, []);

  /* ══════════════════════════════
     VIDEO ↔ BACKGROUND AUDIO SYNC
     Page mein kahi bhi koi <video> tag (unmuted) play hoti hai to
     background audio pause ho jayega; video pause/end/muted-ho-jaye
     to background audio wapas resume ho jayega.
     - MutationObserver naye videos (client-side navigation se aaye
       hue) ko bhi automatically pick kar leta hai
     - Multiple videos ek saath chal rahe ho to bhi sahi handle hota
       hai — activeVideos count track karte hain
  ══════════════════════════════ */
  useEffect(() => {
    const activeUnmutedVideos = new Set();
    const attachedVideos = new Set();

    const updateBgAudioState = () => {
      const bgAudio = bgAudioRef.current;
      if (!bgAudio) return;

      if (activeUnmutedVideos.size > 0) {
        bgAudio.pause();
      } else if (bgAudio.paused) {
        bgAudio.play().catch(() => {});
      }
    };

    const handleVideoPlay = (video) => {
      if (!video.muted && video.volume > 0) {
        activeUnmutedVideos.add(video);
      }
      updateBgAudioState();
    };

    const handleVideoStop = (video) => {
      activeUnmutedVideos.delete(video);
      updateBgAudioState();
    };

    const handleVolumeChange = (video) => {
      if (video.muted || video.volume === 0) {
        activeUnmutedVideos.delete(video);
      } else if (!video.paused) {
        activeUnmutedVideos.add(video);
      }
      updateBgAudioState();
    };

    const attachToVideo = (video) => {
      if (attachedVideos.has(video)) return;
      attachedVideos.add(video);

      const onPlay = () => handleVideoPlay(video);
      const onPauseOrEnd = () => handleVideoStop(video);
      const onVolumeChange = () => handleVolumeChange(video);

      video.addEventListener("play", onPlay);
      video.addEventListener("pause", onPauseOrEnd);
      video.addEventListener("ended", onPauseOrEnd);
      video.addEventListener("volumechange", onVolumeChange);

      // Agar video already playing mila (page load ke baad mounted)
      if (!video.paused) handleVideoPlay(video);

      // cleanup ke liye reference store kar dete hain element pe hi
      video.__bgAudioCleanup = () => {
        video.removeEventListener("play", onPlay);
        video.removeEventListener("pause", onPauseOrEnd);
        video.removeEventListener("ended", onPauseOrEnd);
        video.removeEventListener("volumechange", onVolumeChange);
        activeUnmutedVideos.delete(video);
        attachedVideos.delete(video);
      };
    };

    const scanExistingVideos = () => {
      document.querySelectorAll("video").forEach(attachToVideo);
    };

    scanExistingVideos();

    // DOM mein naye videos add hone par (route change / dynamic render)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.tagName === "VIDEO") attachToVideo(node);
          node.querySelectorAll?.("video").forEach(attachToVideo);
        });

        mutation.removedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.tagName === "VIDEO") node.__bgAudioCleanup?.();
          node.querySelectorAll?.("video").forEach((v) =>
            v.__bgAudioCleanup?.()
          );
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      attachedVideos.forEach((video) => video.__bgAudioCleanup?.());
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