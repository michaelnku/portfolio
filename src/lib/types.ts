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

  keyFeatures: string[];
  techStack: string[];

  isFlagship: boolean;
  featured: boolean;
  published: boolean;

  liveUrl?: string | null;
  repoUrl?: string | null;
};

export type ProjectUI = ProjectDB;
