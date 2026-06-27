"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ConfirmDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
  onConfirm: () => void;
}

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<span />}>
        {trigger}
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${
              variant === "danger"
                ? "bg-rose-50 text-rose-500 dark:bg-rose-950/30"
                : variant === "warning"
                ? "bg-amber-50 text-amber-500 dark:bg-amber-950/30"
                : "bg-sky-50 text-sky-500 dark:bg-sky-950/30"
            }`}
          >
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1.5">
              {description}
            </DialogDescription>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <DialogClose
            render={
              <Button variant="outline" className="rounded-xl">
                {cancelLabel}
              </Button>
            }
          />
          <Button
            onClick={handleConfirm}
            className={`rounded-xl ${
              variant === "danger"
                ? "bg-rose-500 hover:bg-rose-600 text-white"
                : variant === "warning"
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "gradient-sky text-white"
            }`}
          >
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
