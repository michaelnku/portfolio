import { prisma } from "@/lib/prisma";

export async function getAdminAnalytics() {
  return prisma.portfolioAnalytics.findMany({
    orderBy: { date: "asc" },
  });
}
