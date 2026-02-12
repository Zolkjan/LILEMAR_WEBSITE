"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HomePagePortfolio = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const homePortfolioImages = [
    {
      id: "img1",
      src: "/images/jadalnia_czerwona_dzien.jpg",
      x: -400,
      y: -250,
    },
    { id: "img2", src: "/images/lazienka_zlota.jpg", x: 400, y: -250 },
    { id: "img3", src: "/images/pokoj_dzieciecy.jpg", x: -550, y: 0 },
    { id: "img4", src: "/images/salon_ciemny.jpg", x: 550, y: 0 },
    { id: "img5", src: "/images/salon_zielony_dzien.jpg", x: -400, y: 250 },
    { id: "img6", src: "/images/sypialnia_fiolet.jpg", x: 400, y: 250 },
    { id: "img7", src: "/images/lazienka_niebieska.jpg", x: 0, y: -320 },
    { id: "img8", src: "/images/jadalnia_ciemna.jpg", x: 0, y: 320 },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        ".portfolio-img",
        {
          x: 0,
          y: 0,
          opacity: 0,
          scale: 0.1,
          rotation: () => Math.random() * 90 - 45,
          filter: "grayscale(100%) blur(10px)",
        },
        {
          x: (i) => {
            const isMobile = window.innerWidth < 768;
            if (isMobile) {
              const mobileX = [-70, 70, -85, 85, -70, 70, 0, 0];
              return mobileX[i];
            }
            return homePortfolioImages[i].x;
          },
          y: (i) => {
            const isMobile = window.innerWidth < 768;
            if (isMobile) {
              const mobileY = [-280, -200, -100, 100, 200, 280, -350, 350];
              return mobileY[i];
            }
            return homePortfolioImages[i].y;
          },
          opacity: 1,
          scale: (i) => (window.innerWidth < 768 ? 0.8 : 1),
          rotation: () => Math.random() * 12 - 6,
          filter: "grayscale(0%) blur(0px)",
          stagger: 0.05,
          ease: "power2.out",
        },
      );

      tl.fromTo(
        ".portfolio-button",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.4",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-background text-foreground font-sans overflow-hidden transition-colors duration-500"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.07] pointer-events-none" />

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-extrabold z-10 select-none tracking-tighter leading-none text-center drop-shadow-2xl">
          Portfolio
        </h1>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {homePortfolioImages.map(({ id, src }) => (
            <img
              key={id}
              src={src}
              alt={id}
              className="portfolio-img absolute w-36 sm:w-48 md:w-64 lg:w-80 h-auto aspect-video object-cover 
                         rounded-lg shadow-2xl border border-primary/20 bg-muted transform-gpu"
            />
          ))}
        </div>

        <div className="z-20 mt-6 h-20">
          <Link
            href="/portfolio"
            className="portfolio-button opacity-0 inline-block px-8 py-3 md:px-10 md:py-4 
                        bg-primary text-primary-foreground text-base md:text-lg font-bold 
                        rounded-full shadow-lg shadow-primary/20
                        hover:bg-secondary hover:text-secondary-foreground 
                        transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Zobacz projekty
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePagePortfolio;
