"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./newsgrid.module.css";

const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12.5a2.5 2.5 0 0 0 2.5-2.5V5a2.5 2.5 0 0 0-5 0v5a2.5 2.5 0 0 0 2.5 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.833 9.167A5.833 5.833 0 0 1 4.167 9.167" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 15v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PressIcon = () => (
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <g clipPath="url(#clip0_291_815)">
        <path
          d="M13.6463 16.3752H9.09766"
          stroke="#D9186A"
          strokeWidth="1.81946"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.3755 12.7363H9.09766"
          stroke="#D9186A"
          strokeWidth="1.81946"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.63782 20.0142H18.1935C18.6761 20.0142 19.1388 19.8225 19.4801 19.4813C19.8213 19.1401 20.013 18.6773 20.013 18.1947V3.63904C20.013 3.15649 19.8213 2.6937 19.4801 2.35249C19.1388 2.01127 18.6761 1.81958 18.1935 1.81958H7.27674C6.79419 1.81958 6.3314 2.01127 5.99019 2.35249C5.64897 2.6937 5.45728 3.15649 5.45728 3.63904V18.1947C5.45728 18.6773 5.26559 19.1401 4.92437 19.4813C4.58316 19.8225 4.12037 20.0142 3.63782 20.0142ZM3.63782 20.0142C3.15527 20.0142 2.69248 19.8225 2.35127 19.4813C2.01005 19.1401 1.81836 18.6773 1.81836 18.1947V10.0072C1.81836 9.5246 2.01005 9.06182 2.35127 8.7206C2.69248 8.37939 3.15527 8.18769 3.63782 8.18769H5.45728"
          stroke="#D9186A"
          strokeWidth="1.81946"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.4658 5.45825H10.0074C9.50496 5.45825 9.09766 5.86555 9.09766 6.36798V8.18744C9.09766 8.68987 9.50496 9.09717 10.0074 9.09717H15.4658C15.9682 9.09717 16.3755 8.68987 16.3755 8.18744V6.36798C16.3755 5.86555 15.9682 5.45825 15.4658 5.45825Z"
          stroke="#D9186A"
          strokeWidth="1.81946"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <defs>
        <clipPath id="clip0_291_815">
          <rect width="21.8335" height="21.8335" fill="white" />
        </clipPath>
      </defs>
    </svg>
);

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS
   (feararchitecture.jsx wale hi pattern se liya — sirf inline style
   inject karte hain, CSS module ko bilkul touch nahi karte)
══════════════════════════════ */
const useRevealVisible = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -2% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const clipStart = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
};

const Reveal = ({
  children,
  className = "",
  delay = 0,
  as = "div",
  direction = "left",
  duration = 1.1,
  style: extraStyle = {},
}) => {
  const Tag = as;
  const [ref, visible] = useRevealVisible();

  const style = {
    clipPath: visible ? "inset(0 0 0 0)" : clipStart[direction],
    WebkitClipPath: visible ? "inset(0 0 0 0)" : clipStart[direction],
    opacity: visible ? 1 : 0,
    transitionProperty: "clip-path, -webkit-clip-path, opacity",
    transitionDuration: `${duration}s, ${duration}s, 0.1s`,
    transitionTimingFunction: "cubic-bezier(0.83,0,0.17,1)",
    transitionDelay: `${delay}ms`,
    willChange: "clip-path, opacity",
    ...extraStyle,
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
};

const RevealLetters = ({ text, delay = 0, step = 16, className = "" }) => {
  const [ref, visible] = useRevealVisible();

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            lineHeight: 1,
            verticalAlign: "bottom",
          }}
        >
          <i
            style={{
              display: "inline-block",
              fontStyle: "normal",
              transform: visible ? "translateY(0%)" : "translateY(115%)",
              transition: `transform 1.4s cubic-bezier(0.19,1,0.22,1) ${delay + i * step}ms`,
              willChange: "transform",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </i>
        </span>
      ))}
    </span>
  );
};

const newsItems = [
  {
    id: 1,
    number: "01",
    category: "INTERVIEW",
    icon: "mic",
    date: "AUG. 2025",
    title: "SOUND AS STRUCTURE",
    excerpt:
      "The directors sit down to discuss how replacing musical scores with industrial room tones fundamentally changes the viewer's psychological state.",
    image: "/images/news/newsgrid-1.jpg",
  },
  {
    id: 2,
    number: "02",
    category: "PRESS RELEASE",
    icon: "press",
    date: "JUN. 2025",
    title: "ACQUISITION PROTOCOL INITIATED",
    excerpt:
      "Announcing the acquisition of the rights to 'The Saffron Protocol', a brutalist sci-fi property previously deemed unadaptable.",
    image: "/images/news/newsgrid-2.jpg",
  },
  {
    id: 3,
    number: "03",
    category: "INTERVIEW",
    icon: "mic",
    date: "AUG. 2025",
    title: "SOUND AS STRUCTURE",
    excerpt:
      "The directors sit down to discuss how replacing musical scores with industrial room tones fundamentally changes the viewer's psychological state.",
    image: "/images/news/newsgrid-1.jpg",
  },
  {
    id: 4,
    number: "04",
    category: "PRESS RELEASE",
    icon: "press",
    date: "JUN. 2025",
    title: "ACQUISITION PROTOCOL INITIATED",
    excerpt:
      "Announcing the acquisition of the rights to 'The Saffron Protocol', a brutalist sci-fi property previously deemed unadaptable.",
    image: "/images/news/newsgrid-2.jpg",
  },
];

