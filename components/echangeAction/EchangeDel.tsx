"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { deleteOrderEchange } from "@/lib/actions/patient.actions";

const EchangeDel = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeleteDoctor = async (echangeId: string) => {
    try {
      setIsDeleting(true);
      const orderDeleted = await deleteOrderEchange(echangeId);
      if (orderDeleted) {
        toast.success(
          `L'echange avec le code d'echange ${orderDeleted.codeToExchange} à été supprimé avec succès`,
          {
            style: {
              color: "#22c55e",
              background: "#0D0F10",
              border: "1px solid #363A3D",
            },
          }
        );
        setOpen(false);
      }
    } catch (error: any) {
      console.error(error.message);
      setIsDeleting(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <button
          className="flex items-center justify-center p-0.5 border rounded border-red-300 text-red-400 transition-all hover:text-red-700"
          onClick={() => setOpen(true)}
        >
          <Trash size={18} />
        </button>

        <AlertDialogContent className="bg-dark-200 border-dark-300 w-full">
          <AlertDialogHeader>
            <AlertDialogTitle className="max-sm:text-base">
              Êtes-vous absolument sûr ?
            </AlertDialogTitle>
            <AlertDialogDescription className="max-sm:text-sm">
              Cette action est irréversible. Cela supprimera définitivement cet
              échange.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-4">
            <button
              className="text-sm text-red-500 font-extrabold transition-all hover:opacity-80"
              onClick={() => setOpen(false)}
            >
              Annuler
            </button>
            <button
              className="text-sm text-green-500 font-extrabold transition-all hover:opacity-80"
              onClick={() => handleDeleteDoctor(id)}
            >
              {isDeleting ? "En suppression..." : "Confirmer"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EchangeDel;
