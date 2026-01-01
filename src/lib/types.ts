import { UserRole } from "@/generated/prisma/client";

export type UserDTO = {
  id: string;
  email: string;
  role: UserRole;

  name?: string | null;
  username?: string | null;
  image?: string | null;
};

export type AppUser = UserDTO | null;

export type SessionUser = {
  id?: string | null;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: string | null;
};

export type ProjectDB = {
  id: string;
  name: string;
  role: string;
  summary: string;

  description: string | null;
  keyFeatures: string[];
  techStack: { key: string; value: string }[];

  isFlagship: boolean;
  featured: boolean;
  published: boolean;

  liveUrl: string | null;
  repoUrl: string | null;
  createdAt: Date;
};

export type ProjectUI = ProjectDB;

export type AboutDB = {
  id: string;
  fullName: string;
  headline: string;
  subHeadline: string;
  shortBio: string;

  profileImage: string | null;
  heroImage: string | null;
  resume: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;

  bioBlocks: {
    type: "text" | "highlight";
    value: string;
    highlightType?: "name" | "project";
  }[];
  experience: {
    year: string;
    title: string;
    context?: string;
    description: string;
  }[];
  skills: { name: string }[];

  createdAt: Date;
  updatedAt: Date;
};
export type AboutUI = Omit<AboutDB, "id" | "createdAt" | "updatedAt">;
//export type AboutUI = AboutDB;
