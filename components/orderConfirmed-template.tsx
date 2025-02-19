import * as React from "react";
import { parsedDevise } from "@/lib/utils";

interface Product {
  productId: string;
  category: string;
  server: string;
  qty: number;
  amount: number;
  price: number;
  character: string;
  totalPrice: number;
}

interface OrderDeliveryTemplateProps {
  lastname: string;
  firstname: string;
  cur: string;
  totalPrice: number;
  orderNum: string;
  dateDelivered: Date;
  products: Product[];
}

export const OrderDeliveryTemplate: React.FC<OrderDeliveryTemplateProps> = ({
  lastname,
  firstname,
  cur,
  totalPrice,
  orderNum,
  dateDelivered,
  products,
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
              Hi {`${firstname} ${lastname}`}
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
                Great news! Your order has been successfully delivered! 🎉
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666666",
                }}
              >
                Your transaction has been completed and your items have been
                delivered to your account.
              </p>
            </div>

            {/* Order Details */}
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Order Number:</strong> {orderNum}
              </p>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Product/Service:</strong> Dofus
              </p>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Total Amount:</strong> {formatCurrency(totalPrice, cur)}
              </p>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Delivery Date:</strong> {formatDate(dateDelivered)}
              </p>
              <p
                style={{
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                <strong>Status:</strong>{" "}
                <span style={{ color: "#22c55e" }}>Delivered ✓</span>
              </p>
            </div>

            {/* Product Table */}
            <table
              width="100%"
              style={{
                borderCollapse: "collapse",
                marginBottom: "20px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: "#f2f2f2",
                      textAlign: "left",
                    }}
                  >
                    Product
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: "#f2f2f2",
                      textAlign: "left",
                    }}
                  >
                    Server
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: "#f2f2f2",
                      textAlign: "right",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: "#f2f2f2",
                      textAlign: "right",
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: "#f2f2f2",
                      textAlign: "right",
                    }}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color: "#666666",
                      }}
                    >
                      {product.category} - {product.character}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color: "#666666",
                      }}
                    >
                      {product.server}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color: "#666666",
                        textAlign: "right",
                      }}
                    >
                      {product.amount}M
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color: "#666666",
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(product.price, cur)}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color: "#666666",
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(product.totalPrice, cur)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    Total Amount
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    {formatCurrency(totalPrice, cur)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div>
              <p
                style={{
                  color: "#666666",
                  fontSize: "16px",
                  lineHeight: "1.5",
                }}
              >
                Thank you for choosing ibendouma for your gaming needs! You can
                check your order history and details here:
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
              Si vous avez des questions sur votre livraison ou si vous avez
              besoin d'aide supplémentaire, notre équipe d'assistance est
              disponible 24h/24 et 7j/7 à support@ibendouma.com ou via chat en
              direct.
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
              Cet email a été envoyé par ibendouma. Pour être sûr de recevoir
              nos e-mails, ajoutez support@ibendouma.com à votre liste de
              contacts.
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
};
