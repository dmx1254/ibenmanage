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
                Your transaction has been completed and your items have been delivered to your account.
              </p>
            </div>

            {/* Order Details */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#666666", fontSize: "15px", lineHeight: "1.5" }}>
                <strong>Order Number:</strong> {orderNum}
              </p>
              <p style={{ color: "#666666", fontSize: "15px", lineHeight: "1.5" }}>
                <strong>Product/Service:</strong> Dofus
              </p>
              <p style={{ color: "#666666", fontSize: "15px", lineHeight: "1.5" }}>
                <strong>Total Amount:</strong> {formatCurrency(totalPrice, cur)}
              </p>
              <p style={{ color: "#666666", fontSize: "15px", lineHeight: "1.5" }}>
                <strong>Delivery Date:</strong> {formatDate(dateDelivered)}
              </p>
              <p style={{ color: "#666666", fontSize: "15px", lineHeight: "1.5" }}>
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
              <p style={{ color: "#666666", fontSize: "16px", lineHeight: "1.5" }}>
                Thank you for choosing 2IBN for your gaming needs! You can check your order history and details here:
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
                  href="https://2ibn.vercel.app/profile"
                  style={{
                    color: "#d97706",
                    textDecoration: "none",
                  }}
                >
                  Website
                </a>
              </span>
            </div>
            
            <p style={{ color: "#666666", fontSize: "15px", lineHeight: "1.5", marginTop: "20px" }}>
              If you have any questions about your delivery or need further assistance, our support team is available 24/7 at support@2ibn.com or via live chat.
            </p>
            <p style={{ color: "#666666", fontSize: "15px", lineHeight: "1.5" }}>
              Best regards,<br />
              The 2ibn Team
            </p>
          </td>
        </tr>

        {/* Footer */}
        <tr>
          <td
            style={{
              padding: "30px",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#999999", fontSize: "14px", margin: "0 0 10px" }}>
              © 2024 JBK Services INTERNATIONAL FZ-LLC. All rights reserved.
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
                Website
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
                Kamas Exchange
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
                Sell Your Kamas
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
          <td style={{ textAlign: "center", color: "#999999", fontSize: "12px" }}>
            <p>This email was sent by 2IBN. To ensure you receive our emails, add support@2ibn.com to your contact list.</p>
          </td>
        </tr>
      </table>
    </div>
  );
};