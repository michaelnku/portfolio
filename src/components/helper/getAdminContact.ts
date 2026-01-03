import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { ContactUI } from "@/lib/types";

export async function getAdminContact(): Promise<ContactUI | null> {
  const user = await CurrentUser();

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  const contact = await prisma.contact.findUnique({
    where: {
      createdById: user.id,
    },
  });

  if (!contact) return null;

  return {
    id: contact.id,

    email: contact.email,
    phone: contact.phone,
    location: contact.location,

    github: contact.github,
    linkedin: contact.linkedin,
    twitter: contact.twitter,
    website: contact.website,

    openToRelocation: contact.openToRelocation,
    availableForWork: contact.availableForWork,

    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
  };
}
