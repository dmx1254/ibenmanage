"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import Count from "./Count";

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  duration: number;
  label: string;
  icon: string;
}

const StatCard = ({
  type,
  count = 0,
  duration,
  label,
  icon,
}: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4 ">
        <Image
          src={icon}
          height={32}
          width={32}
          alt={label}
          className="size-8 w-fit"
        />
        <div className="text-32-bold text-white">
          <Count count={count} duration={duration} />
        </div>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatCard;
