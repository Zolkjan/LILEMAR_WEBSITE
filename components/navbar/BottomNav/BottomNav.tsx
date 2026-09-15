"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import SocialMediaIcons from "../SocialMediaIcons";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useTranslations } from "next-intl";

const BottomNav = () => {
  const { resolvedTheme } = useTheme();
  const t = useTranslations("home");
  const navigation = useTranslations("navigation");
  const common = useTranslations("common");
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const logo = (
    <Image
      src={
        resolvedTheme === "dark"
          ? "/logo/Lilemar_poziomo_jasne.svg"
          : "/logo/Lilemar_poziomo_ciemne.svg"
      }
      alt="Lilemar logo"
      width={160}
      height={40}
      className="w-auto h-8 xl:h-10"
    />
  );

  return (
    <footer className="w-full bg-background text-secondary pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link href="/">{logo}</Link>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              {common("footerDescription")}
            </p>
            <SocialMediaIcons />
          </div>

          <div className="md:col-span-3">
            <h4 className="text-primary font-bold uppercase text-xs tracking-widest mb-6">
              {common("navigation")}
            </h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  {navigation("buttons.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-primary transition-colors"
                >
                  {navigation("buttons.about_us")}
                </Link>
              </li>
              <li>
                <Link
                  href="/visualizations"
                  className="hover:text-primary transition-colors"
                >
                  {navigation("buttons.visualisations")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  {navigation("buttons.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-primary font-bold uppercase text-xs tracking-widest mb-6">
              {navigation("buttons.contact")}
            </h4>
            <div className="flex flex-col gap-4 text-sm">
              <p className="text-muted-foreground leading-relaxed">
                {common("footerAddress")}
              </p>
              <a
                href="mailto:biuro@lilemar.pl"
                className="text-lg font-bold hover:text-primary transition-colors"
              >
                biuro@lilemar.pl
              </a>
              <a
                href="tel:+48000000000"
                className="text-lg font-bold hover:text-primary transition-colors"
              >
                +48 000 000 000
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium">
          <p>
            © {new Date().getFullYear()} Lilemar. {common("copyright")}
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
          >
            {common("backToTop")}
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default BottomNav;
