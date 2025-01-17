import * as React from "react";

interface EmailTemplateProps {
  codeVerification: string;
  userName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  codeVerification,
  userName,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      color: "#333",
    }}
  >
    <h1 style={{ color: "#4CAF50" }}>Bienvenue, {userName}!</h1>
    <p style={{ fontSize: "16px" }}>
      Merci de vous être inscrit sur notre plateforme.
      <br />
      Pour compléter votre inscription, veuillez vérifier votre adresse email en
      utilisant le code ci-dessous :
    </p>

    <div
      style={{
        padding: "10px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        display: "inline-block",
        marginTop: "10px",
        marginBottom: "20px",
      }}
    >
      <strong style={{ fontSize: "1.2em", color: "#555" }}>
        {codeVerification}
      </strong>
    </div>
    <p style={{ fontSize: "16px" }}>
      Si vous n'avez pas demandé cette vérification, veuillez ignorer cet email.
    </p>
    <p style={{ fontSize: "16px" }}>
      Cordialement,
      <br />
      L'équipe de Medicalecare
    </p>
    <footer style={{ marginTop: "20px", fontSize: "1.2em", color: "#888" }}>
      <p>© 2024 Medicalecare. Tous droits réservés.</p>
      <p>
        Si vous avez des questions, n'hésitez pas à nous contacter à
        <a
          href="mailto:medicalecare@gmail.com"
          style={{ color: "#4CAF50", textDecoration: "none" }}
        >
          {" "}
          medicalecare@gmail.com
        </a>
        .
      </p>
    </footer>
  </div>
);
