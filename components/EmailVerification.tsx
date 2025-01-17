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
import { Input } from "@/components/ui/input";
import { BadgeCheck } from "lucide-react";
import {
  isEmailIsVErified,
  verificationEmail,
} from "@/lib/actions/verification.actions";
import { toast } from "sonner";
import clsx from "clsx";

const EmailVerification = ({
  email,
  isEmailVerified,
  name,
  userId,
}: {
  isEmailVerified: boolean;
  email: string;
  name: string;
  userId: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [codeVerif, setCodeVerif] = useState<string>("");

  const handleSendCodeVerification = async () => {
    const response = await verificationEmail(email, name, userId);
    if (response?.id) {
      toast.success(
        "Nous avons envoyé un code de vérification. Merci de vérifier votre email et vos spams.",
        {
          style: {
            color: "#22c55e",
            background: "#0D0F10",
            border: "1px solid #363A3D",
          },
        }
      );
    } else {
      toast.error(response?.message, {
        style: {
          color: "red",
          background: "#0D0F10",
          border: "1px solid #363A3D",
        },
      });
    }
  };

  const handleUpdateVerifiedEmail = async () => {
    const response = await isEmailIsVErified(codeVerif, userId);
    if (response?.successMessage) {
      toast.success(response?.successMessage, {
        style: {
          color: "#22c55e",
          background: "#0D0F10",
          border: "1px solid #363A3D",
        },
      });
      setOpen(false);
    } else if (response?.errorMessage) {
      toast.error(response?.errorMessage, {
        style: {
          color: "red",
          background: "#0D0F10",
          border: "1px solid #363A3D",
        },
      });
    }else{
        toast.error("Quelque chose s'est mal passée, réessayer plus tard", {
            style: {
              color: "red",
              background: "#0D0F10",
              border: "1px solid #363A3D",
            },
          });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-1">
        <span>Status :</span>&nbsp;
        {isEmailVerified ? (
          <span className="flex items-center gap-1 text-green-500">
            verified
            <BadgeCheck size={15} className="mt-0.5" />
          </span>
        ) : (
          <button
            className="flex border-none outline-none items-center gap-1 text-red-500 opacity-70"
            onClick={() => setOpen(true)}
          >
            not verified
            <BadgeCheck size={15} className="mt-0.5" />
          </button>
        )}
      </div>

      <AlertDialogContent className="bg-dark-200 border-dark-300 w-full max-sm:p-2  max-sm:max-w-72 max-md:max-w-96">
        <div className="flex flex-col items-start w-full">
          <Input
            type="email"
            placeholder={email}
            value={email}
            className="bg-transparent text-sm text-gray-500 placeholder:text-gray-500 border-dark-300 outline-none"
          />
          <button
            className="border-none outline-none text-sm mt-2 mb-6 text-green-500 bg-green-600 p-2 rounded transition-shadow hover:opacity-80"
            onClick={handleSendCodeVerification}
          >
            Envoyer
          </button>
          <Input
            type="text"
            placeholder="Saisir le code à 6 caractères"
            value={codeVerif}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCodeVerif(e.target.value)
            }
            className="bg-transparent text-sm text-gray-500 placeholder:text-gray-500 border-dark-300 outline-none"
          />
        </div>
        <AlertDialogFooter className="flex items-center gap-4">
          <button
            className="text-sm text-red-500 font-extrabold transition-all hover:opacity-80"
            onClick={() => setOpen(false)}
          >
            Annuler
          </button>
          <button
            className={clsx(
              "text-sm text-green-500 font-extrabold transition-all hover:opacity-80",
              {
                "opacity-40": codeVerif.length < 6,
              }
            )}
            disabled={codeVerif.length < 6}
            onClick={handleUpdateVerifiedEmail}
          >
            Vérifier
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmailVerification;
