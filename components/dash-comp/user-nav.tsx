"use client";

import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage } from "../ui/avatar";

// import notificationSong from "@/public/song/notif.mp3";

export function UserNav() {
  const { data: session } = useSession();


  return (
    <div className="w-full flex items-start justify-end gap-4">
      <div>
        <Avatar className="mr-2 h-8 w-8">
          <AvatarImage
            src="/avatars/04.png"
            alt={session?.user.name}
            className=""
          />
        </Avatar>
      </div>
      {session ? (
        <div className="flex flex-col items-start gap-1">
          <span className="text-sm font-bold text-white/90">
            {session?.user.name}
          </span>
          <span className="text-sm text-green-500 font-extrabold">Admin</span>
        </div>
      ) : (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[50px]" />
        </div>
      )}
    </div>
  );
}
