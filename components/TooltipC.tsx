import { LucideIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";

interface T {
  title: string;
  Icon: LucideIcon;
  isActive: boolean;
  url?: string;
}
const TooltipC: React.FC<T> = ({ title, Icon, isActive, url }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={clsx("border-none p-2", {
              "bg-[#24AE7C]": isActive,
              "text-white": !isActive,
            })}
          >
            <Icon size={22} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="border-none text-white z-40" side="right">
          {!isActive && <p>{title}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipC;
