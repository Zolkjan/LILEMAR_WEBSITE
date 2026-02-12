"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ButtonGroup } from "../../ui/button-group";
import { Button } from "../../ui/button";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  return (
    <ButtonGroup>
      <Button
        onClick={() => switchLocale("pl")}
        variant={locale === "pl" ? "default" : "outline"}
        className={`${locale === "pl" && "font-bold"}`}
      >
        PL
      </Button>
      <Button
        onClick={() => switchLocale("en")}
        variant={locale === "en" ? "default" : "outline"}
        className={`${locale === "en" && "font-bold"}`}
      >
        EN
      </Button>
    </ButtonGroup>
  );
};

export default LanguageSwitcher;
