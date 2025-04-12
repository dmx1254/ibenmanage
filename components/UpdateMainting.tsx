"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FilePenLine, Loader } from "lucide-react";
import { toast } from "sonner";
import { updateMaintingStatus } from "@/lib/actions/appointment.actions";

const UpdateMainting = ({
  mainting,
  maintingId,
}: {
  mainting: boolean;
  maintingId: string;
}) => {
  const [maintingG, setMaintingG] = useState<boolean>(mainting);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleUpdateRate = async () => {
    try {
      setIsLoading(true);
      const response = await updateMaintingStatus(maintingG, maintingId);
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
          <DialogTitle
            className={`text-white ${mainting ? "text-red-500" : "text-green-500"} text-sm rounded`}
          >
            {mainting ? "Site en maintenance" : "Site en ligne"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="rate" className="text-right text-gray-300">
              Status
            </Label>
            <select
              value={maintingG ? "true" : "false"}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setMaintingG(e.target.value === "true" ? true : false)
              }
              className="w-full bg-dark-400 border text-sm border-dark-500 rounded-md p-2 text-gray-300"
            >
              <option value="">Mettre à jour le status</option>
              <option value="false">En ligne</option>
              <option value="true">En maintenance</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleUpdateRate}
            className="bg-dark-400 text-green-500 hover:opacity-90 transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin text-white" />
            ) : (
              "Mettre à jour"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMainting;
