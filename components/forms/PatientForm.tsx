"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    email,
    password,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    const userData = {
      email,
      password,
    };

    const user = await signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });

    if (user?.ok === false) {
      toast.error(user?.error, {
        style: {
          color: "#ef4444",
          background: "#0D0F10",
          border: "1px solid #363A3D",
        },
      });
    } else {
      router.push("/dashboard?isAdmin=true");
    }

    try {
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header text-white">Bonjour 👋</h1>
          <p className="text-dark-700">Planifier et gérer les commandes.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="admin@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Mot de passe"
          placeholder="mot de passe"
          iconSrc="/assets/icons/locker.svg"
          iconAlt="password"
          IconAbsView={Eye}
          IconAbsOff={EyeOff}
        />
        <SubmitButton isLoading={isLoading}>Commencer</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
