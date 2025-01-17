import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  BookUser,
  Contact,
  Eye,
  Mail,
  MapPin,
  Phone,
  SquareUserRound,
  User,
} from "lucide-react";
import { USERLOGINRESPONSE } from "@/lib/types/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import EmailDialog from "../EmailDialog";

const UpdateClient = ({ data }: { data: USERLOGINRESPONSE }) => {
  const [open, setOpen] = useState<boolean>(false);

  const sendEmail = () => {
    // Implement email sending logic here
    console.log(`Sending email to ${data.email}`);
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <button
          className="flex items-center justify-center p-0.5 border rounded border-orange-300 text-orange-400 transition-all hover:text-orange-500"
          onClick={() => setOpen(true)}
        >
          <Eye size={18} />
        </button>

        <AlertDialogContent className="bg-dark-300 border-dark-500 w-full max-w-3xl overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xxl font-bold text-white/90 flex items-center gap-2">
              <Contact size={24} /> Profil Client
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 flex flex-col items-center">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={data.profil ? data.profil : "/user.png"}
                      alt={`${data.firstname} ${data.lastname}`}
                    />
                    <AvatarFallback className="bg-dark-400 text-lg text-white/70">
                      {data.firstname[0]}
                      {data.lastname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p className="mt-4 text-xl font-semibold text-white/90">
                    {data.firstname} {data.lastname}
                  </p>
                  <p className="text-sm text-white/60">{data.email}</p>
                  <div className="mt-4 flex gap-2">
                    <Badge variant={data.isAdmin ? "default" : "secondary"}>
                      {data.isAdmin ? "Admin" : "Utilisateur"}
                    </Badge>

                    <Badge
                      className={cn(
                        "px-2 py-1 text-xs font-medium",
                        data?.online
                          ? "bg-green-900 text-green-200"
                          : "bg-red-900 text-red-200"
                      )}
                    >
                      {data?.online ? (
                        <>
                          <span className="mr-1.5 flex h-2 w-2">
                            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                          </span>
                          En ligne
                        </>
                      ) : (
                        <>
                          <span className="mr-1.5 flex h-2 w-2">
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                          </span>
                          Hors ligne
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
                <div className="col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem
                      icon={<MapPin size={18} />}
                      label="Adresse"
                      value={data.address}
                    />
                    <InfoItem
                      icon={<MapPin size={18} />}
                      label="Ville"
                      value={data.city}
                    />
                    <InfoItem
                      icon={<MapPin size={18} />}
                      label="Pays"
                      value={data.country}
                    />
                    <InfoItem
                      icon={<Phone size={18} />}
                      label="Téléphone"
                      value={data.phone}
                    />
                  </div>

                  <Separator className="bg-dark-500" />
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem
                      icon={<SquareUserRound size={18} />}
                      label="Membre depuis"
                      value={new Date(data.createdAt).toLocaleDateString()}
                    />
                    <InfoItem
                      icon={<SquareUserRound size={18} />}
                      label="Dernier Mis à jour"
                      value={new Date(data.updatedAt).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    />
                  </div>
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
            <EmailDialog />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 bg-dark-400 rounded-[10px] p-2">
    <span className="text-white/60 mt-1">{icon}</span>
    <div className="flex flex-col items-start gap-2">
      <p className="text-sm font-medium text-white/90">{label}</p>
      <p className="text-sm text-white/60">{value}</p>
    </div>
  </div>
);

export default UpdateClient;
