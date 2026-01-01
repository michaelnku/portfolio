"use server";

import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";
import { AboutSchemaType, aboutSchema } from "@/lib/zodValidation";

export async function saveAbout(values: AboutSchemaType) {
  const user = await CurrentUser();
  if (!user || user.role !== "ADMIN") return { error: "Unauthorized" };

  const parsed = aboutSchema.safeParse(values);
  if (!parsed.success) return { error: "Invalid About data" };

  const {
    fullName,
    headline,
    subHeadline,
    shortBio,

    bioBlocks,
    experience,
    skills,

    email,
    phone,
    location,

    profileImage,
    heroImage,
  } = parsed.data;

  await prisma.about.upsert({
    where: {
      createdById: user.id,
    },
    create: {
      fullName,
      headline,
      subHeadline,
      shortBio,

      bioBlocks,
      experience,
      skills,

      profileImage,
      heroImage,
      location,
      email,
      phone,

      createdById: user.id,
    },
    update: {
      fullName,
      headline,
      subHeadline,
      shortBio,

      bioBlocks,
      experience,
      skills,

      profileImage,
      heroImage,
      location,
      email,
      phone,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/about");

  return { success: true };
}
