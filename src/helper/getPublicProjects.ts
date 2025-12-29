import { prisma } from "@/lib/prisma";
import { ProjectUI } from "@/lib/types";

export async function getPublicProjects(): Promise<ProjectUI[]> {
  const projects = await prisma.project.findMany({
    where: {
      published: true,
    },
    orderBy: [
      { isFlagship: "desc" },
      { featured: "desc" },
      { createdAt: "desc" },
    ],
    select: {
      id: true,
      name: true,
      role: true,
      summary: true,
      keyFeatures: true,
      techStack: true,
      isFlagship: true,
      featured: true,
      published: true,
      liveUrl: true,
      repoUrl: true,
    },
  });

  return projects;
}
