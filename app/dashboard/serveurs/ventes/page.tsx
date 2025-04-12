import React, { Suspense } from "react";
// import { getAppointmentList } from "@/lib/actions/appointment.actions";
import { columns } from "@/components/serverVente/columns";
import { DataTable } from "@/components/serverVente/DataTable";
import { getAllServersVenteList } from "@/lib/api/appointment";
import LatestInvoicesSkeleton from "@/components/skelettons/skeletons";
import SerachAchat from "@/components/serverAchatAction/SerachAchat";
import { getVenteCurrencies } from "@/lib/api/patient";
import CurrencyVenteCard from "@/components/CurrencyVenteCard";
import AddServerVente from "@/components/serverVenteAction/AddServerVente";

const ServerVentePage = async ({
  searchParams,
}: {
  searchParams?: {
    servername?: string;
    category?: string;
    page?: number;
  };
}) => {
  const dataParams = await searchParams;
  const servername = dataParams?.servername || "";
  const category = dataParams?.category || "";
  const currentPageStr = dataParams?.page || 1;
  const currentPage = Number(currentPageStr);
  const serversVente = await getAllServersVenteList(
    servername,
    category,
    currentPage
  );

  const currencies = await getVenteCurrencies();

  // console.log(serversVente.servers);

  return (
    <div className="mx-auto flex w-full flex-col space-y-14">
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Bienvenue 👋</h1>
          <p className="text-dark-700">Gérer les serveurs et les devises</p>
        </section>

        <section className="admin-stat">
          <CurrencyVenteCard
            type="appointments"
            keyType="euro"
            cur={currencies?.eur}
            label="euro(€)"
            icon="/assets/icons/appointments.svg"
          />
          <CurrencyVenteCard
            type="pending"
            keyType="dollar"
            cur={currencies?.usd}
            label="Dollar($)"
            icon="/assets/icons/pending.svg"
          />
          <CurrencyVenteCard
            type="cancelled"
            keyType="cad"
            cur={currencies?.cad}
            label="CAD"
            icon="/assets/icons/cancelled.svg"
          />
          <CurrencyVenteCard
            type="cancelled"
            keyType="mad"
            label="MAD"
            icon="/assets/icons/cancelled.svg"
            cur={currencies?.mad}
          />
        </section>
        <section className="w-full max-sm:flex-col flex items-start gap-4 justify-between">
          <SerachAchat />
          <AddServerVente />
        </section>
        <Suspense
          key={servername + currentPage}
          fallback={<LatestInvoicesSkeleton />}
        >
          <DataTable
            totalPages={serversVente.totalPages || 0}
            itemsperPage={45}
            columns={columns}
            data={serversVente.servers}
            currentPage={currentPage}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default ServerVentePage;
