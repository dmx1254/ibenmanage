import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { ServerBuy } from "@/lib/utils";

const ServerVenteDot = ({ data }: { data: ServerBuy }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 p-0 border-none outline-none transition-all hover:opacity-80">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-5 w-8 mt-2" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-dark-300 z-50 border-dark-500 shadow-lg"
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer transition-transform hover:opacity-80"
            onClick={() => {
              navigator.clipboard.writeText(String(data.serverPrice));
              toast.success(
                "Prix du serveur copié dans la presse papier",
                {
                  style: {
                    color: "#22c55e",
                    background: "#0D0F10",
                    border: "1px solid #363A3D",
                  },
                }
              );
            }}
          >
            Copier le prix en DH
          </DropdownMenuItem>

          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ServerVenteDot;
