"use client";

import { sidebarInfo } from "@/types/otherTypes";
import { Button } from "../ui/button";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { NavUser } from "../sidebar-bottom";
import EmailDialog from "../EmailDialog";

const Sidebar = () => {
  const pathname = usePathname();

  const { data: session } = useSession();

  const user = {
    name: session?.user.name || "Admin",
    email: session?.user.email || "admin@gmail.com",
    avatar: "/avatars/04.png",
  };

  return (
    <div className="admin-profile-cop sticky left-0 top-0 bottom-0 max-h-screen max-md:hidden md:w-60">
      <div className="flex flex-col items-start gap-4">
        <Link href="/dashboard" className="flex items-center -mt-4 -ml-3">
          <Image
            src="/dash-logo.png"
            height={130}
            width={130}
            alt="2ibn"
            className="mb-3 h-20 w-20"
          />
          <span className="max-md:hidden font-extrabold -mt-3 text-[18px] text-white -ml-3">
            Ibendouma
          </span>
        </Link>

        <div className="w-full flex flex-col items-start gap-2 -mt-4">
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
                <Link href={profil.slug} className="flex items-start z-20 gap-2">
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
      </div>
      <div className="flex flex-col items-start gap-4">
        <EmailDialog />
        <NavUser user={user} />
      </div>
    </div>
  );
};

export default Sidebar;
