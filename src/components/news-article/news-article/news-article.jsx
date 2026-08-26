'use client';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import styles from "./news-article.module.css";

gsap.registerPlugin(ScrollTrigger);

const NewsArticleContent = function () {
  const searchParams = useSearchParams();
  const router = useRouter();

  const articleRef  = useRef(null);
  const backBtnRef  = useRef(null);
  const h1Ref       = useRef(null);
  const subtitleRef = useRef(null);
  const metaRef     = useRef(null);
  const heroRef     = useRef(null);
  const sectionsRef = useRef([]);

  const title    = searchParams.get("title")    || "";
  const image    = searchParams.get("image")    || "";
  const date     = searchParams.get("date")     || "";
  const duration = searchParams.get("duration") || "";
  const subtitle = searchParams.get("subtitle") || "";

  let content = [];
  try {
    content = JSON.parse(searchParams.get("content") || "[]");
  } catch {
    content = [];
  }

  useEffect(() => {
    let ctx;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {

        gsap.set(backBtnRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(backBtnRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.6,
          ease: "expo.out",
          delay: 0.2,
        });

        const letters = h1Ref.current.innerText.split("");
        h1Ref.current.innerHTML = letters
          .map(l =>
            l === " "
              ? " "
              : `<span style="display:inline-block;overflow:hidden;line-height:0.95;vertical-align:bottom"><i style="display:inline-block;font-style:normal;will-change:transform">${l}</i></span>`
          )
          .join("");

        gsap.set(h1Ref.current.querySelectorAll("i"), { yPercent: 115 });
        gsap.to(h1Ref.current.querySelectorAll("i"), {
          yPercent: 0,
          duration: 2.4,
          ease: "expo.out",
          stagger: 0.06,
          delay: 0.3,
        });

        gsap.set(subtitleRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(subtitleRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.0,
          ease: "expo.out",
          delay: 0.7,
        });

        gsap.set(metaRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        gsap.to(metaRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.8,
          ease: "expo.out",
          delay: 0.9,
        });

        gsap.set(heroRef.current, { clipPath: "inset(0 0 100% 0)", opacity: 1 });
        gsap.to(heroRef.current, {
          clipPath: "inset(0 0 0% 0)",
          duration: 2.8,
          ease: "expo.out",
          delay: 0.5,
        });

        sectionsRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
          gsap.to(el, {
            clipPath: "inset(0 0% 0 0)",
            duration: 2.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              scroller: document.documentElement,
              start: "top 88%",
              once: true,
            },
            delay: 0.1 * i,
          });
        });

      }, articleRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <article className={styles["article-wrapper"]} ref={articleRef}>
      <div className={styles["header"]}>
        <button className={styles["back-btn"]} ref={backBtnRef} onClick={() => router.back()}>
          [ BACK ]
        </button>
        <h1 className={styles["heading"]} ref={h1Ref}>{title}</h1>
      </div>

      <div className={styles["title-section"]}>
        <p className={styles["subtitle"]} ref={subtitleRef}>{subtitle}</p>
        <div className={styles["meta-row"]} ref={metaRef}>
          <span>{date}</span>
          <span className={styles["meta-dot"]} />
          <span>{duration}</span>
        </div>
      </div>

      <div className={styles["hero-image"]} ref={heroRef}>
        <Image src={image} alt={title} fill style={{ objectFit: "cover" }} priority />
      </div>

      <div className={styles["article-body"]}>
        {content.map((section, index) => (
          <section
            key={index}
            className={styles["section"]}
            ref={(el) => (sectionsRef.current[index] = el)}
          >
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
};

const NewsArticle = function () {
  return (
    <Suspense fallback={<div className={styles["loading"]}>Loading...</div>}>
      <NewsArticleContent />
    </Suspense>
  );
};

export default NewsArticle;