// viewport ke hisab se decide karta hai ek time me kitne cards dikhne chahiye:
// desktop (>768px) => 2, mobile (<=768px) => 1
function getPerPage() {
  if (typeof window === "undefined") return 2;
  return window.innerWidth <= 768 ? 1 : 2;
}

const NewsGrid = () => {
  const router = useRouter();
  const [perPage, setPerPage] = useState(2);
  const [page, setPage] = useState(0); // ab "page" = current leftmost card ka index

  const viewportRef = useRef(null);
  const cardRefs = useRef([]);
  const dragRef = useRef({ startX: 0, startScroll: 0, dragging: false });
  const dragMoved = useRef(false); // taaki drag ke baad accidental navigation na ho
  const rafRef = useRef(null);

  // sliding-window carousel: ek swipe = 1 card aage, lekin screen par hamesha
  // `perPage` cards dikhte hain. Isliye stopping positions = N - perPage + 1
  const totalPages = Math.max(1, newsItems.length - perPage + 1);

  useEffect(() => {
    function update() {
      setPerPage(getPerPage());
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  // scroll hote waqt dekhta hai konsa card sabse leftmost / current hai (offsetLeft
  // browser khud compute karta hai — koi manual width-math nahi), aur active dot update
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    function handleScroll() {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const scrollLeft = viewport.scrollLeft;
        let closestIdx = 0;
        let minDist = Infinity;
        cardRefs.current.forEach((el, idx) => {
          if (!el) return;
          const dist = Math.abs(el.offsetLeft - scrollLeft);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = idx;
          }
        });
        setPage(closestIdx);
      });
    }

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // dot click -> us index wale card tak precise scroll (native scroll-snap khud align kar leta hai)
  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(index, totalPages - 1));
    const targetCard = cardRefs.current[clamped];
    targetCard?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  // desktop par mouse se drag-to-scroll (touch par native swipe already kaam karta hai)
  function handlePointerDown(e) {
    dragMoved.current = false;
    if (e.pointerType === "touch") return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    dragRef.current = { startX: e.clientX, startScroll: viewport.scrollLeft, dragging: true };
    viewport.style.scrollSnapType = "none";
    viewport.style.scrollBehavior = "auto";
  }

  function handlePointerMove(e) {
    if (!dragRef.current.dragging) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 5) dragMoved.current = true; // real drag hua, click block karo
    viewport.scrollLeft = dragRef.current.startScroll - dx;
  }

  function handlePointerUp() {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.style.scrollSnapType = "x mandatory";
    viewport.style.scrollBehavior = "smooth";
  }

  // card click -> /news-article pe navigate, sirf tabhi jab actual drag na hua ho
  function handleCardClick(item) {
    if (dragMoved.current) return;
    const params = new URLSearchParams({
      title: item.title,
      image: item.image,
      date: item.date,
      duration: item.category,
      subtitle: item.excerpt,
      content: JSON.stringify([{ heading: item.title, body: item.excerpt }]),
    });
    router.push(`/news-article?${params.toString()}`);
  }

  return (
    <section className={styles["newsgrid-main"]}>
      {/* ── SORT HEADER ── */}
      <Reveal as="div" direction="left" duration={1.6} className={styles["sort-row"]}>
        <span>SORT: CHRONOLOGICAL</span>
      </Reveal>

      {/* ── CAROUSEL VIEWPORT — native scroll-snap, sliding window ── */}
      <div
        ref={viewportRef}
        className={styles["carousel-viewport"]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div className={styles["cards-track"]}>
          {newsItems.map((item, idx) => {
            const base = (idx % perPage) * 350; // per-visible-card stagger
            return (
              <article
                key={item.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                data-index={idx}
                className={styles["news-card"]}
                style={{ scrollSnapAlign: "start" }}
                onClick={() => handleCardClick(item)}
              >
                <Reveal
                  as="div"
                  direction="up"
                  delay={base}
                  duration={1.8}
                  className={styles["card-image-wrap"]}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={styles["card-image"]} src={item.image} alt={item.title} draggable={false} />
                  <span className={styles["card-number"]}>{item.number}</span>
                  <span className={styles["hover-indicator"]}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 14 14 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.5 6H14v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Reveal>

                <Reveal
                  as="div"
                  direction="left"
                  delay={base + 350}
                  duration={1.3}
                  className={styles["card-meta"]}
                >
                  <span className={styles["meta-icon"]}>
                    {item.icon === "mic" ? <MicIcon /> : <PressIcon />}
                  </span>
                  <span className={styles["meta-category"]}>{item.category}</span>
                  <span className={styles["meta-sep"]}>»</span>
                  <span className={styles["meta-date"]}>{item.date}</span>
                </Reveal>

                <h2 className={styles["card-title"]}>
                  <RevealLetters text={item.title} delay={base + 550} step={26} />
                </h2>

                <Reveal
                  as="p"
                  direction="left"
                  delay={base + 950}
                  duration={1.3}
                  className={styles["card-excerpt"]}
                >
                  {item.excerpt}
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── PAGINATION DOTS ── */}
      <Reveal as="div" direction="up" delay={400} duration={1.4} className={styles["pagination-wrap"]}>
        <div className={styles["pagination-pill"]}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to card ${i + 1}`}
              className={`${styles["dot"]} ${i === page ? styles["dot-active"] : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default NewsGrid;