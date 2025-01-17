"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";
import PhoneNumberDisplay from "../phone-number-display";
import { USERLOGINRESPONSE } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import ClientAction from "./ClientAction";
import UpdateClient from "../patientActtion/UpdateClient";
import DeleteClient from "../patientActtion/DeleteClient";
import EmailDialog from "../EmailDialog";

export const columns: ColumnDef<USERLOGINRESPONSE>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row?.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="text-14-medium">
        {`${row?.original.lastname} ${row?.original.firstname}`}
        {row.original.isBan && (
          <span className="ml-1 text-xs p-1.5 rounded text-[#FFD147] bg-dark-400">
            Banni
          </span>
        )}
      </p>
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <p className="status-12-semibold status-badge">{row?.original.email}</p>
    ),
  },
  {
    accessorKey: "country",
    header: "Pays",
    cell: ({ row }) => (
      <p className="text-14-medium capitalize">{row?.original.country}</p>
    ),
  },
  {
    accessorKey: "city",
    header: "Ville",
    cell: ({ row }) => (
      <p className="text-14-medium capitalize">{row?.original.city}</p>
    ),
  },

  {
    accessorKey: "phone",
    header: "Téléphone",
    cell: ({ row }) => {
      return <PhoneNumberDisplay phoneNumber={row?.original.phone} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={cn(
          "px-2 py-1 text-xs font-medium",
          row?.original.online
            ? "bg-green-900 text-green-200"
            : "bg-red-900 text-red-200"
        )}
      >
        {row?.original.online ? (
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
    ),
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      console.log(data);
      return (
        <div className="flex gap-1 max-xl:ml-4">
          <div className="flex items-center gap-3">
            <DeleteClient id={data._id} />
            <UpdateClient data={data} />
            <EmailDialog
              isShowText={true}
              email={data.email || ""}
              firstnameS={data.firstname || ""}
              lastnameS={data.lastname || ""}
            />
          </div>
          <ClientAction data={data} />
        </div>
      );
    },
  },
];
