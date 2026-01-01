"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { aboutSchema, AboutSchemaType } from "@/lib/zodValidation";
import { deleteFileAction, saveAbout } from "@/actions/aboutActions";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus, Trash } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

export default function CreateAboutForm() {
  const [isPending, startTransition] = useTransition();

  const [deletingKeys, setDeletingKeys] = useState<Set<string>>(new Set());

  const [uploading, setUploading] = useState(false);

  const form = useForm<AboutSchemaType>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      fullName: "",
      headline: "",
      subHeadline: "",
      shortBio: "",

      bioBlocks: [],
      experience: [],

      profileImage: undefined,
      heroImage: undefined,
      resume: undefined,

      location: "",
      email: "",
      phone: "",

      skills: [],
    },
  });

  const {
    fields: skillFields,
    append: addSkill,
    remove: removeSkill,
  } = useFieldArray<AboutSchemaType, "skills">({
    control: form.control,
    name: "skills",
  });

  const { control, handleSubmit, setValue, getValues } = form;

  const onSubmit = (values: AboutSchemaType) => {
    startTransition(async () => {
      const res = await saveAbout(values);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("About saved successfully");
    });
  };

  const deleteSingleFile = async (
    field: "profileImage" | "heroImage" | "resume"
  ) => {
    const file = getValues(field);
    if (!file) return;

    if (deletingKeys.has(file.key)) return;

    setDeletingKeys((prev) => new Set(prev).add(file.key));

    try {
      await deleteFileAction(file.key);
      setValue(field, undefined);
      toast.success("File deleted");
    } catch {
      toast.error("Failed to delete file");
    } finally {
      setDeletingKeys((prev) => {
        const next = new Set(prev);
        next.delete(file.key);
        return next;
      });
    }
  };

  const watchedProfileImage = form.watch("profileImage");
  const watchedHeroImage = form.watch("heroImage");
  const watchedResume = form.watch("resume");

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-xl">
        {/* NAME */}
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* HEADLINE */}
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headline (Hero)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Full-Stack Developer" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* subHEADLINE */}
        <FormField
          control={control}
          name="subHeadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SubHeadline</FormLabel>
              <FormControl>
                <Input {...field} placeholder="I'm a full-stack web dev..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SHORT BIO */}
        <FormField
          control={control}
          name="shortBio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio (Hero)</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="I design and build scalable apps..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BIO block */}

        {/* profile image */}
        <section>
          <h2 className="font-semibold text-xl">Profile Image</h2>
          <UploadButton
            endpoint="profileImage"
            onClientUploadComplete={(res) => {
              const file = res[0];
              setValue("profileImage", { url: file.url, key: file.key });
              toast.success("Profile image uploaded");
            }}
          />

          {watchedProfileImage && (
            <div className="relative w-32 h-32">
              <Image
                src={watchedProfileImage.url}
                alt="Profile image"
                fill
                className="rounded-full object-cover"
              />

              <button
                type="button"
                onClick={() => deleteSingleFile("profileImage")}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        {/* hero image */}
        <section>
          <h2 className="font-semibold text-xl">Hero Image</h2>

          <UploadButton
            endpoint="heroImage"
            onClientUploadComplete={(res) => {
              const file = res[0];
              setValue("heroImage", { url: file.url, key: file.key });
              toast.success("Hero image uploaded");
            }}
          />

          {watchedHeroImage && (
            <div className="relative w-40 h-40">
              <Image
                src={watchedHeroImage.url}
                alt="Hero image"
                fill
                className="object-cover rounded-lg"
              />

              <button
                type="button"
                onClick={() => deleteSingleFile("heroImage")}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        {/* resume */}
        <section>
          <h2 className="font-semibold text-xl">Resume</h2>

          <UploadButton
            endpoint="resume"
            onClientUploadComplete={(res) => {
              const file = res[0];
              setValue("resume", { url: file.url, key: file.key });
              toast.success("Resume uploaded");
            }}
          />

          {watchedResume && (
            <div className="flex items-center gap-3">
              <a
                href={watchedResume.url}
                target="_blank"
                className="text-sm text-blue-600 underline"
              >
                View resume
              </a>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => deleteSingleFile("resume")}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          )}
        </section>

        {/* LOCATION + CONTACT */}
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} placeholder="City, Country" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="you@email.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="+1 555-555-5555" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* experience */}

        {/* SKILLS */}
        <FormItem>
          <FormLabel>Skills</FormLabel>
          <div className="space-y-3">
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...form.register(`skills.${index}.name`)}
                  placeholder="Value (e.g. Next.js)"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeSkill(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => addSkill({ name: "" })}
            >
              <Plus className="h-4 w-4" /> Add Skill
            </Button>
          </div>
        </FormItem>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Create About"}
        </Button>
      </form>
    </Form>
  );
}
