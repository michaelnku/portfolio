"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { deleteUserAccount } from "@/actions/deleteAccountActions";

type Props = {
  userId: string;
};

const DeleteAcountModal = ({ userId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  const [confirmText, setConfirmText] = useState("");

  const handleDeleteAccount = async () => {
    startTransition(async () => {
      const res = await deleteUserAccount(userId);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Account deleted");
    });
  };

  return (
    <div>
      {" "}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col">
              <span>
                This action is <strong>permanent</strong> and cannot be undone.
              </span>
              <span>
                Your store, products, and storefront visibility will be removed.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-2">
            <Label>Type "DELETE MY PROJECT" to confirm</Label>

            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>

          {/* 🔥 Action feedback */}
          {deletingAccount && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Deleting your account...
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingAccount}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDeleteAccount();
              }}
              disabled={deletingAccount || confirmText !== "DELETE MY ACCOUNT"}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deletingAccount ? "Deleting…" : "Yes, delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAcountModal;
