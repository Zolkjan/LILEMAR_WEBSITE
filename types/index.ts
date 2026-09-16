import { ProjectModules, ProjectThemes } from "@/enums";

export type VisualisationType = {
  id?: string;
  title: string;
  description: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
  roomType: string;
  theme: ProjectThemes;
  projectModule: ProjectModules;
};

export type CustomFurnitureType = {
  id?: string;
  title: string;
  description: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
  roomType: string;
  theme: ProjectThemes;
};
