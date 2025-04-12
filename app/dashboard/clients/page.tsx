import React, { Suspense } from "react";
import { columns } from "@/components/patientable/columns";
import { DataTable } from "@/components/patientable/DataTable";
// import { getAllPatients } from "@/lib/actions/patient.actions";
import PatientStatCard from "@/components/PatientStatCard";

import { Users, UserCheck, TriangleAlert } from "lucide-react";
import PatientSearch from "@/components/PatientSearch";
import DateFilterPatient from "@/components/DateFilterPatient";
import { getCustomers } from "@/lib/api/patient";
import LatestInvoicesSkeleton from "@/components/skelettons/skeletons";

const PatientPage = async ({
  searchParams,
}: {
  searchParams?: {
    email?: string;
    userStatus?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
  };
}) => {

  const dataParams = await searchParams;
  const email = dataParams?.email || "";
  const userStatus = dataParams?.userStatus || "";
  const startDate = dataParams?.startDate || "";
  const endDate = dataParams?.endDate || "";
  const currentPageStr = dataParams?.page || 1;
  const currentPage = Number(currentPageStr);
  const data = await getCustomers(email, startDate, endDate, currentPage, userStatus);


  return (
    <div className="mx-auto flex w-full flex-col space-y-14">
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Bienvenue 👋</h1>
          <p className="text-dark-700">
            Gerer et personnaliser les clients de votre choix.
          </p>
        </section>

        <section className="admin-stat">
          <PatientStatCard
            type="appointments"
            count={data?.usersCount}
            label="Total Utilisateurs"
            w={32}
            h={32}
            duration={10}
            icon={<Users size={32} className="text-[#3b82f6]" />}
          />
          <PatientStatCard
            type="pending"
            count={data?.usersActif}
            label="Utilisateurs en ligne"
            icon={<UserCheck size={32} className="text-[#24AE7C]" />}
            w={32}
            h={32}
            duration={2}
          />
          <PatientStatCard
            type="cancelled"
            count={data?.usersBan}
            label="Utilisateurs Bannis"
            icon={<TriangleAlert size={32} className="text-[#FFD147]" />}
            w={32}
            h={32}
            duration={3}
          />
        </section>
        <section className="w-full flex items-center justify-between">
          <PatientSearch />
          <DateFilterPatient />
        </section>
        <Suspense
          key={email + currentPage}
          fallback={<LatestInvoicesSkeleton />}
        >
          <DataTable
            totalPages={data?.totalPages || 1}
            itemsperPage={8}
            currentPage={currentPage}
            columns={columns}
            data={data?.users}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default PatientPage;
