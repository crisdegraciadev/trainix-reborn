import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { cn } from "@lib/utils";
import { PlusCircle } from "lucide-react";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type _ = {
  title: string;
  label?: string;
  description: string;
  disabled?: boolean;
  disabledMessage?: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  dialogClassNames?: string;
};

export default function CreateButton({
  children,
  title,
  label,
  description,
  disabled,
  disabledMessage,
  isDialogOpen,
  setIsDialogOpen,
  dialogClassNames,
}: PropsWithChildren & _) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {disabled ? (
          <Tooltip>
            <TooltipTrigger>
              <Button
                disabled={disabled}
                variant="outline"
                className="items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs h-8 flex"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                {label ?? "Create"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{disabledMessage ?? "Disabled button"}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            variant="outline"
            className="items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs ml-auto h-8 flex"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            {label ?? "Create"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={cn("max-w-xl flex flex-col gap-0", dialogClassNames)}>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
