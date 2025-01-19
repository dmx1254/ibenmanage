import * as React from "react";
import { parsedDevise } from "@/lib/utils";

interface OrderPaymentTemplateProps {
  lastname: string;
  firstname: string;
  currencymethod: string;
  totalPrice: number;
  qte: number;
  numBuy: string;
  server: string;
  gameName: string;
  pu: number;
  datePayed: Date;
}

export const OrderPaymentTemplate: React.FC<OrderPaymentTemplateProps> = ({
  lastname,
  firstname,
  currencymethod,
  totalPrice,
  numBuy,
  pu,
  qte,
  gameName,
  server,
  datePayed,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return `${amount} ${parsedDevise(currency)}`;
  };

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
          <td style={{ padding: "40px 30px" }}>
            <h1
              style={{
                color: "#333333",
                fontSize: "24px",
                marginBottom: "10px",
              }}
            >
              Hi {`${lastname} ${firstname}`},
            </h1>

            <div
              style={{
                padding: "10px",
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  color: "#666666",
                }}
              >
                Thank you for your order!
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666666",
                }}
              >
                We have successfully delivered your order.
              </p>
            </div>

            {/* Payment Details */}
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Order Number:</strong> {numBuy}
              </p>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Game:</strong> {gameName}
              </p>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Server:</strong> {server}
              </p>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Amount:</strong> {qte}M
              </p>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Unit Price:</strong>{" "}
                {formatCurrency(pu, currencymethod)}
              </p>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Total Amount:</strong>{" "}
                {formatCurrency(totalPrice, currencymethod)}
              </p>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Payment Date:</strong> {formatDate(datePayed)}
              </p>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Status:</strong>{" "}
                <span style={{ color: "#22c55e" }}>Payed ✓</span>
              </p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p
                style={{
                  color: "#666666",
                  fontSize: "16px",
                  lineHeight: "1.5",
                }}
              >
                We have already processed your order. You can track your order
                status here:
              </p>
              <span
                style={{
                  color: "#666666",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  marginLeft: "4px",
                }}
              >
                👉 My Account{" "}
                <a
                  href="https://ibendouma.com/profile"
                  style={{
                    color: "#d97706",
                    textDecoration: "none",
                  }}
                >
                  Website
                </a>
              </span>
            </div>

            <p
              style={{
                color: "#666666",
                fontSize: "15px",
                lineHeight: "1.5",
                marginTop: "20px",
              }}
            >
              If you have any questions about your payment or need further
              assistance, our support team is available 24/7 at
              support@ibendouma.com or via live chat.
            </p>
          </td>
        </tr>

        {/* Footer */}
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
                  🎮 Join our community:
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
                Best regards, <br />
                The ibendouma team
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
              © 2024 JBK Services INTERNATIONAL FZ-LLC. All rights reserved.
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
                Help Center
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
                Privacy Policy
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
                Terms of Use
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
              This email was sent by ibendouma. To make sure you receive our
              emails, add support@ibendouma.com to your contact list.
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
};
