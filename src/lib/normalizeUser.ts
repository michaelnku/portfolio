import { prisma } from "@/lib/prisma";
import { ProfileImage, SessionUser, UserDTO } from "@/lib/types";

export async function normalizeUser(
  sessionUser: SessionUser | undefined | null
): Promise<UserDTO | null> {
  if (!sessionUser?.email) return null;

  const db = await prisma.user.findUnique({
    where: { email: sessionUser.email },
  });

  if (!db) return null;

  return {
    id: db.id,
    email: db.email,
    role: db.role,
    name: db.name ?? "",
    username: db.username ?? "",
    profileAvatar: db.profileAvatar as ProfileImage | undefined,
    image: db.image ?? null,
  };
}
