"use client";

import { ChangeEvent } from "react";
import { Search, Filter } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const PatientSearch = () => {
  // console.log(doctors);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const handleSearchChange = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (searchTerm) {
      params.set("email", searchTerm);
    } else {
      params.delete("email");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 600);

  const handleCancelFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (params.get("userStatus")) {
      params.delete("userStatus");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const checkIsSearchParamsData =
    searchParams.get("userStatus") || searchParams.get("email");

  const handleUserStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (status) {
      params.set("userStatus", status);
    } else {
      params.delete("userStatus");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full flex items-center gap-4 max-w-sm">
      <Input
        placeholder="Rechercher un client par son email..."
        id="searchInput"
        // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSearchChange(e.target.value)
        }
        defaultValue={searchParams.get("email")?.toString()}
        className="w-full pl-8 max-w-80 placeholder:text-white/50 border-dark-500 bg-dark-400 text-14-regular"
      />
      <Search
        className="absolute text-dark-500 top-[24%] left-[2%]"
        size={22}
      />
      <Popover>
        <PopoverTrigger asChild>
          <span className="bg-dark-400 p-2.5 rounded-[10px]">
            <Filter size={22} className="text-white/50" />
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-dark-300 border-dark-500 p-4 rounded-lg">
          <div className="flex flex-col space-y-4">
            <div className="w-full">
              <Label htmlFor="userStatus" className="text-white/80">
                Filtrer
              </Label>
              <Select onValueChange={handleUserStatusChange}>
                <SelectTrigger className="shad-select-trigger mt-2">
                  <SelectValue placeholder="banni/online" />
                </SelectTrigger>
                <SelectContent className="shad-select-content">
                  <SelectGroup>
                    <SelectItem value="banni">
                      <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                        <p>Banni</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="online">
                      <div className="flex cursor-pointer items-center gap-2 transition-colors hover:bg-dark-400">
                        <p>En ligne</p>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

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

export default PatientSearch;
