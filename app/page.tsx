import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";

export default async function Home() {
  await connectDB();
  const session = await getServerSession(options);
  if (session) redirect("/dashboard");

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <PatientForm />
        </div>
      </section>
      <Image
        src="/dash2.jpg"
        alt="ibendouma dashboard"
        height={1000}
        width={1000}
        className="side-img max-w-[50%] sticky top-0 right-0 bottom-0"
      />
    </div>
  );
}
