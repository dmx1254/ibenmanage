"use client";
import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  itemsperPage: number;
  currentPage: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalPages,
  itemsperPage,
  currentPage,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: currentPage - 1, //initial page index
    pageSize: itemsperPage, //default page size
  });

  // console.log(totalPages);

  // console.log(data);

  const [searchValue, setSearchValue] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    pageCount: totalPages,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handlePageParams = (page: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="data-table">
        <Table className="shad-table">
          <TableHeader className="bg-dark-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="shad-table-row-header">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <div className="w-full absolute flex justify-center mx-auto">
            <TableHeader className="w-full bg-dark-400 p-2 text-center">
              <span>Dofus kamas</span>
            </TableHeader>
          </div>

          <TableBody>
            <TableRow className="shad-table-row">
              <span>Hey</span>
            </TableRow>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.filter(
                  (row) =>
                    (row.original as any).serverCategory === "dofus-kamas"
                )
                .map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="shad-table-row"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <div className="w-full absolute flex justify-center mx-auto">
            <TableHeader className="w-full bg-dark-400 p-2 text-center">
              <span>Dofus touch</span>
            </TableHeader>
          </div>

          <TableBody>
            <TableRow className="shad-table-row">
              <span>Hey</span>
            </TableRow>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.filter(
                  (row) =>
                    (row.original as any).serverCategory === "dofus-touch"
                )
                .map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="shad-table-row"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <div className="w-full absolute flex justify-center mx-auto">
            <TableHeader className="w-full bg-dark-400 p-2 text-center">
              <span>Dofus retro</span>
            </TableHeader>
          </div>

          <TableBody>
            <TableRow className="shad-table-row">
              <span>Hey</span>
            </TableRow>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.filter(
                  (row) =>
                    (row.original as any).serverCategory === "dofus-retro"
                )
                .map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="shad-table-row"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <div className="w-full absolute flex justify-center mx-auto">
            <TableHeader className="w-full bg-dark-400 p-2 text-center">
              <span>Wakfu</span>
            </TableHeader>
          </div>

          <TableBody>
            <TableRow className="shad-table-row">
              <span>Hey</span>
            </TableRow>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.filter(
                  (row) => (row.original as any).serverCategory === "wakfu"
                )
                .map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="shad-table-row"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="table-actions">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="shad-gray-btn"
            >
              <Image
                src="/assets/icons/arrow.svg"
                width={24}
                height={24}
                alt="arrow"
              />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="shad-gray-btn"
            >
              Next
              <Image
                src="/assets/icons/arrow.svg"
                width={24}
                height={24}
                alt="arrow"
                className="rotate-180"
              />
            </Button>
          </div>

          <span className="italic text-white/80 text-sm">Get started !</span>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-white text-sm">
              {pagination.pageIndex + 1}&nbsp;&nbsp;of&nbsp; &nbsp;{totalPages}
            </span>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => {
                  table.firstPage();
                  handlePageParams(totalPages);
                }}
                disabled={!table.getCanPreviousPage()}
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex border-dark-500"
              >
                <span className="sr-only">Go to first page</span>
                <DoubleArrowLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  table.previousPage();
                  handlePageParams(currentPage > 1 ? currentPage - 1 : 1);
                }}
                disabled={!table.getCanPreviousPage()}
                variant="outline"
                className="h-8 w-8 p-0 border-dark-500"
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  table.nextPage();
                  handlePageParams(
                    currentPage < totalPages ? currentPage + 1 : currentPage
                  );
                }}
                disabled={!table.getCanNextPage()}
                variant="outline"
                className="h-8 w-8 p-0 border-dark-500"
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  table.lastPage();
                  handlePageParams(totalPages);
                }}
                disabled={!table.getCanNextPage()}
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex border-dark-500"
              >
                <span className="sr-only">Go to last page</span>
                <DoubleArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
