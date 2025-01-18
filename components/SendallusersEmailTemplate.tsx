import * as React from "react";
import { parsedDevise } from "@/lib/utils";

interface OrderDeliveryTemplateProps {
  message: string;
}

export const SendallusersEmailTemplate: React.FC<
  OrderDeliveryTemplateProps
> = ({ message }) => {
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
                src="https://ibendouma.vercel.app/ibennewapp-logo.png"
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
                {message} 🎉
              </p>
            </div>

            <div>
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
                  href="https://ibendouma.vercel.app/profile"
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
              If you have any questions about your delivery or need further
              assistance, our support team is available 24/7 at
              support@ibendouma.com or via live chat.
            </p>
            <p
              style={{ color: "#666666", fontSize: "15px", lineHeight: "1.5" }}
            >
              Best regards,
              <br />
              The ibendouma Team
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
                href="https://ibendouma.com"
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
                href="https://ibendouma.com/echange-de-kamas"
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
                href="https://ibendouma.com/vendre-des-kamas"
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
              This email was sent by ibendouma. To ensure you receive our
              emails, add support@ibendouma.com to your contact list.
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default SendallusersEmailTemplate;
