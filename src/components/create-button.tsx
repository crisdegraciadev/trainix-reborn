"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

type Props = {
  title: string;
  label?: string;
  description: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function CreateButton({
  children,
  title,
  label,
  description,
  isDialogOpen,
  setIsDialogOpen,
}: PropsWithChildren & Props) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs ml-auto h-8 flex"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          {label ?? "Create"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md flex flex-col gap-0">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
