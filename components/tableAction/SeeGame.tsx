"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Gamepad2,
  Server,
  User,
  CreditCard,
  Calendar,
  Package,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { IGamerResp, parsedDevise } from "@/lib/utils";
import { useState } from "react";
const SeeGame = ({ data }: { data: IGamerResp }) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          className="flex items-center justify-center p-0.5 border rounded border-orange-300 text-orange-400 transition-all hover:text-orange-700"
          title="Voir les détails"
          onClick={() => {
            setOpen(true);
          }}
        >
          <span className="sr-only">Voir les détails</span>
          <Gamepad2 size={18} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-dark-200 border-dark-300 w-full text-white p-4">
        <AlertDialogHeader>
          <div className="flex items-center space-x-3">
            <Gamepad2 className="text-orange-400" size={24} />
            <AlertDialogTitle className="text-lg font-bold text-white">
              Détails de la Commande #{data.orderNum}
            </AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <div className="p-4 bg-dark-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl">
            <div className="flex items-center space-x-2">
              <User size={16} className="text-blue-500" />
              <span className="text-sm text-gray-300">Nom:</span>
              <p className="font-semibold text-white">{data.name}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Package size={16} className="text-green-500" />
              <span className="text-sm text-gray-300">Type:</span>
              <p className="font-semibold text-white">{data.type}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Server size={16} className="text-orange-500" />
              <span className="text-sm text-gray-300">Quantité:</span>
              <p className="font-semibold text-white">
                {data.amount} {data.items && `(${data.items})`}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <CreditCard size={16} className="text-purple-500" />
              <span className="text-sm text-gray-300">
                Méthode de paiement:
              </span>
              <p className="font-semibold text-white">{data.paymentMethod}</p>
            </div>

            <div className="flex items-center space-x-2">
              <CreditCard size={16} className="text-red-500" />
              <span className="text-sm text-gray-300">Prix total:</span>
              <p className="font-semibold text-white">
                {data.totalPrice} {parsedDevise(data.cur)}
              </p>
            </div>

            {data.bonus && (
              <div className="flex items-center space-x-2">
                <Package size={16} className="text-green-500" />
                <span className="text-sm text-gray-300">Bonus:</span>
                <p className="font-semibold text-white">{data.bonus}</p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-blue-500" />
              <span className="text-sm text-gray-300">Date de création:</span>
              <p className="font-semibold text-white">
                {format(new Date(data.createdAt), "dd MMMM yyyy HH:mm", {
                  locale: fr,
                })}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-green-500" />
              <span className="text-sm text-gray-300">
                Dernière mise à jour:
              </span>
              <p className="font-semibold text-white">
                {format(new Date(data.updatedAt), "dd MMMM yyyy HH:mm", {
                  locale: fr,
                })}
              </p>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="border border-dark-500 text-red-400">
            Fermer
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SeeGame;
