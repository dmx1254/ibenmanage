"use client";

import React, { ChangeEvent, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Eye, FilePlus } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createVenteServer } from "@/lib/actions/patient.actions";
import { toast } from "sonner";

const AddServerVente = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formdata, setFormdata] = useState({
    serverName: "",
    serverCategory: "",
    serverPrice: 0,
    serverMinQty: 1000000,
    serverStatus: "Disponible",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleChangeFormdata = (name: string, value: string | number) => {
    setFormdata((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleUpdateServerAchat = async () => {
    if (
      !formdata.serverName ||
      !formdata.serverCategory ||
      Number(formdata.serverPrice) < 0 ||
      !formdata.serverStatus
    ) {
      toast.error("Veuillez remplir tous les champs avant de continuer", {
        style: {
          color: "#ef4444",
          background: "#0D0F10",
          border: "1px solid #363A3D",
        },
      });
    } else {
      try {
        setIsLoading(true);
        const response = await createVenteServer(formdata);
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
      }
    }
  };

  return (
    <div className="">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <button
          className="flex items-center justify-center text-sm p-2 border rounded border-dark-500 bg-dark-400 transition-all"
          onClick={() => setOpen(true)}
        >
          Ajouter un serveur{" "}
          <FilePlus size={16} className="text-sky-400 ml-1" />
        </button>

        <AlertDialogContent className="bg-dark-300 border-dark-500 w-full max-w-3xl overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xxl font-bold text-white/90 flex items-center gap-2">
              créer un nouveau serveur
            </AlertDialogTitle>
            <AlertDialogDescription className="my-4">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <Label htmlFor="serverName">Serveur</Label>
                  <Input
                    type="text"
                    value={formdata.serverName}
                    name="serverName"
                    id="serverName"
                    placeholder="nom du serveur"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangeFormdata("serverName", e.target.value)
                    }
                    className="bg-transparent mt-2 border-dark-500 text-white/80"
                  />
                </div>

                <div className="w-full max-md:mt-4 md:ml-4">
                  <Label htmlFor="serverName">Categorie</Label>
                  <select
                    name="serverCategory"
                    id="serverCategory"
                    value={formdata.serverCategory}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleChangeFormdata("serverCategory", e.target.value)
                    }
                    className="w-full bg-dark-300 mt-2 border border-dark-500 text-white/80 p-[9px] rounded-[6px] focus:outline-none"
                  >
                    <option value="">Selectionner une catégorie</option>
                    <option value="dofus-kamas">Dofus kamas</option>
                    <option value="dofus-touch">Dofus touch</option>
                    <option value="dofus-retro">Dofus retro</option>
                    <option value="wakfu">Wakfu</option>
                  </select>
                </div>
                <div className="mt-4 relative">
                  <Label htmlFor="serverPrice">Prix</Label>
                  <Input
                    type="number"
                    value={formdata.serverPrice > 0 ? formdata.serverPrice : ""}
                    name="serverPrice"
                    id="serverPrice"
                    placeholder="0"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangeFormdata("serverPrice", e.target.value)
                    }
                    className="bg-transparent mt-2 border-dark-500 text-white/80"
                  />
                  <span className="absolute top-[53%] left-[90%]">DH</span>
                </div>
                <div className="w-full mt-4 md:ml-4">
                  <Label htmlFor="serverStatus">Status</Label>
                  <select
                    name="serverStatus"
                    id="serverStatus"
                    value={formdata.serverStatus}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleChangeFormdata("serverStatus", e.target.value)
                    }
                    className="w-full bg-dark-300 mt-2 border border-dark-500 text-white/80 p-[9px] rounded-[6px] focus:outline-none"
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Vendre rapidement">Vendre rapidement</option>
                    <option value="Stock complet">Stock complet</option>
                  </select>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-6">
            <button
              className="text-sm text-red-500 font-extrabold transition-all hover:opacity-80"
              onClick={() => setOpen(false)}
            >
              fermer
            </button>
            <button
              className="text-sm text-green-500 p-2 bg-dark-400 rounded-[6px] font-extrabold transition-all hover:opacity-80"
              onClick={handleUpdateServerAchat}
            >
              {isLoading ? "Is creating..." : "créer"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddServerVente;
