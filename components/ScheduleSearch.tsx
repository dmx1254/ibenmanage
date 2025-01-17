"use client";

import { ChangeEvent } from "react";
import { Search, Filter } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ScheduleSearch = ({ typeOfPage }: { typeOfPage?: string }) => {
  // console.log(doctors);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const handleSearchChange = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (searchTerm) {
      params.set("orderId", searchTerm);
    } else {
      params.delete("orderId");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 600);

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleCancelFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (params.get("status")) {
      params.delete("status");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const checkIsSearchParamsData =
    searchParams.get("status") ||
    searchParams.get("startDate") ||
    searchParams.get("endDate");

  return (
    <div className="relative w-full flex items-center gap-4 max-w-sm">
      <Input
        placeholder={
          typeOfPage === "echanges"
            ? "Rechercher un echange..."
            : "Rechercher une commande..."
        }
        id="searchInput"
        // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSearchChange(e.target.value)
        }
        defaultValue={searchParams.get("orderId")?.toString()}
        className="w-full pl-8 max-w-80 placeholder:text-white/50 border-dark-500 bg-dark-400 text-14-regular"
      />
      <Search
        className="absolute text-dark-500 top-[24%] left-[2%]"
        size={22}
      />
      <Popover>
        <PopoverTrigger asChild>
          <span className="bg-dark-400 cursor-pointer p-2.5 rounded-[10px]">
            <Filter size={22} className="text-white/50" />
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-dark-300 border-dark-500 p-4 rounded-lg">
          <div className="flex flex-col space-y-4">
            {/* Status Filter */}
            <div className="w-full">
              <Label htmlFor="doctorName" className="text-white/80 mb-2">
                Filtrer par Status
              </Label>
              <Select onValueChange={handleStatusChange}>
                <SelectTrigger className="shad-select-trigger">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="shad-select-content">
                  <SelectGroup>
                    <SelectItem value="En attente">
                      <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                        <p>En attente</p>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value={
                        typeOfPage === "echanges" || typeOfPage === "ventes"
                          ? "Terminée"
                          : "Payée"
                      }
                    >
                      <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                        <p>
                          {typeOfPage === "echanges" || typeOfPage === "ventes"
                            ? "Terminée"
                            : "Payée"}
                        </p>
                      </div>
                    </SelectItem>
                    {(typeOfPage === "ventes" || typeOfPage === "achats") && (
                      <SelectItem value="En Cours de payment">
                        <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                          <p>En Cours de payment</p>
                        </div>
                      </SelectItem>
                    )}

                    <SelectItem value="Annulée">
                      <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                        <p>Annulée</p>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Doctor Name Filter */}

            {checkIsSearchParamsData && (
              <button
                className="w-full outline-none text-white/80 selft-center text-red-200 rounded p-2"
                onClick={handleCancelFilter}
              >
                Annuler les filtres
              </button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ScheduleSearch;
