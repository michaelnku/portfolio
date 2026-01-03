import { prisma } from "@/lib/prisma";
import { ContactUI } from "@/lib/types";

export async function getPublicContact(): Promise<ContactUI | null> {
  return prisma.contact.findFirst({
    orderBy: { createdAt: "desc" },
  });
}
