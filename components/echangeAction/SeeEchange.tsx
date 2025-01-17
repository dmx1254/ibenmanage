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
  ServerIcon,
  GamepadIcon,
  Contact,
  Eye,
  Clock,
  CalendarClockIcon,
} from "lucide-react";
import { ExchangeKamas } from "@/lib/types/types";
import StatusBadge from "../StatusBadge";

const SeeEchange = ({ data }: { data: ExchangeKamas }) => {
  const [open, setOpen] = useState<boolean>(false);

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
                Détails de l'Échange #{data.codeToExchange}
              </AlertDialogTitle>
            </div>
          </AlertDialogHeader>
          <div className="p-4 bg-dark-400">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <ServerIcon size={14} className="text-blue-500" />
                <span className="text-sm text-gray-300">Serveur à pay:</span>
                <p className="font-semibold text-white">{data.serverOut}</p>
              </div>

              <div className="flex items-center space-x-2">
                <ServerIcon size={14} className="text-green-500" />
                <span className="text-sm text-gray-300">
                  Serveur à rec:
                </span>
                <p className="font-semibold text-white">{data.serverIn}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Contact size={16} className="text-orange-500" />
                <span className="text-sm text-gray-300">Perso à payer:</span>
                <p className="font-semibold text-white/90">
                  {data.characterToPay}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Contact size={16} className="text-purple-500" />
                <span className="text-sm text-gray-300">Perso à recevoir:</span>
                <p className="font-semibold text-white/90">
                  {data.characterToReceive}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <GamepadIcon size={18} className="text-indigo-500" />
                <span className="text-sm text-gray-300">Qty à payer:</span>
                <p className="font-bold text-white/90">{data.qtyToPay}M</p>
              </div>

              <div className="flex items-center space-x-2">
                <GamepadIcon size={18} className="text-green-500" />
                <span className="text-sm text-gray-300">
                  Qty à recevoir:
                </span>
                <p className="font-bold text-white/90">{data.qtyToReceive}M</p>
              </div>

              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-indigo-500" />
                <span className="text-sm text-gray-300">Statut:</span>
                <p className="font-semibold text-white/90">
                  <StatusBadge isOrder={false} status={data.status} />
                </p>
              </div>
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

export default SeeEchange;
