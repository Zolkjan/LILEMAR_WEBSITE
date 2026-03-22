"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { LucideIcon, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderButton {
  label: string;
  href: string;
  icon?: LucideIcon;
  variant?: "default" | "outline" | "secondary";
}

interface AdminHeaderProps {
  title: string;
  buttons?: HeaderButton[];
  showBackButton?: boolean;
  backHref?: string;
}

const AdminHeader = ({
  title,
  buttons = [],
  showBackButton = false,
  backHref,
}: AdminHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex flex-col gap-1 mb-8 border-b pb-5 border-border/60">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-9 w-9 rounded-full hover:bg-accent transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            {/* Opcjonalny subtelny akcent pod tytułem */}
            <div className="h-1 w-12 bg-primary rounded-full mt-1" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {buttons.map((btn, index) => (
            <Button
              key={index}
              variant={btn.variant || "default"}
              asChild
              className="shadow-sm"
            >
              <Link href={btn.href} className="flex items-center gap-2">
                {btn.icon && <btn.icon size={18} />}
                <span className="hidden sm:inline">{btn.label}</span>
                <span className="sm:hidden">
                  {btn.icon ? <btn.icon size={18} /> : btn.label}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
