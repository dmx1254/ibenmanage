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
                src="https://ibendouma.com/ibennewapp-logo.png"
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
              Bonjour,
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
                support@ibendouma.com
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
                Merci de nous avoir choisi, et bienvenue chez ibendouma ! 🎮
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ padding: "0 30px 30px" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.5",
                    margin: 0,
                  }}
                >
                  🎮 Rejoignez notre communaute:
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap",
                    marginLeft: "8px",
                  }}
                >
                  <a
                    href="https://www.facebook.com/ibendouma1"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      borderRadius: "9999px",
                      border: "2px solid #45494e",
                      backgroundColor: "#363A3D",
                      textDecoration: "none",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/733/733547.png"
                      alt="Facebook"
                      style={{
                        display: "block",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  </a>

                  <a
                    href="https://www.threads.net/@ibendouma_com?hl=fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      borderRadius: "9999px",
                      border: "2px solid #45494e",
                      backgroundColor: "#363A3D",
                      textDecoration: "none",
                    }}
                  >
                    <img
                      src="https://tse4.mm.bing.net/th?id=OIP.FJ2rxJYdlVhRJ2kGR9-g6QHaHa&w=474&h=474&c=7"
                      alt="Threads"
                      style={{
                        display: "block",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  </a>

                  <a
                    href="https://t.me/ibendouma"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      borderRadius: "9999px",
                      border: "2px solid #45494e",
                      backgroundColor: "#363A3D",
                      textDecoration: "none",
                      marginLeft: "2px",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2111/2111646.png"
                      alt="Telegram"
                      style={{
                        display: "block",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  </a>

                  <a
                    href="https://wa.me/971529087560"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      borderRadius: "9999px",
                      border: "2px solid #45494e",
                      backgroundColor: "#363A3D",
                      textDecoration: "none",
                      marginLeft: "2px",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/733/733585.png"
                      alt="WhatsApp"
                      style={{
                        display: "block",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  </a>

                  <a
                    href="https://www.tiktok.com/@ibendouma.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      borderRadius: "9999px",
                      border: "2px solid #45494e",
                      backgroundColor: "#363A3D",
                      textDecoration: "none",
                      marginLeft: "2px",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3046/3046121.png"
                      alt="TikTok"
                      style={{
                        display: "block",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  </a>

                  <a
                    href="https://discordapp.com/users/369803701725954048/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      borderRadius: "9999px",
                      border: "2px solid #45494e",
                      backgroundColor: "#363A3D",
                      textDecoration: "none",
                      marginLeft: "2px",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3670/3670157.png"
                      alt="Discord"
                      style={{
                        display: "block",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  </a>

                  <a
                    href="https://www.instagram.com/ibendouma_com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      borderRadius: "9999px",
                      border: "2px solid #45494e",
                      backgroundColor: "#363A3D",
                      textDecoration: "none",
                      marginLeft: "2px",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png"
                      alt="Instagram"
                      style={{
                        display: "block",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  </a>

                  <a
                    href="skype:bendouma.ilyass?chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      borderRadius: "9999px",
                      border: "2px solid #45494e",
                      backgroundColor: "#363A3D",
                      textDecoration: "none",
                      marginLeft: "2px",
                    }}
                  >
                    <img
                      src="https://tse4.mm.bing.net/th?id=OIP.DZtr8Ssjo5BUHKRNRYiw3gHaHa&w=474&h=474&c=7"
                      alt="Skype"
                      style={{
                        display: "block",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  </a>
                </div>
              </div>

              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.5",
                  margin: 0,
                }}
              >
                Cordialement, <br />
                L'équipe ibendouma
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
                href="https://www.ibendouma.com/faq"
                style={{
                  color: "#999999",
                  textDecoration: "none",
                  margin: "0 10px",
                }}
              >
                Centre d'aide
              </a>{" "}
              -
              <a
                href="https://www.ibendouma.com/privacy-and-policy"
                style={{
                  color: "#999999",
                  textDecoration: "none",
                  margin: "0 10px",
                }}
              >
                Politique de confidentialité
              </a>{" "}
              -
              <a
                href="https://ibendouma.com/terms-and-conditions"
                style={{
                  color: "#999999",
                  textDecoration: "none",
                  margin: "0 10px",
                }}
              >
                Conditions d'utilisation
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
              Cet email a été envoyé par ibendouma. Pour vous assurer de
              recevoir nos emails, ajoutez support@ibendouma.com à votre liste
              de contacts.
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
};
