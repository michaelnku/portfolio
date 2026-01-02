"use server";

import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";
import { AboutSchemaType, aboutSchema } from "@/lib/zodValidation";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

//to delete images on preview before creating product
export const deleteFileAction = async (keyToDelete: string) => {
  const user = await CurrentUser();
  if (!user) return { error: "Unauthorized access" };

  try {
    await utapi.deleteFiles([keyToDelete]);
    return { success: true };
  } catch (error) {}
};

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
    longBio,

    experience,
    skills,

    email,
    phone,
    location,

    profileImage,
    heroImage,
    resume,
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

      longBio,
      experience,
      skills,

      profileImage,
      heroImage,
      resume,
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

      longBio,
      experience,
      skills,

      profileImage,
      heroImage,
      resume,
      location,
      email,
      phone,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/about");

  return { success: true };
}

export async function deleteAbout() {
  const user = await CurrentUser();

  if (!user || user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const about = await prisma.about.findUnique({
    where: { createdById: user.id },
  });

  if (!about) {
    return { error: "About not found" };
  }

  await prisma.about.delete({
    where: { id: about.id },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/about");

  return { success: true };
}
