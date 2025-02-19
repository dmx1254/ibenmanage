"use client";

import { ColumnDef } from "@tanstack/react-table";

import StatusBadge from "../StatusBadge";
import { formatDateTime, parsedDevise } from "@/lib/utils";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { OrderSell } from "@/lib/types/types";
import OrderVenteDel from "../venteAction/OrderVenteDel";
import SeeOrderVente from "../venteAction/SeeOrderVente";
import OrderVenteDot from "../venteAction/OrderVenteDot";
import EmailDialog from "../EmailDialog";

export const columns: ColumnDef<OrderSell>[] = [
  {
    header: "OrderID",
    cell: ({ row }) => (
      <p className="text-14-medium">#{row?.original.orderNum}</p>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produit
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // console.log(row.original.products);
      return (
        <div className="w-full flex flex-col items-start gap-2 bg-dark-200 p-1.5 rounded">
          {row.original.products.map((p, i) => (
            <div
              className="w-full text-xs flex  items-center justify-between gap-0.5 pb-2 border-b border-dark-500"
              key={`${p.character}-${i}`}
            >
              <div className="flex flex-col items-start">
                <span>Categorie</span>
                <span className="font-bold">{p.category}</span>
              </div>
              <div className="flex flex-col items-start">
                <span>Serveur</span>
                <span className="font-bold">{p.server}</span>
              </div>
              <div className="flex flex-col items-start">
                <span>Quantité</span>
                <span className="font-bold">{p.amount}M</span>
              </div>
              <div className="flex flex-col items-start">
                <span>Personnage</span>
                <span className="font-bold">{p.character}</span>
              </div>
              {p.bonus && p.bonus > 0 && (
                <div className="flex flex-col items-start">
                  <span>Bonus</span>
                  <span className="font-bold text-[#FFD147]">{p.bonus}M</span>
                </div>
              )}
            </div>
          ))}
          <div className="flex max-md:flex-col items-start gap-1">
            <span>Mode de paiement</span>
            <span className="font-bold">{row?.original.paymentMethod}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => (
      <p className="text-14-medium">
        {row?.original.totalPrice}
        {parsedDevise(row?.original.cur)}
      </p>
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
          <OrderVenteDel id={data._id} />
          <SeeOrderVente data={data} />
          <EmailDialog
            isShowText={true}
            email={data?.billing?.email || data?.detailUser?.email}
            lastnameS={
              data?.billing?.lastname || data?.detailUser?.lastname || ""
            }
            firstnameS={
              data?.billing?.firstname || data?.detailUser?.firstname || ""
            }
          />
          <OrderVenteDot data={data} />
        </div>
      );
    },
  },
];
