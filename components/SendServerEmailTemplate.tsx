import { ServerSell } from "@/lib/utils";
import * as React from "react";

interface EmailTemplateProps {
  lastname: string;
  firstname: string;
  message?: string;
  servers: ServerSell[] | undefined;
  currencyRates:
    | {
        eur: number;
        usd: number;
        aed: number;
        // USDT: number;
      }
    | undefined;
  email: string;
}

export const SendServerEmailTemplate: React.FC<EmailTemplateProps> = async ({
  lastname,
  firstname,
  message,
  servers,
  currencyRates,
  email,
}) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fff",
        padding: "10px",
      }}
    >
      <table
        role="presentation"
        width="100%"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          opacity: 0.9,
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
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
            <div style={{ textAlign: "center" }}>
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

        {/* Main Content */}
        <tr>
          <td style={{ padding: "20px 15px" }}>
            <h1
              style={{
                color: "#333333",
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              Bonjour {`${lastname} ${firstname}`},
            </h1>

            <div
              style={{
                borderRadius: "6px",
                padding: "20px",
                marginBottom: "30px",
              }}
            >
              {message && (
                <p
                  style={{
                    fontSize: "17px",
                    marginBottom: "10px",
                  }}
                >
                  {message}
                </p>
              )}

              <p
                style={{
                  textAlign: "center",
                  color: "#333333",
                  marginBottom: "20px",
                }}
              >
                Voici le prix de nos serveurs d'achats
              </p>

              <table
                width="100%"
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  color: "#ffffff",
                  opacity: 0.9,
                  background: "#363A3D",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#151d20",
                      border: "1px solid #76828D",
                    }}
                  >
                    <th
                      style={{
                        padding: "8px",
                        color: "#d97706",
                        textAlign: "left",
                      }}
                    >
                      Serveur
                    </th>

                    <th
                      style={{
                        padding: "8px",
                        color: "#d97706",
                        textAlign: "center",
                      }}
                    >
                      Maroc(DH)
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        color: "#d97706",
                        textAlign: "center",
                      }}
                    >
                      Paypal
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        color: "#d97706",
                        textAlign: "center",
                      }}
                    >
                      Skrill
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        color: "#d97706",
                        textAlign: "center",
                      }}
                    >
                      Sepa
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        color: "#d97706",
                        textAlign: "center",
                      }}
                    >
                      Usdt(TRC20/ERC20)
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        color: "#d97706",
                        textAlign: "right",
                      }}
                    >
                      EAD(AED)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {servers?.map((server) => (
                    <tr
                      key={server._id}
                      style={{
                        border: "1px solid #76828D",
                      }}
                    >
                      <td style={{ padding: "8px" }}>{server.serverName}</td>

                      <td
                        style={{
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {server.serverPriceDh.toFixed(2)} DH/M
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {(
                          server.serverPriceDh / (currencyRates?.eur || 1)
                        ).toFixed(2)}{" "}
                        €/M
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {(
                          server.serverPriceDh / (currencyRates?.eur || 1)
                        ).toFixed(2)}{" "}
                        €/M
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {(
                          server.serverPriceDh / (currencyRates?.eur || 1)
                        ).toFixed(2)}{" "}
                        €/M
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {(
                          server.serverPriceDh / (currencyRates?.usd || 1)
                        ).toFixed(2)}{" "}
                        Usdt/M
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {(
                          server.serverPriceDh / (currencyRates?.aed || 1)
                        ).toFixed(2)}{" "}
                        AED/M
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <span
              style={{ color: "#666666", fontSize: "16px", lineHeight: "1.5" }}
            >
              Si vous avez des questions ou des soucis, notre équipe est
              disponible pour vous aider à
              <a
                href="mailto:support@ibendouma.com"
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

      {/* Anti-spam Message */}
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
