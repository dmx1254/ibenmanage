"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateEchangeRate } from "@/lib/actions/appointment.actions";
import { FilePenLine, Loader } from "lucide-react";
import { toast } from "sonner";

const UpdateChangeRate = ({
  rate,
  rateId,
}: {
  rate: number;
  rateId: string;
}) => {
  const [rateG, setRateG] = useState<number | string>(rate);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleUpdateRate = async () => {
    try {
      setIsLoading(true);
      const response = await updateEchangeRate(Number(rateG), rateId);
      if (response) {
        toast.success(response.message, {
          style: {
            color: "#22c55e",
            background: "#0D0F10",
            border: "1px solid #363A3D",
          },
        });
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center p-0.5 border rounded border-orange-300 text-orange-400 transition-all hover:text-orange-500">
          <FilePenLine size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px] bg-dark-300 border-dark-500">
        <DialogHeader>
          <DialogTitle className="text-white text-sm rounded">
            Taux d'echange actuel{" "}
            <span className="bg-dark-400 text-green-500 text-sm p-1 ml-2 rounded">
              {rate || 0}%
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="rate" className="text-right">
              Taux
            </Label>
            <Input
              id="rate"
              type="number"
              value={rateG}
              className="bg-transparent border-dark-500"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRateG(e.target.value)
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleUpdateRate}
            className="bg-dark-400 text-green-500 hover:opacity-90 transition-all"
            disabled={!rateG || Number(rateG) < 1 || isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin text-white" />
            ) : (
              "Enregistrer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateChangeRate;
