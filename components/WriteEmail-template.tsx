import { AttachedFile } from "@/lib/utils";
import * as React from "react";

interface EmailTemplateProps {
  email: string;
  message: string;
  lastname: string;
  firstname: string;
  files?: AttachedFile[];
}

export const WriteEmailTemplate: React.FC<EmailTemplateProps> = async ({
  email,
  message,
  files,
  lastname,
  firstname,
}) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        padding: "10px",
      }}
    >
      <table
        role="presentation"
        width="100%"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {/* En-tête */}
        <tr>
          <td
            style={{
              backgroundColor: "#363A3D",
              padding: "10px",
              textAlign: "center",
              fontSize: "24px",
              color: "#ffffff",
            }}
          >
            <div
              style={{
                textAlign: "center",
              }}
            >
              <img
                src="https://2ibn.vercel.app/ibennewapp-logo.png"
                alt="ibendouma logo"
                style={{
                  width: "100px",
                  height: "70px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          </td>
        </tr>

        {/* Contenu principal */}
        <tr>
          <td style={{ padding: "40px 30px" }}>
            <h1
              style={{
                color: "#333333",
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              Bonjour {`${lastname} ${firstname}`}
            </h1>

            <div
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
                padding: "20px",
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              <p
                style={{
                  fontSize: "17px",
                }}
              >
                {message}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  gap: "20px",
                }}
              >
                {files?.map((file, index) => {
                  if (file.type.startsWith("image/")) {
                    const cid = `${file.content}`;
                    return (
                      <div key={index}>
                        <img
                          src={cid}
                          alt={file.name}
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      </div>
                    );
                  } else {
                    const cid = `${file.content}`;
                    return (
                      <div key={index}>
                        <a href={cid} download={file.name}>
                          {file.name}
                        </a>
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            <span
              style={{ color: "#666666", fontSize: "16px", lineHeight: "1.5" }}
            >
              Si vous avez des questions ou des soucis, notre équipe est
              disponible pour vous aider à
              <a
                href="mailto:"
                style={{
                  color: "#d97706",
                  textDecoration: "none",
                  margin: "0 10px",
                }}
              >
                support@2ibn.com
              </a>
            </span>
          </td>
        </tr>

        {/* Instructions de sécurité */}
        <tr>
          <td style={{ padding: "0 30px 30px" }}>
            <div>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.5",
                  margin: 0,
                }}
              >
                Merci de nous avoir choisi, et bienvenue chez 2iBn ! 🎮
              </p>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.5",
                  margin: 0,
                }}
              >
                Cordialement, <br />
                L'équipe 2iBn
              </p>
            </div>
          </td>
        </tr>

        {/* Pied de page */}
        <tr>
          <td
            style={{
              padding: "30px",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
            }}
          >
            <p
              style={{ color: "#999999", fontSize: "14px", margin: "0 0 10px" }}
            >
              © 2024 JBK Services INTERNATIONAL FZ-LLC. Tous droits réservés.
            </p>
            <p
              style={{ color: "#999999", fontSize: "14px", margin: "0 0 10px" }}
            >
              Cet email a été envoyé à {email}
            </p>
            <div style={{ marginTop: "20px" }}>
              <a
                href="https://2ibn.com"
                style={{
                  color: "#d97706",
                  textDecoration: "none",
                  margin: "0 10px",
                }}
              >
                Site web
              </a>{" "}
              |
              <a
                href="https://2ibn.com/echange-de-kamas"
                style={{
                  color: "#d97706",
                  textDecoration: "none",
                  margin: "0 10px",
                }}
              >
                Echange de kamas
              </a>{" "}
              |
              <a
                href="https://2ibn.com/vendre-des-kamas"
                style={{
                  color: "#d97706",
                  textDecoration: "none",
                  margin: "0 10px",
                }}
              >
                Vendre vos kamas
              </a>
            </div>
          </td>
        </tr>
      </table>

      {/* Message anti-spam */}
      <table
        role="presentation"
        width="100%"
        style={{ maxWidth: "600px", margin: "20px auto" }}
      >
        <tr>
          <td
            style={{ textAlign: "center", color: "#999999", fontSize: "12px" }}
          >
            <p>
              Cet email a été envoyé par 2IBN. Pour vous assurer de recevoir nos
              emails, ajoutez support@2ibn.com à votre liste de contacts.
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
};
