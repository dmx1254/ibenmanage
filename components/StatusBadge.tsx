import { StatusOrder } from "@/constants";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

// @ts-ignore
const StatusBadge = ({
  status,
  isOrder = false,
}: {
  status: string;
  isOrder?: boolean;
}) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600":
          !isOrder && (status === "Payée" || status === "Terminée"),
        "bg-yellow-900": !isOrder && status === "En attente",
        "bg-red-600": !isOrder && status === "Annulée",
        "bg-blue-600":
          !isOrder &&
          (status === "En cours de paiement" ||
            status === "En cours de paiement"),
      })}
    >
      {!isOrder && (
        <Image
          src={StatusOrder[status]}
          alt={status}
          width={24}
          height={24}
          className="h-fit w-3"
        />
      )}
      <p
        className={clsx("status-12-semibold capitalize", {
          "text-green-500": status === "Payée" || status === "Terminée",
          "text-yellow-500": status === "En attente",
          "text-red-500": status === "Annulée",
          "text-blue-500":
            status === "En Cours de payment" ||
            status === "En cours de paiement",
          "-ml-4": isOrder,
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
