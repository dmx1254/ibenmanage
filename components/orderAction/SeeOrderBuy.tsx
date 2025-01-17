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
import {
  CalendarClockIcon,
  Clock,
  Contact,
  CreditCardIcon,
  Eye,
  GamepadIcon,
  HandCoins,
  ServerIcon,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import { deleteOrderBuy } from "@/lib/actions/patient.actions";
import { Orderbuy } from "@/lib/types/types";
import { formatDateTime, parsedDevise } from "@/lib/utils";
import StatusBadge from "../StatusBadge";

const SeeOrderBuy = ({ data }: { data: Orderbuy }) => {
  const [open, setOpen] = useState<boolean>(false);
  console.log(data);

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <button
          className="flex items-center justify-center p-0.5 border rounded border-orange-300 text-orange-400 transition-all hover:text-orange-700"
          onClick={() => setOpen(true)}
        >
          <Eye size={18} />
        </button>

        <AlertDialogContent className="bg-dark-200 border-dark-300 w-full text-white p-4">
          <AlertDialogHeader>
            <div className="flex items-center space-x-3">
              <GamepadIcon className="text-orange-400" size={24} />
              <AlertDialogTitle className="text-lg font-bold text-white">
                Détails de la Commande #{data.numBuy}
              </AlertDialogTitle>
            </div>
          </AlertDialogHeader>
          <div className="p-4 bg-dark-400">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  rounded-xl">
              <div className="flex items-center space-x-2">
                <ServerIcon size={14} className="text-blue-500" />
                <span className="text-sm text-gray-300">Serveur:</span>
                <p className="font-semibold text-white">{data.server}</p>
              </div>

              <div className="flex items-center space-x-2">
                <GamepadIcon size={20} className="text-green-500" />
                <span className="text-sm text-gray-300">Jeu:</span>
                <p className="font-semibold text-white">{data.jeu}</p>
              </div>

              <div className="flex items-center space-x-2">
                <HandCoins size={18} className="text-purple-500" />
                <span className="text-sm text-gray-300">Prix Total:</span>
                <p className="font-bold text-white/90">
                  {data.totalPrice.toFixed(2)}{" "}
                  {parsedDevise(data.currencymethod)}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Contact size={16} className="text-orange-500" />
                <span className="text-sm text-gray-300">Personnage:</span>
                <p className="font-semibold text-white/90">{data.gameName}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-indigo-500" />
                <span className="text-sm text-gray-300">Status:</span>
                <p className="font-semibold text-white/90">
                  <StatusBadge isOrder={true} status={data.status} />
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarClockIcon size={16} className="text-pink-400" />
                <span className="text-sm text-gray-300">Date:</span>
                <p className="font-semibold text-white/90">
                  {formatDateTime(data.createdAt).dateOnly}
                </p>
              </div>
            </div>
            <div className="w-full flex items-center space-x-2 mt-4">
              <CreditCardIcon size={16} className="text-amber-500" />
              <span className="text-sm text-gray-300">Paiement:</span>
              <p className="font-bold text-white/90">
                {`${(data?.paymentInfoDetails || "<br />").split("<br/>")[0]} ${
                  (data?.paymentInfoDetails || "<br />").split("<br/>")[1]
                }`}
              </p>
            </div>
          </div>

          <AlertDialogFooter className="flex gap-4">
            <button
              className="flex items-end justify-end text-sm text-red-500 font-extrabold transition-all hover:opacity-80"
              onClick={() => setOpen(false)}
            >
              Fermer
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SeeOrderBuy;
