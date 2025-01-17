"use client";

import React, { ChangeEvent, useState } from "react";
import { FilePenLine } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Currency } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { updateNewVenteCur } from "@/lib/actions/patient.actions";
import { Button } from "./ui/button";

const CurrencyDialogVenteUpdate = ({
  cur,
  keyType,
}: {
  cur: Currency[];
  keyType: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [curUpdate, setCurUpdate] = useState<number | string>(
    Number(cur[0][keyType])
  );

  // console.log(cur);

  const handleUpdateCurrency = async () => {
    try {
      setIsUpdating(true);
      const response = await updateNewVenteCur(
        cur[0]._id,
        keyType,
        Number(curUpdate)
      );
      if (response) {
        toast.success(response.message, {
          style: {
            background: "#1A1D21",
            color: "#22c55e",
            border: "1px solid #363A3D",
          },
        });
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <button
          className="inline-flex items-center justify-center p-0.5 border rounded border-orange-300 text-orange-400 transition-all hover:text-orange-500"
          onClick={() => setOpen(true)}
        >
          <FilePenLine size={18} />
        </button>

        <AlertDialogContent className="bg-dark-200 border-dark-300 w-full">
          <AlertDialogHeader>
            <AlertDialogTitle className="max-sm:text-base">
              Mettre à jour la devise {keyType}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="grid grid-cols-1">
            <Label className="capitalize mb-3">{keyType}</Label>
            <Input
              type="number"
              value={curUpdate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCurUpdate(e.target.value)
              }
              className="bg-transparent border-dark-500"
            />
          </div>

          <AlertDialogFooter className="flex gap-4">
            <Button
              className="text-sm text-red-500 font-extrabold transition-all hover:opacity-80"
              onClick={() => setOpen(false)}
            >
              Fermer
            </Button>
            <Button
              className="text-sm text-green-500 font-extrabold transition-all hover:opacity-80"
              onClick={handleUpdateCurrency}
            >
              {isUpdating ? "Updating..." : "Mettre à jour"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CurrencyDialogVenteUpdate;
