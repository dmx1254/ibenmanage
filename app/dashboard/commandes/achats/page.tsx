import StatCard from "@/components/StatCard";
import React, { Suspense } from "react";
// import { getAppointmentList } from "@/lib/actions/appointment.actions";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getAllOrdersAchatList } from "@/lib/api/appointment";
import LatestInvoicesSkeleton from "@/components/skelettons/skeletons";
import DateFilter from "@/components/DateFilter";
import ScheduleSearch from "@/components/ScheduleSearch";

const AchatPage = async ({
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
  const orderId = searchParams?.orderId || "";
  const startDate = searchParams?.startDate || "";
  const endDate = searchParams?.endDate || "";
  const status = searchParams?.status || "";
  const currentPageStr = searchParams?.page || 1;
  const currentPage = Number(currentPageStr);
  const ordersAchat = await getAllOrdersAchatList(
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
          <p className="text-dark-700">Gérer les commandes de la journée</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={ordersAchat?.payedCount}
            duration={10}
            label="Commandes payées"
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
          <ScheduleSearch typeOfPage="achats" />
          <DateFilter />
        </section>
        <Suspense
          key={orderId + currentPage}
          fallback={<LatestInvoicesSkeleton />}
        >
          <DataTable
            totalPages={ordersAchat.totalPages || 0}
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

export default AchatPage;
