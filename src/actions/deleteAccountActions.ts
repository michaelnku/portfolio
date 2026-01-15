"use server";

import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import { signOut } from "@/auth/auth";

const utapi = new UTApi();

export async function deleteUserAccount(userId: string) {
  const user = await CurrentUser();
  if (!user) return { error: "Unauthorized" };

  try {
    const keysToDelete: string[] = [];

    // Profile avatar
    if (user.profileAvatar?.key) {
      keysToDelete.push(user.profileAvatar.key);
    }

    // About images
    const about = await prisma.about.findUnique({
      where: { createdById: user.id },
    });

    // if (about?.profileImage?.key) keysToDelete.push(about.profileImage.key);
    // if (about?.heroImage?.key) keysToDelete.push(about.heroImage.key);
    // if (about?.resume?.key) keysToDelete.push(about.resume.key);

    // Project images
    const projectImages = await prisma.projectImage.findMany({
      where: {
        project: {
          createdById: user.id,
        },
      },
      select: { key: true },
    });

    projectImages.forEach((img) => {
      if (img.key) keysToDelete.push(img.key);
    });

    if (keysToDelete.length > 0) {
      await utapi.deleteFiles(keysToDelete);
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    await signOut({ redirect: false });

    revalidatePath("/");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Delete account error:", error);
    return { error: "Failed to delete account" };
  }
}
