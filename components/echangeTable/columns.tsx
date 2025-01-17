"use client";

import { ColumnDef } from "@tanstack/react-table";

import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { ExchangeKamas } from "@/lib/types/types";
import EchangeDel from "../echangeAction/EchangeDel";
import EchangeDot from "../echangeAction/EchangeDot";
import SeeEchange from "../echangeAction/SeeEchange";

export const columns: ColumnDef<ExchangeKamas>[] = [
  {
    header: "Code d'echange",
    cell: ({ row }) => (
      <p className="text-14-medium">{row?.original.codeToExchange}</p>
    ),
  },

  {
    accessorKey: "serverOut",
    header: "Serveur à payer",
    cell: ({ row }) => (
      <div>
        <p className="text-14-medium">Serveur: {row?.original.serverOut}</p>
        <p className="text-14-medium">Quantite: {row?.original.qtyToPay}M</p>
        <p className="text-14-medium">
          Nom personnage: {row?.original.characterToPay}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "serverIn",
    header: "serveur à recevoir",
    cell: ({ row }) => (
      <div>
        <p className="text-14-medium">Serveur: {row?.original.serverIn}</p>
        <p className="text-14-medium">
          Quantite: {row?.original.qtyToReceive}M
        </p>
        <p className="text-14-medium">
          Nom personnage: {row?.original.characterToReceive}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row?.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row?.original.createdAt).dateOnly}
      </p>
    ),
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex items-center gap-2">
          <EchangeDel id={data._id} />
          <SeeEchange data={data} />
          <EchangeDot data={data} />
        </div>
      );
    },
  },
];
