"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { Currency } from "@/lib/utils";
import { FilePenLine } from "lucide-react";
import CurrencyDialogUpdate from "./CurrencyDialogUpdate";
import CurrencyDialogVenteUpdate from "./CurrencyDialogVenteUpdate";

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled";
  label: string;
  icon: string;
  cur: Currency[];
  keyType: string;
}

const CurrencyVenteCard = ({
  type,
  label,
  icon,
  cur,
  keyType,
}: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="w-full flex items-start justify-between gap-4 ">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={icon}
              height={28}
              width={28}
              alt={label}
              className="size-7 w-fit"
            />
            <p className="text-24-bold text-white">
              {String(cur[0][keyType])}
              {keyType === "euro" && "€"}
              {keyType === "dollar" && "$"}
              {keyType === "cad" && "CAD"}
              {keyType === "mad" && "DH"}
            </p>
          </div>
          <p className="text-14-regular">{label}</p>
        </div>
        {keyType !== "mad" && (
          <CurrencyDialogVenteUpdate cur={cur} keyType={keyType} />
        )}
      </div>
    </div>
  );
};

export default CurrencyVenteCard;
