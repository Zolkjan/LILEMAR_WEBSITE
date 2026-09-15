"use client";

import AdminHeader from "@/components/AdminHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFetcher } from "@/constans/apiFetcherFunction";
import { CustomFurnitureType } from "@/types";
import {
  Edit2,
  Maximize2,
  MoreVertical,
  Palette,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { useTranslations } from "next-intl";

const AdminCustomFurniturePage = () => {
  const t = useTranslations("details");
  const navigation = useTranslations("navigation");
  const { data: projects, isLoading } = useSWR<CustomFurnitureType[]>(
    "/api/custom-furnitures",
    getFetcher,
  );

  console.log(projects);

  return (
    <div className="w-full">
      <AdminHeader
        title={navigation("buttons.custom_furniture")}
        buttons={[
          {
            label: t("addNew"),
            href: "/admin/custom-furniture/new",
            icon: Plus,
          },
        ]}
      />
      <div className="p-6 md:p-10 container mx-auto">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="overflow-hidden opacity-50 animate-pulse"
              >
                <AspectRatio ratio={16 / 9} className="bg-muted" />
                <CardHeader className="h-24 bg-muted/50" />
              </Card>
            ))}
          </div>
        )}

        {!isLoading && projects?.length === 0 && (
          <Card className="border-dashed py-20 flex flex-col items-center justify-center bg-muted/20">
            <Palette className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold">{t("emptyFurniture")}</p>
            <Button variant="link" asChild>
              <Link href="/custom-furniture/new">{t("addFirst")}</Link>
            </Button>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <Link href={`/admin/custom-furniture/${project.id}`}>
                  <AspectRatio ratio={16 / 9}>
                    {project.images?.[0] ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Maximize2 className="text-muted-foreground/20 w-10 h-10" />
                      </div>
                    )}
                  </AspectRatio>
                </Link>

                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge
                    variant="outline"
                    className="bg-background/80 backdrop-blur-md uppercase text-[9px] tracking-widest"
                  >
                    {project.roomType || t("details")}
                  </Badge>
                </div>

                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/admin/custom-furniture/${project.id}`}
                          className="flex items-center"
                        >
                          <Edit2 className="mr-2 h-4 w-4" /> {t("edit")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> {t("delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardHeader className="space-y-2 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-xl tracking-tight leading-none group-hover:text-primary transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-10">
                  {project.description || t("descriptionMissing")}
                </p>
              </CardHeader>

              <CardFooter className="p-5 pt-0 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 border-t border-border/40 mt-2">
                <span>{navigation("buttons.custom_furniture")}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomFurniturePage;
