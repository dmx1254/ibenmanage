"use client";

import { useEffect, useState } from "react";
import { ServerExchange, codeGenerated } from "@/lib/utils";
import { FilePlus, Gift, Loader } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Dialog, DialogContent } from "./ui/dialog";
import {
  createOrdAchat,
  getAllServersAchat,
} from "@/lib/actions/appointment.actions";

const CreateOrderAchat = ({
  userId,
  lastname,
  firstname,
}: {
  userId: string;
  lastname: string;
  firstname: string;
}) => {
  const [servers, setServers] = useState<ServerExchange[] | null>(null);

  useEffect(() => {
    const getServersAchat = async () => {
      const serversAchat = await getAllServersAchat();
      setServers(serversAchat);
    };
    getServersAchat();
  }, []);

  const [formData, setFormData] = useState({
    gameName: "",
    amount: "",
    paymentMethod: "",
    paymentDetails: "",
    lastname: lastname,
    firstname: firstname,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameNameError, setGameNameError] = useState<string>("");
  const [lastnameError, setLastnameError] = useState<string>("");
  const [firstnameError, setFirstnameError] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");
  const [paymentMethodError, setPaymentMethodError] = useState<string>("");
  const [paymentDetailsError, setPaymentDetailsError] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const [server, setServer] = useState<ServerExchange | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const paymentMethods = [
    "CIH Bank",
    "Attijariwafa Bank",
    "Bmce",
    "BMCI",
    "Crédit du maroc",
    "Crédit agricole",
    "Cfg",
    "Société générale",
    "Cash Plus",
    "Wafacash",
    "Paypal",
    "Skrill",
    "Usdt",
    // "Binance Pay",
    // "Payeer",
    // "Wise",
    // "TRC20",
  ];

  const getPaymentDetailsLabel = (method: string) => {
    switch (method) {
      case "CIH Bank":
      case "Attijariwafa Bank":
      case "Bmce":
      case "BMCI":
      case "Crédit du maroc":
      case "Crédit agricole":
      case "Cfg":
      case "Société générale":
        return "RIB complet:";
      case "Western Union":
        return "Votre ville:";
      case "Cash Plus":
      case "Wafacash":
        return "Téléphone:";
      case "Binance Pay":
      case "Paypal":
      case "Skrill":
        return "Email de paiement:";
      case "ADV Cash":
        return "Numéro de compte:";
      case "Usdt":
        return "Adresse TRX:";
      default:
        return "";
    }
  };

  const getPaymentDetailsPlaceholder = (method: string) => {
    switch (method) {
      case "CIH Bank":
      case "Attijariwafa Bank":
      case "Barid Bank":
        return "Entrez votre RIB";
      case "Western Union":
        return "Entrer votre ville";
      case "Binance Pay":
      case "Payeer":
      case "Wise":
        return "Entrer l'mail de paiement:";
      case "Cash Plus":
      case "Wafacash":
        return "Téléphone:";
      case "ADV Cash":
        return "Enter le numéro de compte:";
      case "TRC20":
        return "Entrez l'adresse TRX";
      default:
        return "";
    }
  };

  const calculateTotal = () => {
    const amount = parseFloat(formData.amount) || 0;
    const total = Number((amount * (server?.serverPriceDh || 0)).toFixed(2));
    const bonusNoParsed = total > 3000 ? 50 : 0;
    const bonus = Number(bonusNoParsed);
    return { total, bonus };
  };

  const handleSubmit = async () => {
    // console.log("Form submitted:", formData);
    let paymentInfoDetails = `${formData.paymentMethod}<br/>${formData.paymentDetails}`;

    let qty = Number(formData.amount);

    let unitPrice = (server?.serverPriceDh || 1).toFixed(2);

    const data = {
      userId: userId,
      numBuy: codeGenerated(),
      jeu: server?.serverCategory,
      server: server?.serverName,
      pu: Number(unitPrice),
      qte: qty,
      totalPrice: calculateTotal().total + calculateTotal().bonus,
      paymentMethod: formData.paymentMethod,
      gameName: formData.gameName,
      paymentInfoDetails: paymentInfoDetails,
      currencymethod: "mad",
      lastname: formData.lastname,
      firstname: formData.firstname,
    };

    try {
      setIsLoading(true);
      const response = await createOrdAchat(data);
      if (response) {
        toast.success(response.successMessage, {
          style: { color: "#16a34a" },
        });
      }
    } catch (error) {
      // console.log(error);
      toast.success("Erreur survenu lors de la commande", {
        style: { color: "#dc2626" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleServerChange = (value: string) => {
    const serverSelected = servers?.find(
      (server) => server.serverName === value
    );
    if (serverSelected) {
      setServer(serverSelected);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center p-0.5 border rounded border-teal-300 text-teal-400 transition-all hover:text-teal-700"
      >
        <FilePlus size={18} />
      </button>
      <DialogContent className="w-full z-50 bg-dark-300 p-6 border-dark-500">
        <div className="w-full overflow-y-scroll scroll-thumb">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="server" className="text-white/90">
                  Server
                </Label>
                <Select
                  value={server?.serverName || ""}
                  onValueChange={(value) => handleServerChange(value)}
                >
                  <SelectTrigger className="outline-none bg-[#363A3D] text-white/80 border-[#363A3D] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                    <SelectValue placeholder="Selectionner un serveur" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1D21] border-[#45494e] text-white">
                    {servers?.map((server) => (
                      <SelectItem key={server._id} value={server.serverName}>
                        {server.serverName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {serverError && (
                  <span className="text-sm text-red-500">{serverError}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gameName" className="text-white/90">
                  Nom en jeu
                </Label>
                <Input
                  id="gameName"
                  placeholder="Saisir le nom en jeu"
                  value={formData.gameName}
                  onChange={(e) =>
                    handleInputChange("gameName", e.target.value)
                  }
                  className="outline-none bg-[#363A3D] text-white/80 border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                {gameNameError && (
                  <span className="text-sm text-red-500">{gameNameError}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-white/90">
                  Quantite de kamas
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Saisir la quantite de kamas"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="outline-none bg-[#363A3D] text-white/80 border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                {amountError && (
                  <span className="text-sm text-red-500">{amountError}</span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod" className="text-white/90">
                Methode de paiments
              </Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  handleInputChange("paymentMethod", value)
                }
              >
                <SelectTrigger className="outline-none bg-[#363A3D] border-[#363A3D] text-white/80 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                  <SelectValue placeholder="Selectionner un methode de paiment" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1D21] border-[#45494e] text-white">
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {paymentMethodError && (
                <span className="text-sm text-red-500">
                  {paymentMethodError}
                </span>
              )}
            </div>
            {formData.paymentMethod && (
              <div className="space-y-2">
                <Label className="text-white/90">
                  {getPaymentDetailsLabel(formData.paymentMethod)}
                </Label>
                <Input
                  placeholder={getPaymentDetailsPlaceholder(
                    formData.paymentMethod
                  )}
                  value={formData.paymentDetails}
                  onChange={(e) =>
                    handleInputChange("paymentDetails", e.target.value)
                  }
                  className="outline-none bg-[#363A3D] text-white/80 border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                {paymentDetailsError && (
                  <span className="text-sm text-red-500">
                    {paymentDetailsError}
                  </span>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastname" className="text-white/90">
                  Prenom
                </Label>
                <Input
                  id="lastname"
                  placeholder="Prenom"
                  value={formData.lastname}
                  onChange={(e) =>
                    handleInputChange("lastname", e.target.value)
                  }
                  className="outline-none bg-[#363A3D] text-white/80 border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                {lastnameError && (
                  <span className="text-sm text-red-500">{lastnameError}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstname" className="text-white/90">
                  Nom
                </Label>
                <Input
                  id="firstname"
                  placeholder="Nom"
                  value={formData.firstname}
                  onChange={(e) =>
                    handleInputChange("firstname", e.target.value)
                  }
                  className="outline-none bg-[#363A3D] text-white/80 border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                {firstnameError && (
                  <span className="text-sm text-red-500">{firstnameError}</span>
                )}
              </div>
            </div>
            <div className="bg-[#363A3D] text-white/80 border-none p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Prix:</span>
                <span className="font-semibold text-amber-600">
                  {(server?.serverPriceDh || 0).toFixed(2)} DH
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total:</span>
                <span className="font-semibold text-amber-600">
                  {calculateTotal().total}DH
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-amber-600">
                <Gift className="h-4 w-4" />
                <span>Bonus</span>
              </div>
            </div>
          </div>
          {/* "dialogsell.bonus":"Bonus: +{bonus1} {cur} (orders over {totalbonus} {cur})", */}

          <Button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white"
            onClick={handleSubmit}
            disabled={isLoading}
            aria-label="submit sell kamas button"
          >
            {isLoading ? (
              <span className="flex items-center gap-1">
                <Loader className="animate-spin" size={24} />
                En cours...
              </span>
            ) : (
              "Creer"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrderAchat;
