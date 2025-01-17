"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import useNotificationStore from "@/lib/zustandmanage";
import usePusherNotifications from "@/app/hooks/usePusherNotifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationComp() {
  const [open, setOpen] = useState<boolean>(false);
  const { appointmentsNotifs, addNotification, totalNotif } =
    useNotificationStore();
  // console.log(appointmentsNotifs);
  const message = usePusherNotifications();
  const runNotifOrder = () => {
    const audio = new Audio("/song/notif.mp3");
    audio.play();
  };

  useEffect(() => {
    if (message) {
      addNotification(message);
      runNotifOrder();
      // console.log(message);
    }
  }, [message]);

  return (
    <div className="w-full flex items-center gap-4">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="relative cursor-pointer outline-none border-none mt-0.5">
            <Bell size={24} className="text-dark-500" />
            <span className="absolute flex items-center justify-center h-1.5 w-1.5 bg-red-700 rounded-full  top-[-2%] left-[60%]"></span>
            {/* {totalNotif > 0 ? (
              <span className="absolute flex items-center justify-center h-3.5 w-3.5 rounded-full bg-[#dc2626] text-white/80 text-[10px] top-[-25%] left-[50%]">
                {totalNotif}
              </span>
            ) : null} */}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 bg-dark-300 border-dark-500 z-50"
          align="end"
          forceMount
        >
          <div className="flex flex-col items-start gap-4 w-full overflow-y-auto h-full max-h-[300] p-1">
            {appointmentsNotifs.length <= 0 && (
              <div className="p-2 text-gray-400 text-sm">
                Pas de notifications recentes
              </div>
            )}
            {appointmentsNotifs.map((notif) => (
              <div
                key={notif._id}
                className="flex items-start p-2 rounded-md cursor-pointer transition-colors hover:shadow-md"
              >
                <div className="flex-shrink-0">
                  <Bell size={15} className="text-dark-500" />
                </div>
                <div className="ml-2 w-full text-xs text-gray-400">
                  <span className="font-medium">{notif.name}</span> viens de
                  demander un rendez-vous avec le Dr.{" "}
                  <strong className="underline">
                    {notif.primaryPhysician}
                  </strong>
                  .
                </div>
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
