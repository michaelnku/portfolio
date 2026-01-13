import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { email } from "zod";
import { ProfileImage } from "@/lib/types";

export async function getUserProfile() {
  const user = await CurrentUser();
  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      role: true,
      profileAvatar: true,
      image: true,
    },
  });

  if (!dbUser) return null;

  return {
    id: dbUser.id,
    email: dbUser.email,
    name: dbUser.name,
    username: dbUser.username,
    role: dbUser.role,
    profileAvatar: dbUser.profileAvatar as ProfileImage | undefined,
    image: dbUser.image,
  };
}
