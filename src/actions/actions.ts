"use server";

import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { revalidatePath } from "next/cache";
import {
  createProjectSchema,
  createProjectSchemaType,
} from "@/lib/zodValidation";

export async function createProject(values: createProjectSchemaType) {
  const user = await CurrentUser();

  if (!user || user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const parsed = createProjectSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid project data" };
  }

  await prisma.project.create({
    data: {
      ...parsed.data,
      createdById: user.id,
    },
  });

  revalidatePath("/dashboard/projects");

  return { success: true };
}
