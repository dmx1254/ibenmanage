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
import { Label } from "@/components/ui/label";
import { GamepadIcon, Loader } from "lucide-react";
import { toast } from "sonner";

import { changeVenteStatus } from "@/lib/actions/appointment.actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const UpdateVenteStatus = ({
  status,
  venteId,
  orderId,
}: {
  status: string;
  venteId: string;
  orderId: string;
}) => {
  const [newStatus, setNewStatus] = useState<string>(status);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleUpdateVenteStatus = async () => {
    try {
      setIsLoading(true);
      const response = await changeVenteStatus(newStatus, venteId);
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
        <button className="text-sm text-white/90 px-2 transition-transform hover:opacity-80">
          Changer le status
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[410px] bg-dark-300 border-dark-500">
        <DialogHeader>
          <DialogTitle className="text-white text-base rounded">
            <div className="flex items-center space-x-3">
              <GamepadIcon className="text-orange-400" size={24} />
              <DialogTitle className="text-lg font-bold text-white">
                Numero de commande #{orderId}
              </DialogTitle>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-gray-300">
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="rate" className="text-right">
              Nouveau status
            </Label>
            <Select
              name="status"
              value={newStatus}
              onValueChange={(value) => setNewStatus(value)}
            >
              <SelectTrigger className="w-full px-4 py-5 border-dark-500 rounded-md shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder="Sélectionnez votre quartier" />
              </SelectTrigger>
              <SelectContent className="bg-dark-400 text-gray-300 border-dark-500">
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="processing">En cours</SelectItem>
                <SelectItem value="paid">Payée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleUpdateVenteStatus}
            className="bg-dark-400 text-green-500 hover:opacity-90 transition-all"
            disabled={!newStatus || isLoading}
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

export default UpdateVenteStatus;
