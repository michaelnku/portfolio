"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";

import { sendContactMessage } from "@/actions/contactMessageActions";

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
import { Loader2 } from "lucide-react";
import {
  ContactMessageSchemaType,
  contactMessageSchema,
} from "@/lib/zodValidation";

type Props = {
  onSuccess?: () => void;
};

export default function HireMeForm({ onSuccess }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactMessageSchemaType>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (values: ContactMessageSchemaType) => {
    startTransition(async () => {
      const res = await sendContactMessage(values);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Message sent successfully");
      form.reset();
      onSuccess?.();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Jane Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="jane@company.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="subject"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject (optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Frontend Engineer role" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="message"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="Tell me about the role, company, or project…"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
}
