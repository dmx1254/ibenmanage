import { ServerBuy, ServerSell } from "@/lib/utils";
import React, { ChangeEvent, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Eye } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { serverVenteUp } from "@/lib/actions/patient.actions";
import clsx from "clsx";

const UpdateServerVente = ({
  data,
  type,
}: {
  data: ServerBuy;
  type?: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formdata, setFormdata] = useState({
    serverName: data.serverName,
    serverCategory: data.serverCategory,
    serverPrice: Number(data.serverPrice),
    serverStatus: data.serverStatus,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeFormdata = (name: string, value: string | number) => {
    setFormdata((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleUpdateServerAchat = async () => {
    try {
      setIsLoading(true);
      const response = await serverVenteUp(data._id, formdata);
      if (response) {
        toast.success(
          `Le serveur ${response.serverName} a été mis à jour avec succès`,
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
      console.log(error);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <button
          className={clsx(
            "flex items-center justify-center p-0.5 transition-all ",
            {
              "border rounded border-orange-300 text-orange-400  hover:text-orange-500":
                !type,
              "text-white": type,
            }
          )}
          onClick={() => setOpen(true)}
        >
          {type === "price" ? (
            `${data.serverPrice}DH`
          ) : type === "status" ? (
            <p
              className={clsx("text-14-medium p-2 rounded-[6px] inline-flex", {
                "bg-green-600 text-[#24AE7C]":
                  data.serverStatus === "Disponible",
                "bg-red-600 text-[#FF4F4E]":
                  data.serverStatus === "Stock complet",
                "bg-blue-600 text-[#3b82f6]":
                  data.serverStatus === "Vendre rapidement",
              })}
            >
              {data.serverStatus}
            </p>
          ) : (
            <Eye size={18} />
          )}
        </button>

        <AlertDialogContent className="bg-dark-300 border-dark-500 w-full max-w-3xl overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xxl font-bold text-white/90 flex items-center gap-2">
              Mettre à jour le serveur {data.serverName}
            </AlertDialogTitle>
            <AlertDialogDescription className="my-4">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {type === "price" || type === "status" || (
                  <div>
                    <Label htmlFor="serverName">Serveur</Label>
                    <Input
                      type="text"
                      value={formdata.serverName}
                      name="serverName"
                      id="serverName"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChangeFormdata("serverName", e.target.value)
                      }
                      className="bg-transparent mt-2 border-dark-500 text-white/80"
                    />
                  </div>
                )}

                {type === "price" || type === "status" || (
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
                      <option value="dofus-kamas">Dofus kamas</option>
                      <option value="dofus-touch">Dofus touch</option>
                      <option value="dofus-retro">Dofus retro</option>
                      <option value="wakfu">Wakfu</option>
                    </select>
                  </div>
                )}
                {(type === "price" || !type) && (
                  <div className="mt-4 relative">
                    <Label htmlFor="serverPrice">Prix</Label>
                    <Input
                      type="number"
                      value={formdata.serverPrice}
                      name="serverPrice"
                      id="serverPrice"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChangeFormdata("serverPrice", e.target.value)
                      }
                      className="bg-transparent mt-2 border-dark-500 text-white/80"
                    />
                    <span className="absolute top-[53%] left-[90%]">DH</span>
                  </div>
                )}
                {(type === "status" || !type) && (
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
                      <option value="Stock complet">Stock complet</option>
                      <option value="Disponible">Disponible</option>
                      <option value="Vendre rapidement">
                        Vendre rapidement
                      </option>
                    </select>
                  </div>
                )}
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
              {isLoading ? "Updating..." : "mettre à jour"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UpdateServerVente;
