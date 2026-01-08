"use client";

import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createProject } from "@/actions/projectActions";
import {
  createProjectSchema,
  createProjectSchemaType,
} from "@/lib/zodValidation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { deleteFileAction } from "@/actions/aboutActions";

export default function CreateProjectForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [uploading, setUploading] = useState(false);

  const [deletingKeys, setDeletingKeys] = useState<Set<string>>(new Set());

  const form = useForm<createProjectSchemaType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      role: "Full-Stack Developer",
      summary: "",

      techStack: [],
      keyFeatures: "",

      images: [],

      liveUrl: "",
      repoUrl: "",
      isFlagship: false,
      featured: false,
      published: false,
    },
  });

  const { control, handleSubmit, setValue, getValues } = form;

  const {
    fields: techFields,
    append: addTech,
    remove: removeTech,
  } = useFieldArray({
    control: control,
    name: "techStack",
  });

  const {
    fields: imageFields,
    append: addImage,
    remove: removeImage,
    update: updateImage,
  } = useFieldArray({
    control: control,
    name: "images",
  });

  const onSubmit = (values: createProjectSchemaType) => {
    startTransition(async () => {
      const res = await createProject(values);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Project created successfully");
      router.push("/dashboard/projects");
    });
  };

  // const deleteImage = async (key: string,index:number) => {
  //   if (deletingKeys.has(key)) return;

  //   setDeletingKeys((prev) => new Set(prev).add(key));

  //   try {
  //     await deleteFileAction(key);

  //     setValue(
  //       "images",
  //       getValues("images").filter((img) => img.key !== key),
  //       { shouldValidate: true }
  //     );

  //     toast.success("Image deleted");
  //   } catch {
  //     toast.error("Failed to delete image");
  //   } finally {
  //     setDeletingKeys((prev) => {
  //       const next = new Set(prev);
  //       next.delete(key);
  //       return next;
  //     });
  //   }
  // };

  const deleteImage = async (index: number) => {
    const images = getValues("images");
    const image = images[index];

    if (!image || deletingKeys.has(image.key)) return;

    setDeletingKeys((prev) => new Set(prev).add(image.key));

    try {
      // 1️⃣ delete from UploadThing
      await deleteFileAction(image.key);

      // 2️⃣ remove from form
      const remaining = images.filter((_, i) => i !== index);

      // 3️⃣ ensure at least one cover image
      if (!remaining.some((img) => img.isCover) && remaining.length > 0) {
        remaining[0].isCover = true;
      }

      // 4️⃣ reindex order
      const normalized = remaining.map((img, i) => ({
        ...img,
        order: i,
      }));

      setValue("images", normalized, { shouldValidate: true });

      toast.success("Image deleted");
    } catch (err) {
      toast.error("Failed to delete image");
    } finally {
      setDeletingKeys((prev) => {
        const next = new Set(prev);
        next.delete(image.key);
        return next;
      });
    }
  };

  const watchedImages = form.watch("images");

  return (
    <main className="space-y-12 max-w-xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 shadow rounded p-6"
        >
          <h1 className="font-medium text-lg">Add Your Project</h1>
          {/* PROJECT NAME */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Role</FormLabel>
                <FormControl>
                  <Input placeholder="Full-Stack Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Summary</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="keyFeatures"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Features (one per line)</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder={`Modern dashboard UI
Role-based access
Permission-based access
`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TECH STACK */}
          <FormItem>
            <FormLabel>Tech Stack</FormLabel>

            <div className="space-y-3">
              {techFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-2 gap-4 items-center"
                >
                  <FormField
                    control={control}
                    name={`techStack.${index}.key`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Label</FormLabel>
                        <Input {...field} placeholder="e.g. frontend" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`techStack.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Value</FormLabel>
                        <Input {...field} placeholder="e.g. Next.js" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeTech(index)}
                  >
                    <Minus className="mr-2 h-4 w-4" /> Remove
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="secondary"
                onClick={() => addTech({ key: "", value: "" })}
              >
                <Plus className="mr-2 h-4 w-4" /> Add technology
              </Button>
            </div>

            <FormMessage />
          </FormItem>

          {/* PROJECT IMAGES */}
          <FormItem>
            <FormLabel>Project Images (max 5)</FormLabel>

            <div className="space-y-4">
              {/* UPLOAD */}
              {imageFields.length < 5 ? (
                <UploadButton
                  endpoint="projectImage"
                  onClientUploadComplete={(res) => {
                    const existing = getValues("images") ?? [];

                    if (existing.length + res.length > 5) {
                      toast.error("You can upload a maximum of 5 images");
                      return;
                    }

                    const uploaded = res.map((f, idx) => ({
                      url: f.url,
                      key: f.key,
                      alt: "",
                      order: existing.length + idx,
                      isCover: existing.length === 0 && idx === 0,
                    }));

                    setValue("images", [...existing, ...uploaded], {
                      shouldValidate: true,
                    });

                    toast.success("Images uploaded");
                  }}
                  className="ut-button:bg-[var(--brand-blue)] ut-button:px-8 ut-button:text-white ut-button:rounded-lg"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Maximum of 5 images reached
                </p>
              )}

              {/* IMAGE LIST */}
              {imageFields.map((img, index) => (
                <div
                  key={img.id}
                  className="flex gap-4 items-start border rounded-lg p-3"
                >
                  {/* PREVIEW */}

                  {watchedImages?.map((img) => {
                    return (
                      <div
                        key={img.key}
                        className="relative w-40 h-40 rounded-lg overflow-hidden border"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt || "Project image"}
                          width={120}
                          height={80}
                          className="rounded object-cover transition"
                        />
                        ;
                      </div>
                    );
                  })}

                  {/* META */}
                  <div className="flex-1 space-y-2">
                    <FormField
                      control={control}
                      name={`images.${index}.alt`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Alt text</FormLabel>
                          <Input {...field} placeholder="image description" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`images.${index}.isCover`}
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2 space-y-0">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              // ensure only ONE cover image
                              imageFields.forEach((_, i) => {
                                updateImage(i, {
                                  ...imageFields[i],
                                  isCover:
                                    i === index ? Boolean(checked) : false,
                                });
                              });
                            }}
                          />
                          <FormLabel className="text-sm">Cover image</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* REMOVE */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    disabled={deletingKeys.has(img.key)}
                    onClick={() => deleteImage(index)}
                  >
                    {deletingKeys.has(img.key) ? "Deleting…" : "Remove"}
                  </Button>
                </div>
              ))}
            </div>

            <FormMessage />
          </FormItem>

          {/* LIVE URL */}
          <FormField
            control={control}
            name="liveUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://…" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* REPO URL */}
          <FormField
            control={control}
            name="repoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repository URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/…" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="isFlagship"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Flagship Project</FormLabel>
              </FormItem>
            )}
          />

          {/* FEATURED */}
          <FormField
            control={control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Featured project</FormLabel>
              </FormItem>
            )}
          />

          {/* PUBLISHED */}
          <FormField
            control={control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Publish immediately</FormLabel>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
