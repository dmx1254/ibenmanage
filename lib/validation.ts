import { z } from "zod";

export const UserFormValidation = z.object({
  email: z
    .string({ required_error: "L'adresse email est requis" })
    .email({ message: "Adresse email invalide" }),

  password: z
    .string()
    .min(8, "Le mot de passe doit avoir au moins 8 caractères")
    .regex(
      /[!@#$%^&*()-+=;]/,
      "Le mot de passe doit contenir au moins un caractère spécial"
    ),
});

export const PatientFormValidation = z
  .object({
    name: z
      .string()
      .min(2, "Le nom doit comporter au moins 2 caractères.")
      .max(50, "Le nom doit comporter au plus 50 caractères."),
    email: z.string().email("Adresse E-mail invalide"),
    phone: z
      .string()
      .refine(
        (phone) => /^\+\d{10,15}$/.test(phone),
        "Numéro de telephone invalide"
      ),
    password: z
      .string()
      .min(8, "Le mot de passe doit avoir au moins 8 caractères")
      .regex(
        /[!@#$%^&*()-+=;]/,
        "Le mot de passe doit contenir au moins un caractère spécial"
      ),
    confirmPassword: z.string(),
    birthDate: z.coerce.date(),
    gender: z.enum(["homme", "femme", "autre"]),
    address: z
      .string()
      .min(5, "L'adresse doit comporter au moins 5 caractères")
      .max(500, "L'adresse doit contenir au plus 500 caractères"),
    occupation: z
      .string()
      .min(2, "La profession doit comporter au moins 2 caractères")
      .max(500, "La profession doit contenir au plus 500 caractères"),
    emergencyContactName: z
      .string()
      .min(2, "Le nom du contact doit comporter au moins 2 caractères")
      .max(50, "Le nom du contact doit comporter au plus 50 caractères"),
    emergencyContactNumber: z
      .string()
      .refine(
        (emergencyContactNumber) =>
          /^\+\d{10,15}$/.test(emergencyContactNumber),
        "Numéro de telephone invalide"
      ),
    primaryPhysician: z.string().min(2, "Sélectionnez au moins un médecin"),
    insuranceProvider: z.string().optional(),
    insurancePolicyNumber: z.string().optional(),

    allergies: z.string().optional(),
    bloodgroup: z.string().optional(),
    vaccination: z.string().optional(),
    currentMedication: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    identificationType: z
      .string()
      .min(2, "Sélectionnez un type d'identification"),
    identificationNumber: z
      .string()
      .min(
        5,
        "Le numero d'identification doit comporter au moins 5 caractères"
      ),

    identificationDocument: z.custom<File[]>().optional(),
    treatmentConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: "Vous devez consentir au traitement pour pouvoir continuer",
      }),
    disclosureConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message:
          "Vous devez consentir à la divulgation d'information pour pouvoir continuer",
      }),
    privacyConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message:
          "Vous devez consentir au respect de la vie privée pour continuer",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"], // Indique où placer l'erreur
  });

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Sélectionnez au moins un médecin"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Le motif doit comporter au moins 2 caractères")
    .max(500, "Le motif doit comporter au maximum 500 caractères"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Sélectionnez au moins un médecin"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Sélectionnez au moins un médecin"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Le motif doit comporter au moins 2 caractères")
    .max(500, "Le motif doit comporter au maximum 500 caractères"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
