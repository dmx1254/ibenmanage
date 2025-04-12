import StatCard from "@/components/StatCard";
import React, { Suspense } from "react";
// import { getAppointmentList } from "@/lib/actions/appointment.actions";
import { columns } from "@/components/echangeTable/columns";
import { DataTable } from "@/components/echangeTable/DataTable";
import { getAllOrdersEchangeList } from "@/lib/api/appointment";
import LatestInvoicesSkeleton from "@/components/skelettons/skeletons";
import DateFilter from "@/components/DateFilter";
import ScheduleSearch from "@/components/ScheduleSearch";
import { Card } from "@/components/ui/card";
import { FilePenLine, FolderOpenDot } from "lucide-react";
import UpdateChangeRate from "@/components/UpdateChangeRate";
import { getEchangeRate } from "@/lib/actions/appointment.actions";

const ExchangePage = async ({
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
  const ordersAchat = await getAllOrdersEchangeList(
    orderId,
    startDate,
    endDate,
    status,
    currentPage
  );
  const rate = await getEchangeRate();

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
                <span>Taux</span>
                <span className="flex items-center justify-center text-sm rounded p-1.5 bg-dark-300 font-bold text-[#24AE7C]">
                  {rate[0].rate || 0}%
                </span>
              </div>
              <UpdateChangeRate rate={rate[0].rate} rateId={rate[0]._id} />
            </div>
          </Card>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={ordersAchat?.payedCount}
            duration={6}
            label="Echanges effectuées"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={ordersAchat?.pendingCount}
            duration={4}
            label="Echanges en attente"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={ordersAchat?.cancelledCount}
            duration={2}
            label="Echanges annulées"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <section className="w-full flex flex-col sm:flex-row items-center gap-4 justify-between">
          <ScheduleSearch typeOfPage="echanges" />
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
            data={ordersAchat?.allEchanges}
            currentPage={currentPage}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default ExchangePage;
