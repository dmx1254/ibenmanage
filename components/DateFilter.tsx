"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { fr } from "date-fns/locale";
import { cn, convertDateForSearchParams, customFilterDate } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DateFilter = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   const start = searchParams.get("startDate");
  //   const end = searchParams.get("endDate");
  //   if (start) setStartDate(parse(start, "yyyy-MM-dd", new Date()));
  //   if (end) setEndDate(parse(end, "yyyy-MM-dd", new Date()));
  // }, [searchParams]);

  const handleStartDateChange = (date: Date | undefined) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (date) {
      params.set("startDate", convertDateForSearchParams(date));
    } else {
      params.delete("startDate");
    }
    replace(`${pathname}?${params.toString()}`);
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (date) {
      params.set("endDate", convertDateForSearchParams(date));
    } else {
      params.delete("endDate");
    }
    replace(`${pathname}?${params.toString()}`);
    setEndDate(date);
  };

  return (
    <div className="max-sm:w-full flex flex-col sm:flex-row gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <span
            className={cn(
              "flex items-center cursor-pointer gap-2 w-full sm:w-[190px] text-white/50 justify-start text-left font-normal p-2 bg-dark-400 border border-dark-500 rounded",
              !startDate && "text-white/50"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-white/50" />
            {startDate ? customFilterDate(startDate) : "Date de début"}
            <ChevronDown className="ml-auto h-4 w-4 text-white/50" />
          </span>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 z-50 bg-dark-400 border-dark-500"
          align="start"
        >
          <Calendar
            locale={fr}
            mode="single"
            selected={startDate}
            onSelect={handleStartDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <span
            className={cn(
              "flex items-center cursor-pointer gap-2 w-full sm:w-[190px] text-white/50 justify-start text-left font-normal p-2 bg-dark-400 border border-dark-500 rounded",
              !endDate && "text-white/50"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-white/50" />
            {endDate ? customFilterDate(endDate) : "Date de fin"}
            <ChevronDown className="ml-auto h-4 w-4 text-white/50" />
          </span>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 z-50 bg-dark-400 border-dark-500"
          align="start"
        >
          <Calendar
            locale={fr}
            mode="single"
            selected={endDate}
            onSelect={handleEndDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateFilter;
