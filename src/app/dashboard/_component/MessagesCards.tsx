"use client";

import { Button } from "@/components/ui/button";
import { markMessageRead, deleteMessage } from "@/actions/messageActions";
import { MailOpen, Trash, Reply, Clock } from "lucide-react";
import { MessageUI } from "@/lib/types";

type Props = {
  messages: MessageUI[];
};

export default function MessagesCard({ messages }: Props) {
  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`rounded-xl border p-4 space-y-3 ${
            !msg.read ? "bg-blue-500/5 border-blue-500/20" : ""
          }`}
        >
          {/* HEADER */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium">{msg.name}</p>
              <p className="text-xs text-muted-foreground">{msg.email}</p>
            </div>

            {!msg.read && (
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs text-blue-600">
                New
              </span>
            )}
          </div>

          {/* MESSAGE */}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {msg.message}
          </p>

          {/* FOOTER */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {new Date(msg.createdAt).toLocaleDateString()}
            </div>

            <div className="flex gap-2">
              {!msg.read && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => markMessageRead(msg.id)}
                >
                  <MailOpen className="h-4 w-4" />
                </Button>
              )}

              <Button size="icon" variant="outline" asChild>
                <a
                  href={`mailto:${msg.email}?subject=Re: Your inquiry&body=Hi ${msg.name},`}
                >
                  <Reply className="h-4 w-4" />
                </a>
              </Button>

              <Button
                size="icon"
                variant="destructive"
                onClick={() => deleteMessage(msg.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {messages.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          No messages yet
        </p>
      )}
    </div>
  );
}
