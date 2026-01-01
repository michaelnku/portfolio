import { prisma } from "@/lib/prisma";
import { AboutUI } from "@/lib/types";

export async function getPublicAbout(): Promise<AboutUI | null> {
  const about = await prisma.about.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!about) return null;

  return {
    fullName: about.fullName,
    headline: about.headline,
    subHeadline: about.subHeadline,
    shortBio: about.shortBio,

    bioBlocks: about.bioBlocks as AboutUI["bioBlocks"],
    experience: about.experience as AboutUI["experience"],
    skills: about.skills as AboutUI["skills"],

    profileImage: about.profileImage,
    heroImage: about.heroImage,
    location: about.location,
    email: about.email,
    phone: about.phone,
  };
}
