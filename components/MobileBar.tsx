"use client";

import React, { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import clsx from "clsx";
import { sidebarInfo } from "@/types/otherTypes";
import { usePathname } from "next/navigation";
import EmailDialog from "./EmailDialog";
import { NavUser } from "./sidebar-bottom";
import { useSession } from "next-auth/react";

const MobileBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const { data: session } = useSession();

  const user = {
    name: session?.user.name || "Admin",
    email: session?.user.email || "admin@gmail.com",
    avatar: "/avatars/04.png",
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <span className="border-none outline-none flex md:hidden">
          <Menu size={30} />
        </span>
      </SheetTrigger>
      <SheetContent side="left" className="bg-dark-300 border-dark-500 h-full">
        <SheetHeader>
          <SheetTitle>
            <Link href="/dashboard" className="flex items-center -mt-4 -ml-3">
              <Image
                src="/dash-logo.png"
                height={130}
                width={130}
                alt="2ibn"
                className="mb-3 h-20 w-20"
              />
              <span className="font-extrabold -mt-3 text-[18px] text-white -ml-3">
                Ibendouma
              </span>
            </Link>
          </SheetTitle>
          {/* <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription> */}
        </SheetHeader>
        <div className="flex flex-col items-start justify-between h-full pb-12">
          <div className="w-full flex flex-col items-start gap-2">
            {sidebarInfo.map((profil) => (
              <div key={profil.id} className="flex flex-col items-start">
                <Button
                  className={clsx("cursor-pointer flex items-center gap-2", {
                    "text-green-500 opacity-90 hover:opacity-100":
                      profil.slug === pathname,

                    "hover:opacity-100": profil.slug !== pathname,
                  })}
                  asChild
                >
                  <Link href={profil.slug} className="flex items-start gap-2">
                    <span>
                      <profil.icon size={20} />
                    </span>
                    <span>{profil.title}</span>
                  </Link>
                </Button>
                {profil.subUrls &&
                  profil.subUrls.map((sub) => (
                    <Button
                      key={sub.id}
                      className={clsx(
                        "cursor-pointer flex items-center gap-2 opacity-90 ml-6",
                        {
                          "text-green-500 opacity-100 hover:opacity-100":
                            sub.slug === pathname,

                          "hover:opacity-100": sub.slug !== pathname,
                        }
                      )}
                      asChild
                    >
                      <Link className="flex items-start gap-2" href={sub.slug}>
                        {sub.title}
                      </Link>
                    </Button>
                  ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-4 mb-4">
            <EmailDialog />
            <NavUser user={user} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileBar;
