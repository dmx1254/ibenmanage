import React, { Suspense } from "react";
// import { getAppointmentList } from "@/lib/actions/appointment.actions";
import { columns } from "@/components/serverAchat/columns";
import { DataTable } from "@/components/serverAchat/DataTable";
import { getAllServersAchatList } from "@/lib/api/appointment";
import LatestInvoicesSkeleton from "@/components/skelettons/skeletons";
import SerachAchat from "@/components/serverAchatAction/SerachAchat";
import AddNewServerAchat from "@/components/serverAchatAction/AddNewServerAchat";
import { getCurrencies } from "@/lib/api/patient";
import CurrencyCard from "@/components/CurrencyCard";

const ServerAchatPage = async ({
  searchParams,
}: {
  searchParams?: {
    servername?: string;
    category?: string;
    page?: number;
  };
}) => {
  const servername = searchParams?.servername || "";
  const category = searchParams?.category || "";
  const currentPageStr = searchParams?.page || 1;
  const currentPage = Number(currentPageStr);
  const serversAchat = await getAllServersAchatList(
    servername,
    category,
    currentPage
  );

  const currencies = await getCurrencies();
  // console.log(currencies);

  return (
    <div className="mx-auto flex w-full flex-col space-y-14">
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Bienvenue 👋</h1>
          <p className="text-dark-700">Gérer les serveurs et les devises</p>
        </section>

        <section className="admin-stat">
          <CurrencyCard
            type="appointments"
            keyType="euro"
            cur={currencies?.eur}
            label="euro(€)"
            icon="/assets/icons/appointments.svg"
          />
          <CurrencyCard
            type="pending"
            keyType="dollar"
            cur={currencies?.usd}
            label="Dollar($)"
            icon="/assets/icons/pending.svg"
          />
          <CurrencyCard
            type="cancelled"
            keyType="aed"
            cur={currencies?.aed}
            label="AED"
            icon="/assets/icons/cancelled.svg"
          />
          <CurrencyCard
            type="cancelled"
            keyType="usdt"
            label="USDT(TRC20)"
            icon="/assets/icons/cancelled.svg"
            cur={currencies?.usdt}
          />
        </section>
        <section className="w-full max-sm:flex-col flex items-start gap-4 justify-between">
          <SerachAchat />
          <AddNewServerAchat />
        </section>
        <Suspense
          key={servername + currentPage}
          fallback={<LatestInvoicesSkeleton />}
        >
          <DataTable
            totalPages={serversAchat.totalPages || 0}
            itemsperPage={45}
            columns={columns}
            data={serversAchat.servers}
            currentPage={currentPage}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default ServerAchatPage;
