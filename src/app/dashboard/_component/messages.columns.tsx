"use client";

import { markMessageRead, deleteMessage } from "@/actions/messageActions";
import { Button } from "@/components/ui/button";
import { MessageUI } from "@/lib/types";
import { Checkbox } from "@radix-ui/react-checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import { MailOpen, Reply, Trash } from "lucide-react";

export const messageColumns: ColumnDef<MessageUI>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: "From",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },

  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <p className="max-w-[320px] truncate text-muted-foreground">
        {row.original.message}
      </p>
    ),
  },

  {
    accessorKey: "formattedDate",
    header: "Date",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const msg = row.original;

      return (
        <div className="flex justify-end gap-2">
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
      );
    },
  },
];
