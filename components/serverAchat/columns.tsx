"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ServerSell, formatDateTime } from "@/lib/utils";

import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

import clsx from "clsx";
import DeleteServerAchat from "../serverAchatAction/DeleteServerAchat";
import UpdateServerAchat from "../serverAchatAction/UpdateServerAchat";
import OrderAchatDot from "../serverAchatAction/OrderAchatDot";
import AddNewServerAchat from "../serverAchatAction/AddNewServerAchat";

export const columns: ColumnDef<ServerSell>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row?.index + 1}</p>,
  },
  {
    accessorKey: "serverName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Server
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="text-14-medium">{row?.original.serverName}</p>
    ),
  },
  {
    accessorKey: "serverCategory",
    header: "Categorie",
    cell: ({ row }) => (
      <p
        className={clsx(
          "inline-flex text-14-medium bg-dark-400 p-2 rounded-[6px]",
          {
            "text-[#24AE7C]": row?.original.serverCategory === "dofus-kamas",
            "text-[#3b82f6]": row?.original.serverCategory === "dofus-retro",
            "text-[#f97316]": row?.original.serverCategory === "dofus-touch",
            "text-[#14b8a6]": row?.original.serverCategory === "wakfu",
          }
        )}
      >
        {row?.original.serverCategory}
      </p>
    ),
  },

  {
    accessorKey: "serverPriceDh",
    header: "Prix(Maroc DH)",
    cell: ({ row }) => <UpdateServerAchat type="price" data={row.original} />,
  },
  {
    accessorKey: "serverStatus",
    header: "Status",
    cell: ({ row }) => <UpdateServerAchat type="status" data={row.original} />,
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
          <DeleteServerAchat id={data._id} />
          <UpdateServerAchat data={data} />
          <OrderAchatDot data={data} />
        </div>
      );
    },
  },
];
