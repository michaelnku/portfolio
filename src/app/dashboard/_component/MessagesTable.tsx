"use client";

import { Button } from "@/components/ui/button";
import { markMessageRead, deleteMessage } from "@/actions/messageActions";
import { MailOpen, Trash, Reply } from "lucide-react";
import { MessageUI } from "@/lib/types";

type Props = {
  messages: MessageUI[];
};

export default function MessagesTable({ messages }: Props) {
  return (
    <div className="rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">From</th>
            <th className="p-3 text-left">Message</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id} className={!msg.read ? "bg-blue-500/5" : ""}>
              <td className="p-3">
                <p className="font-medium">{msg.name}</p>
                <p className="text-xs text-muted-foreground">{msg.email}</p>
              </td>

              <td className="p-3 max-w-md truncate">{msg.message}</td>

              <td className="p-3 text-muted-foreground">
                {new Date(msg.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3 flex justify-end gap-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
