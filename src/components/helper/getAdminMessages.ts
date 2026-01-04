import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";

export async function getAdminMessages() {
  const user = await CurrentUser();
  if (!user || user.role !== "ADMIN") return [];

  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}
