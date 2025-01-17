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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CalendarClockIcon,
  Clock,
  Coins,
  CreditCard,
  Download,
  Eye,
  GamepadIcon,
  Send,
} from "lucide-react";

import { OrderSell } from "@/lib/types/types";
import { formatDateTime, parsedDevise } from "@/lib/utils";
import StatusBadge from "../StatusBadge";
import { Card } from "../ui/card";

const SeeOrderVente = ({ data }: { data: OrderSell }) => {
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

        <AlertDialogContent className="bg-dark-200 border-dark-300 h-full overflow-y-scroll max-h-[500px] w-full text-white p-4">
          <AlertDialogHeader>
            <div className="flex items-center space-x-3">
              <GamepadIcon className="text-orange-400" size={24} />
              <AlertDialogTitle className="text-lg font-bold text-white">
                Détails de la Commande #{data.orderNum}
              </AlertDialogTitle>
            </div>
          </AlertDialogHeader>
          <div className="p-4 bg-dark-400">
            <div className="w-full flex items-center space-x-2 border-b border-dark-500">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="w-full">
                    Voir les produits
                  </AccordionTrigger>
                  <AccordionContent className="w-full">
                    <div className="w-full flex flex-col items-center gap-2">
                      {data.products.map((p, i) => (
                        <div
                          className="w-full text-sm flex items-center justify-between gap-2 pb-4 border-b border-dark-500"
                          key={`${p.character}-${i}`}
                        >
                          <div className="flex flex-col items-start gap-1">
                            <span>Categorie</span>
                            <span className="font-bold">{p.category}</span>
                          </div>
                          <div className="flex flex-col items-start gap-1">
                            <span>Serveur</span>
                            <span className="font-bold">{p.server}</span>
                          </div>
                          <div className="flex flex-col items-start gap-1">
                            <span>Quantité</span>
                            <span className="font-bold">{p.amount}M</span>
                          </div>
                          <div className="flex flex-col items-start gap-1">
                            <span>Prix U</span>
                            <span className="font-bold">
                              {p.price}
                              {parsedDevise(data.cur)}
                            </span>
                          </div>
                          <div className="flex flex-col items-start gap-1">
                            <span>Total</span>
                            <span className="font-bold">
                              {p.totalPrice}
                              {parsedDevise(data.cur)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="w-full flex flex-col items-start gap-4 pt-4 pb-4">
              <p>Informations de facturation</p>
              <div className="w-full grid grid-cols-2 gap-4">
                <Card className="flex flex-col items-start bg-dark-300 p-2 text-sm border-dark-500 text-white">
                  <span className="text-xs text-zinc-500">Prenom</span>
                  <span>{data?.billing?.lastname || "N/A"}</span>
                </Card>
                <Card className="flex flex-col items-start bg-dark-300 p-2 text-sm border-dark-500 text-white">
                  <span className="text-xs text-zinc-500">Nom</span>
                  <span>{data?.billing?.lastname || "N/A"}</span>
                </Card>
                <Card className="flex flex-col items-start bg-dark-300 p-2 text-sm border-dark-500 text-white">
                  <span className="text-xs text-zinc-500">Adresse</span>
                  <span>{data?.billing?.address || "N/A"}</span>
                </Card>
                <Card className="flex flex-col items-start bg-dark-300 p-2 text-sm border-dark-500 text-white">
                  <span className="text-xs text-zinc-500">Telephone</span>
                  <span>{data?.billing?.phone || "N/A"}</span>
                </Card>
                <Card className="flex flex-col items-start bg-dark-300 p-2 text-sm border-dark-500 text-white">
                  <span className="text-xs text-zinc-500">Email</span>
                  <span className="w-full flex flex-wrap">
                    {data?.billing?.email || "N/A"}
                  </span>
                </Card>
                <Card className="flex flex-col items-start bg-dark-300 p-2 text-sm border-dark-500 text-white">
                  <span className="text-xs text-zinc-500">Pays</span>
                  <span>{data?.billing?.country || "N/A"}</span>
                </Card>
                <Card className="flex flex-col items-start bg-dark-300 p-2 text-sm border-dark-500 text-white">
                  <span className="text-xs text-zinc-500">Ville</span>
                  <span>{data?.billing?.city || "N/A"}</span>
                </Card>
                <Card className="flex flex-col items-start gap-2 bg-dark-300 p-2 text-sm border-dark-500 text-white">
                  <span className="text-xs text-zinc-500">Departement</span>
                  <span>{data?.billing?.departement || "N/A"}</span>
                </Card>
                <Card className="flex flex-col items-start bg-dark-300 p-2 text-sm border-dark-500 text-white">
                  <span className="text-xs text-zinc-500">Code postal</span>
                  <span>{data?.billing?.codePostal || "N/A"}</span>
                </Card>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 my-4 mt-2 border-t pt-4 border-dark-500">
              <p>Informations de paiement</p>
              <div className="flex items-center gap-4">
                <span>Methode de paiement: </span>
                <span className="flex items-center gap-2">
                  {" "}
                  <CreditCard size={18} className="text-purple-500" />
                  {data.paymentMethod || "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-dark-500">
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
              <div className="flex items-center space-x-2">
                <Coins size={16} className="text-pink-400" />
                <span className="text-sm text-gray-300">Prix Total:</span>
                <p className="font-semibold text-white/90">
                  {data.totalPrice}
                  {parsedDevise(data.cur)}
                </p>
              </div>
            </div>
            <div className="w-full flex items-end justify-end gap-4">
              <button className="flex items-center justify-center bg-dark-300 p-1.5 rounded text-violet-600">
                <Download size={20} />
              </button>
              <button className="flex items-center justify-center bg-dark-300 p-1.5 rounded">
                <Send size={20} className="text-yellow-600" />
              </button>
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

export default SeeOrderVente;
