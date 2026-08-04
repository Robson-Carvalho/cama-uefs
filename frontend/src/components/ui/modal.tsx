import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  title: string;
  description?: string | ReactNode;
  trigger?: ReactNode;
  children?: ReactNode;

  // Estado e Controle
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Footer e Ações
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  confirmVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  disableConfirm?: boolean;
  hideCancel?: boolean;

  // Formulário
  onSubmit?: (e: React.FormEvent) => void;
}

const Modal = ({
  title,
  description,
  trigger,
  children,
  isOpen,
  onOpenChange,
  showFooter = true,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  confirmVariant = "default",
  disableConfirm = false,
  hideCancel = false,
  onSubmit,
}: ModalProps) => {
  const content = (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription asChild={typeof description !== "string"}>{typeof description === "string" ? description : <div>{description}</div>}</DialogDescription>}
      </DialogHeader>

      {children && (
        <div className={onSubmit ? "py-4 flex flex-col gap-6" : ""}>
          {children}
        </div>
      )}

      {showFooter && (
        <DialogFooter className="mt-4">
          {!hideCancel && (
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                {cancelText}
              </Button>
            </DialogClose>
          )}

          {onSubmit ? (
            <Button
              type="submit"
              variant={confirmVariant}
              className="w-full sm:w-auto"
              disabled={disableConfirm}
            >
              {confirmText}
            </Button>
          ) : (
            <DialogClose asChild>
              <Button
                type="button"
                variant={confirmVariant}
                className="w-full sm:w-auto"
                onClick={onConfirm}
                disabled={disableConfirm}
              >
                {confirmText}
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      )}
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        {onSubmit ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {content}
          </form>
        ) : (
          <div className="flex flex-col gap-4">{content}</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { Modal };
