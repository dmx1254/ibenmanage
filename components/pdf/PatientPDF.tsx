import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Patient } from "@/types";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#f8f9fa",
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: "1px solid #e5e7eb",
  },
  heading: {
    fontSize: 22,
    marginBottom: 20,
    color: "#111827",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  label: {
    fontSize: 12,
    color: "#0D2A1F",
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: "#111827",
    marginBottom: 8,
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#24AE7C",
    marginBottom: 10,
    borderBottom: "1px solid #24AE7C",
    paddingBottom: 4,
  },
});

const PatientPDF = ({ patient }: { patient: Patient }) => (
  <Document>
    <Page style={styles.page}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image style={styles.logo} src="/assets/icons/logo-f.png" />
          <Text style={{ fontSize: "13px", fontWeight: "normal" }}>
            MedicaleCare
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Instut de Fann</Text>
          <Text
            style={{
              fontSize: "12px",
              fontWeight: "normal",
              fontStyle: "italic",
            }}
          >
            Dakar, fann 12 rue de la gendarmerie
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.heading}>Fiche Patient</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations Personnelles</Text>
        <Text style={styles.label}>Prénom et Nom:</Text>
        <Text style={styles.value}>{patient.name || "N/A"}</Text>

        <Text style={styles.label}>Date de Naissance:</Text>
        <Text style={styles.value}>
          {new Date(patient.birthDate).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) || "N/A"}
        </Text>

        <Text style={styles.label}>Adresse:</Text>
        <Text style={styles.value}>{patient.address || "N/A"}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{patient.email || "N/A"}</Text>

        <Text style={styles.label}>Téléphone:</Text>
        <Text style={styles.value}>{patient.phone || "N/A"}</Text>

        <Text style={styles.label}>Occupation:</Text>
        <Text style={styles.value}>{patient.occupation || "N/A"}</Text>

        <Text style={styles.label}>Genre:</Text>
        <Text style={styles.value}>{patient.gender || "N/A"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations Médicales</Text>
        <Text style={styles.label}>Médecin Principal:</Text>
        <Text style={styles.value}>{patient.primaryPhysician || "N/A"}</Text>
        <Text style={styles.label}>Groupe Sanguin:</Text>
        <Text style={styles.value}>{patient.bloodgroup || "N/A"}</Text>

        <Text style={styles.label}>Allergies:</Text>
        <Text style={styles.value}>{patient.allergies || "N/A"}</Text>

        <Text style={styles.label}>Historique Médical Familial:</Text>
        <Text style={styles.value}>
          {patient.familyMedicalHistory || "N/A"}
        </Text>

        <Text style={styles.label}>Historique Médical Passé:</Text>
        <Text style={styles.value}>{patient.pastMedicalHistory || "N/A"}</Text>

        <Text style={styles.label}>Médicaments Actuels:</Text>
        <Text style={styles.value}>{patient.currentMedication || "N/A"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact d'Urgence</Text>
        <Text style={styles.label}>Nom du Contact d'Urgence:</Text>
        <Text style={styles.value}>
          {patient.emergencyContactName || "N/A"}
        </Text>

        <Text style={styles.label}>Numéro du Contact d'Urgence:</Text>
        <Text style={styles.value}>
          {patient.emergencyContactNumber || "N/A"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assurance</Text>
        <Text style={styles.label}>Fournisseur d'Assurance:</Text>
        <Text style={styles.value}>{patient.insuranceProvider || "N/A"}</Text>

        <Text style={styles.label}>Numéro de Police d'Assurance:</Text>
        <Text style={styles.value}>
          {patient.insurancePolicyNumber || "N/A"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Autres Informations</Text>
        <Text style={styles.label}>Type d'Identification:</Text>
        <Text style={styles.value}>{patient.identificationType || "N/A"}</Text>
        <Text style={styles.label}>Numéro d'Identification:</Text>
        <Text style={styles.value}>
          {patient.identificationNumber || "N/A"}
        </Text>
      </View>
    </Page>
  </Document>
);

export default PatientPDF;
