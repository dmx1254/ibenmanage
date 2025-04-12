"use client";

import { ColumnDef } from "@tanstack/react-table";

import StatusBadge from "../StatusBadge";
import { formatDateTime, IGamerResp, parsedDevise } from "@/lib/utils";
import GameDel from "../tableAction/GameDel";
import GameDot from "../tableAction/GameDot";
import SeeGame from "../tableAction/SeeGame";

export const columns: ColumnDef<IGamerResp>[] = [
  {
    accessorKey: "orderNum",
    header: "N° de commande",
    cell: ({ row }) => (
      <p className="text-14-medium">{row?.original.orderNum}</p>
    ),
  },
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => <p className="text-14-medium">{row?.original.name}</p>,
  },

  {
    accessorKey: "amount",
    header: "Quantité",
    cell: ({ row }) => (
      <div>
        <p className="text-14-medium">
          Quantité: {row?.original.amount}{" "}
          {row?.original.items && `(${row?.original.items})`}
        </p>
        <p className="text-14-medium">
          Bonus: {row?.original.bonus || 0}{" "}
          {row?.original.items && `(${row?.original.items})`}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Prix",
    cell: ({ row }) => (
      <div>
        <p className="text-14-medium">
          Prix: {row?.original.totalPrice} {parsedDevise(row?.original.cur)}
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
          <GameDel id={data._id} />
          <SeeGame data={data} />
          <GameDot data={data} />
        </div>
      );
    },
  },
];
