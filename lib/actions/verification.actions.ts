"use server";

import { Resend } from "resend";
import { getServersAndCurrencies } from "../api/patient";
import { AttachedFile } from "../utils";
import { revalidatePath } from "next/cache";
import { WriteEmailTemplate } from "@/components/WriteEmail-template";
import { SendServerEmailTemplate } from "@/components/SendServerEmailTemplate";

const resend = new Resend(process.env.RESEND_2IBN_API_KEY);

export async function sendUserEmail(
  email: string,
  message: string,
  lastname: string,
  firstname: string,
  object: string,
  files?: AttachedFile[]
) {
  // Préparez les fichiers en tant que pièces jointes avec CID pour les images
  const attachments = files?.map((file) => {
    let content: string | Buffer | undefined;
    let cid: string | undefined;

    // Si le fichier a un contenu en Base64, il doit être une chaîne de caractères
    if (typeof file.content === "string") {
      content = file.content;
    } else if (file.content instanceof ArrayBuffer) {
      // Convertir ArrayBuffer en Buffer
      content = Buffer.from(file.content);
    }

    // Associez un CID pour les images
    if (file.type.startsWith("image/")) {
      cid = `cid:${file.name}`; // Content-ID pour l'image inline
    }

    return {
      filename: file.name,
      content, // Assurez-vous que le contenu est bien un string ou un Buffer
      type: file.type,
      cid, // Ajoutez le CID si c'est une image
    };
  });
  const last = lastname || "tjon";
  const first = firstname || "tmon";
  // Préparez le contenu HTML de l'email
  const emailHtml = WriteEmailTemplate({
    email,
    message,
    lastname: last,
    firstname: first,
    files,
  });

  // Envoi de l'email via Resend
  const { data, error } = await resend.emails.send({
    from: "Ibendouma Support <support@ibendouma.com>",
    to: [email],
    subject: object,
    text: "",
    react: emailHtml, // Utilisez le HTML généré avec les images et pièces jointes
    attachments, // Ajoutez les pièces jointes ici
  });

  if (error) {
    console.log(error);
    return error;
  }

  if (data && data.id) {
    return {
      message: `Email envoyé avec succès à ${email}`,
    };
  }
}

export async function sendUserServers(
  lastname: string,
  firstname: string,
  emails: string[],
  object: string,
  message?: string
) {
  const result = await getServersAndCurrencies();
  const servers = result?.servers;
  const currencyRates = result?.currencyRates;

  const emailBatch = emails.map((email) => ({
    from: "Ibendouma Support <support@ibendouma.com>",
    to: email,
    subject: object,
    text: "",
    react: SendServerEmailTemplate({
      lastname,
      firstname,
      message,
      servers,
      currencyRates,
      email,
    }),
  }));

  const { data, error } = await resend.batch.send(emailBatch);

  if (error) {
    console.error("Erreur d'envoi :", error);
    return {
      errorMessage: "Une erreur est survenue lors de l'envoi des emails.",
    };
  }

  if (data) {
    return {
      successMessage: "Emails envoyés avec succès.",
      data,
    };
  }
}
