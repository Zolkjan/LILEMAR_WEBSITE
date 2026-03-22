"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { MoveRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePagePortfolio = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Dane zdjęć z osobnymi wartościami dla Desktop i Mobile
  const visualizations = [
    {
      id: "v1",
      src: "/images/jadalnia_czerwona_dzien.jpg",
      dx: -450,
      dy: -200,
      mx: -20,
      my: -280,
    },
    {
      id: "v2",
      src: "/images/lazienka_zlota.jpg",
      dx: -350,
      dy: 200,
      mx: 40,
      my: -180,
    },
    {
      id: "v3",
      src: "/images/pokoj_dzieciecy.jpg",
      dx: -550,
      dy: 0,
      mx: -50,
      my: -80,
    },
    {
      id: "v4",
      src: "/images/lazienka_niebieska.jpg",
      dx: -150,
      dy: -300,
      mx: 10,
      my: -350,
    },
  ];

  const furniture = [
    {
      id: "f1",
      src: "/images/salon_ciemny.jpg",
      dx: 450,
      dy: -200,
      mx: 30,
      my: 280,
    },
    {
      id: "f2",
      src: "/images/salon_zielony_dzien.jpg",
      dx: 350,
      dy: 200,
      mx: -40,
      my: 180,
    },
    {
      id: "f3",
      src: "/images/sypialnia_fiolet.jpg",
      dx: 550,
      dy: 0,
      mx: 50,
      my: 80,
    },
    {
      id: "f4",
      src: "/images/jadalnia_ciemna.jpg",
      dx: 150,
      dy: 300,
      mx: -10,
      my: 350,
    },
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=150%" : "+=250%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Tło - Marquee (tylko na desktopie dla płynności)
      if (!isMobile) {
        tl.to(".bg-text-left", { x: -300, ease: "none" }, 0);
        tl.to(".bg-text-right", { x: 300, ease: "none" }, 0);
      }

      // 2. Animacja zdjęć - Logika Desktop vs Mobile
      tl.fromTo(
        ".portfolio-img",
        { x: 0, y: 0, opacity: 0, scale: 0.2, filter: "blur(10px)" },
        {
          x: (i, target) => {
            return isMobile
              ? Number(target.getAttribute("data-mx"))
              : Number(target.getAttribute("data-dx"));
          },
          y: (i, target) => {
            return isMobile
              ? Number(target.getAttribute("data-my"))
              : Number(target.getAttribute("data-dy"));
          },
          opacity: 1,
          scale: isMobile ? 0.75 : 1,
          rotation: (i) => (i % 2 === 0 ? -8 : 8),
          filter: "blur(0px)",
          stagger: 0.04,
          ease: "power2.out",
        },
        0.1,
      );

      // 3. Przyciski
      tl.fromTo(
        ".portfolio-actions",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        "-=0.2",
      );

      ScrollTrigger.refresh();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-background overflow-hidden"
    >
      {/* Ziarno - zawsze widoczne, dodaje tekstury */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Dynamiczne teksty w tle - UKRYTE NA MOBILE dla przejrzystości */}
      <div className="hidden md:flex absolute inset-0 flex-col justify-around py-20 pointer-events-none opacity-[0.04]">
        <div className="bg-text-left whitespace-nowrap text-[15vw] font-black leading-none text-foreground select-none uppercase">
          Virtual Design • Visualizations • 3D Rendering •
        </div>
        <div className="bg-text-right whitespace-nowrap text-[15vw] font-black leading-none text-foreground select-none self-end uppercase">
          • Custom Furniture • Real Craft • Woodwork •
        </div>
      </div>

      {/* Światła w tle - delikatniejsze na mobile */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_60%)] opacity-[0.06] md:opacity-[0.08]" />

      <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
        {/* NAGŁÓWEK - skalowanie fontu pod mobile */}
        <div className="z-10 text-center pointer-events-none mb-4">
          <span className="text-primary font-black tracking-[0.4em] uppercase text-[9px] md:text-[10px] block mb-2 md:mb-6">
            02 — Galeria Prac
          </span>
          <h2 className="text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none text-foreground drop-shadow-xl">
            PORT<span className="text-primary italic">FOLIO</span>
          </h2>
        </div>

        {/* ZDJĘCIA - Kontener z różnymi wymiarami dla mobile */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {visualizations.map((img) => (
            <img
              key={img.id}
              src={img.src}
              data-dx={img.dx}
              data-dy={img.dy}
              data-mx={img.mx}
              data-my={img.my}
              className="portfolio-img absolute w-44 sm:w-64 md:w-80 lg:w-[420px] aspect-video object-cover 
                         rounded-xl md:rounded-2xl shadow-2xl border border-primary/20 bg-muted"
              alt="Wizualizacja"
            />
          ))}

          {furniture.map((img) => (
            <img
              key={img.id}
              src={img.src}
              data-dx={img.dx}
              data-dy={img.dy}
              data-mx={img.mx}
              data-my={img.my}
              className="portfolio-img absolute w-44 sm:w-64 md:w-80 lg:w-[420px] aspect-video object-cover 
                         rounded-xl md:rounded-2xl shadow-2xl border border-secondary/20 bg-muted"
              alt="Realizacja"
            />
          ))}
        </div>

        <div className="portfolio-actions z-30 flex flex-col md:flex-row gap-4 md:gap-6 mt-10 md:mt-16 opacity-0 w-full max-w-xs md:max-w-2xl px-6">
          <Link
            href="/wizualizacje"
            className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 md:py-6 bg-primary text-primary-foreground font-black uppercase text-[11px] md:text-xs rounded-xl md:rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
          >
            Projekty 3D{" "}
            <MoveRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/meble"
            className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 md:py-6 bg-secondary text-secondary-foreground font-black uppercase text-[11px] md:text-xs rounded-xl md:rounded-2xl hover:scale-105 transition-all shadow-xl"
          >
            Realizacje Meblowe{" "}
            <MoveRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform text-primary" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HomePagePortfolio;
