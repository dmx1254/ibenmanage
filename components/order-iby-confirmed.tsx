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

            <p
              style={{
                color: "#666666",
                fontSize: "15px",
                lineHeight: "1.5",
                marginTop: "20px",
              }}
            >
              If you have any questions about your payment or need further
              assistance, our support team is available 24/7 at support@2ibn.com
              or via live chat.
            </p>
            <p
              style={{ color: "#666666", fontSize: "15px", lineHeight: "1.5" }}
            >
              Best regards,
              <br />
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
            <p
              style={{ color: "#999999", fontSize: "14px", margin: "0 0 10px" }}
            >
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
          <td
            style={{ textAlign: "center", color: "#999999", fontSize: "12px" }}
          >
            <p>
              This email was sent by 2IBN. To ensure you receive our emails, add
              support@2ibn.com to your contact list.
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
};
