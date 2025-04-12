import StatCard from "@/components/StatCard";
import React, { Suspense } from "react";
// import { getAppointmentList } from "@/lib/actions/appointment.actions";
import { columns } from "@/components/venteTable/columns";
import { DataTable } from "@/components/venteTable/DataTable";
import { getAllOrdersVenteList } from "@/lib/api/appointment";
import LatestInvoicesSkeleton from "@/components/skelettons/skeletons";
import DateFilter from "@/components/DateFilter";
import ScheduleSearch from "@/components/ScheduleSearch";

const VentePage = async ({
  searchParams,
}: {
  searchParams?: {
    orderId?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    page?: number;
  };
}) => {
  //   const appointments = await getRecentAppointmentList();
  const orderParams = await searchParams;
  const orderId = orderParams?.orderId || "";
  const startDate = orderParams?.startDate || "";
  const endDate = orderParams?.endDate || "";
  const status = orderParams?.status || "";
  const currentPageStr = orderParams?.page || 1;
  const currentPage = Number(currentPageStr);
  const ordersAchat = await getAllOrdersVenteList(
    orderId,
    startDate,
    endDate,
    status,
    currentPage
  );

  return (
    <div className="mx-auto flex w-full flex-col space-y-14">
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Bienvenue 👋</h1>
          <p className="text-dark-700">
            Gérer les commandes de ventes de la journée
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={ordersAchat?.payedCount}
            duration={10}
            label="Commandes terminées"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={ordersAchat?.pendingCount}
            duration={6}
            label="Commandes en attente"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={ordersAchat?.cancelledCount}
            duration={4}
            label="Commandes annulées"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <section className="w-full flex items-center justify-between">
          <ScheduleSearch typeOfPage="ventes" />
          <DateFilter />
        </section>
        <Suspense
          key={orderId + currentPage}
          fallback={<LatestInvoicesSkeleton />}
        >
          <DataTable
            totalPages={ordersAchat.totalPages}
            itemsperPage={15}
            columns={columns}
            data={ordersAchat?.allOrders}
            currentPage={currentPage}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default VentePage;
