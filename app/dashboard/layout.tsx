import { UserNav } from "@/components/dash-comp/user-nav";
import Sidebar from "@/components/dash-comp/Sidebar";
import MobileBar from "@/components/MobileBar";
import AuthProvider from "../context/AuthPovider";


interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <AuthProvider>
      <main className="w-full flex bg-dark-300 text-gray-300">
        <Sidebar />
        <section className="w-full">
          <div className="flex bg-dark-300 w-full border-b border-dark-400 sticky right-0 p-3 top-0 bottom-8 items-center justify-between space-x-4 z-30">
            <MobileBar />
            <div className="w-full flex items-center justify-between gap-4">
              <UserNav />
            </div>
          </div>
          <div className="p-4 relative w-full flex min-h-screen flex-col">
            {children}
          </div>
        </section>
      </main>
    </AuthProvider>
  );
}
