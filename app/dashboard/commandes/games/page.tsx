import StatCard from "@/components/StatCard";
import React, { Suspense } from "react";
// import { getAppointmentList } from "@/lib/actions/appointment.actions";
import { getAllOrdersGameList } from "@/lib/api/appointment";
import LatestInvoicesSkeleton from "@/components/skelettons/skeletons";
import DateFilter from "@/components/DateFilter";
import ScheduleSearch from "@/components/ScheduleSearch";
import { Card } from "@/components/ui/card";
import { getMaintingStatus } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/gameTable/DataTable";
import { columns } from "@/components/gameTable/columns";
import UpdateMainting from "@/components/UpdateMainting";
const GamePage = async ({
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
  const gamesOrders = await getAllOrdersGameList(
    orderId,
    startDate,
    endDate,
    status,
    currentPage
  );
  const mainting = await getMaintingStatus();

  return (
    <div className="mx-auto flex w-full flex-col space-y-14">
      <main className="admin-main">
        <section className="w-full flex max-sm:flex-col items-center justify-between gap-6 space-y-4">
          <div>
            <h1 className="header">Bienvenue 👋</h1>
            <p className="text-dark-700">Gérer les echanges de la journée</p>
          </div>
          <Card className="w-full p-4 sm:max-w-48 border-dark-500 bg-dark-400">
            <div className="w-full flex items-start justify-between">
              <div className="flex flex-col items-start gap-2 text-sm">
                <span>Status</span>
                <span
                  className={`flex ${
                    mainting
                      ? mainting[0].mainting
                        ? "text-red-500"
                        : "text-green-500"
                      : "text-green-500"
                  } items-center justify-center text-sm rounded p-1.5 bg-dark-300 font-bold`}
                >
                  {mainting
                    ? mainting[0].mainting
                      ? "Site en maintenance"
                      : "Site en ligne"
                    : "Site en ligne"}
                </span>
              </div>
              <UpdateMainting
                mainting={mainting ? mainting[0].mainting : false}
                maintingId={mainting[0]._id}
              />
            </div>
          </Card>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={gamesOrders?.payedCount}
            duration={6}
            label="Commandes payées"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={gamesOrders?.pendingCount}
            duration={4}
            label="Commandes en attente"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={gamesOrders?.cancelledCount}
            duration={2}
            label="Commandes annulées"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <section className="w-full flex flex-col sm:flex-row items-center gap-4 justify-between">
          <ScheduleSearch typeOfPage="games" />
          <DateFilter />
        </section>
        <Suspense
          key={orderId + currentPage}
          fallback={<LatestInvoicesSkeleton />}
        >
          <DataTable
            totalPages={gamesOrders.totalPages || 0}
            itemsperPage={15}
            columns={columns}
            data={gamesOrders?.allGames}
            currentPage={currentPage}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default GamePage;
