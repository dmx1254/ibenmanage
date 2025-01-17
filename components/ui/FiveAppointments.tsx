"use client";

import React from "react";
import Image from "next/image";
import StatusBadge from "../StatusBadge";
import { Orderbuy } from "@/lib/types/types";

const FiveRecentsOrdersIby = ({
  order,
  index,
}: {
  order: Orderbuy;
  index: number;
}) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-3">
        <Image
          src={`/avatars/0${index}.png`}
          alt={order.numBuy}
          width={100}
          height={100}
          className="size-8 rounded-full"
        />
        <p className="whitespace-nowrap"></p>
      </div>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">#{order?.numBuy}</p>
        <p className="text-12-semibold">{order.gameName}</p>
      </div>
      <div className="flex flex-col items-end ml-auto">
        <div className="flex text-xs font-semibold">
          <StatusBadge status={order.status} />
        </div>
      </div>
    </div>
  );
};

export default FiveRecentsOrdersIby;
