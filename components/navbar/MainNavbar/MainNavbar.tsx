"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import ThemeToggle from "../../ThemeToggle";
import LanguageSwitcher from "../LanguageSwitcher";
import { useEffect, useState } from "react";
import SocialMediaIcons from "../SocialMediaIcons";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react"; // Import ikony hamburgera
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"; // Komponent Sheet z Shadcn

const MainNavbar = () => {
  const t = useTranslations("navigation");
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/^\/(en|pl)(\/|$)/, "/"); // Poprawiony regex dla wielu języków

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navigationItems = [
    { label: t("buttons.home"), href: "/" },
    { label: t("buttons.custom_furniture"), href: "/custom-furniture" },
    { label: t("buttons.visualisations"), href: "/visualisations" },
    { label: t("buttons.about_us"), href: "/about-us" },
    { label: t("buttons.contact"), href: "/contact" },
  ];

  const Logo = () => (
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
    <nav className="fixed top-0 z-50 flex justify-center w-full xl:px-4">
      <div className="w-full max-w-7xl h-16 xl:h-20 rounded-b-full border bg-background/80 backdrop-blur-md px-12 xl:px-16 flex items-center justify-between shadow-sm">
        <div className="shrink-0">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="hidden xl:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent transition-all",
                      normalizedPath === item.href
                        ? "font-bold text-primary scale-105"
                        : "text-sm font-medium",
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <SocialMediaIcons />
          </div>
          <div className="xl:hidden flex items-center gap-3">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-accent rounded-full transition-colors">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex flex-col justify-between h-full p-6"
              >
                <div className="flex flex-col gap-6 mt-10">
                  <SheetTitle className="text-left text-xl">Menu</SheetTitle>
                  {navigationItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "text-lg transition-colors hover:text-primary",
                        normalizedPath === item.href
                          ? "font-bold text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-4 border-t pt-6 pb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Język</span>
                    <LanguageSwitcher />
                  </div>
                  <div className="flex justify-center py-2">
                    <SocialMediaIcons />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
