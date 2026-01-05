"use server";

import { prisma } from "@/lib/prisma";
import {
  ContactMessageSchemaType,
  contactMessageSchema,
} from "@/lib/zodValidation";

function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function sendContactMessage(values: ContactMessageSchemaType) {
  const parsed = contactMessageSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid form submission",
    };
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
        source: "PORTFOLIO",
      },
    });

    const date = today();

    await prisma.portfolioAnalytics.upsert({
      where: { date },
      update: {
        contactSubmits: { increment: 1 },
      },
      create: {
        date,
        contactSubmits: 1,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Contact message error:", error);

    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
