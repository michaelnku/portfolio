"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDTO } from "@/lib/types";
import { updateUserProfile } from "@/actions/user";
import { userSchema, UserSchemaType } from "@/lib/zodValidation";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { deleteFileAction } from "@/actions/aboutActions";
import { Camera, Loader2, Trash } from "lucide-react";

type Props = {
  user: UserDTO;
};

export default function ProfileForm({ user }: Props) {
  const [isPending, startTransition] = useTransition();

  const [deletingKeys, setDeletingKeys] = useState<Set<string>>(new Set());

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name ?? "",
      username: user.username ?? "",
      profileImage: user.profileImage ?? "",
    },
  });

  const { control, handleSubmit, setValue, getValues, reset } = form;

  const onSubmit = (values: UserSchemaType) => {
    startTransition(async () => {
      const res = await updateUserProfile(values);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Profile updated");
    });
  };

  const deleteSingleFile = async (field: "profileImage") => {
    const file = getValues(field);
    if (!file) return;

    if (deletingKeys.has(file)) return;

    setDeletingKeys((prev) => new Set(prev).add(file));

    try {
      await deleteFileAction(file);
      setValue(field, undefined);
      toast.success("File deleted");
    } catch {
      toast.error("Failed to delete file");
    } finally {
      setDeletingKeys((prev) => {
        const next = new Set(prev);
        next.delete(file);
        return next;
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* profile image */}
            <section className="border-t">
              <div className="flex flex-col items-center gap-4">
                {user?.profileImage || user?.image ? (
                  <div className="mt-4 relative w-32 h-32">
                    <Image
                      src={user?.image || user?.profileImage || "avatar"}
                      alt="Profile image"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  "No profile image uploaded yet."
                )}

                {/*dropdown trigger*/}
                <Button asChild>
                  <button type="button">Edit</button>
                </Button>
              </div>

              {/*dropdown menu*/}
              <div className="relative w-32 h-32 space-y-6">
                <p>Profile Photo</p>
                <div className="space-y-4">
                  <button className="inline-flex gap-3 items-center">
                    <Camera className=" bg-white rounded-full p-1 h-8 w-8 hover:shadow-md" />
                    <p>Gallery</p>{" "}
                    {/*uploading happens inside here  
                       <UploadButton
                endpoint="profileImage"
                className="
                ut-button:bg-blue-500/10
                ut-button:text-blue-600
                ut-button:border
                ut-button:border-blue-500/30
                ut-button:rounded-full
                ut-button:px-5
                ut-button:py-2
                ut-button:text-sm
                hover:ut-button:bg-blue-500/20
              "
                onClientUploadComplete={(res) => {
                  const file = res[0];
                  setValue("profileImage", { url: file.url, key: file.key });
                  toast.success("Profile image uploaded");
                }}
              />
                    */}
                  </button>
                  <button className="inline-flex gap-3 items-center">
                    <Trash className=" bg-white rounded-full p-1 h-8 w-8 hover:shadow-md" />
                    <p>Remove</p>
                  </button>
                </div>
              </div>
            </section>
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-sm text-muted-foreground">
              Email: <span className="font-medium">{user.email}</span>
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
