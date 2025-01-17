import React, { useState } from "react";
import {
  Search,
  FileText,
  Download,
  Calendar,
  History,
  X,
  Settings2,
} from "lucide-react";
import Prescription from "./Prescription";
import MedicalHistory from "./MedicaleHistory";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  color,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`
        flex items-center justify-center
        w-12 h-12
        rounded-full
        shadow-lg
        text-white
        transition-all
        duration-300
        hover:scale-110
        focus:outline-none
        focus:ring-4
        focus:ring-opacity-50
        relative
        group
      `}
      style={{ backgroundColor: color }}
      onClick={onClick && onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {React.cloneElement(icon as React.ReactElement, {
          className: `w-6 h-6 transition-transform duration-300 ${
            isHovered ? "scale-110" : ""
          }`,
        })}
      </div>
      <span className="absolute right-14 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </button>
  );
};

const FloatingActionButtons = ({ onOpen }: { onOpen: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [prescriptionOpen, setPrescriptionOpen] = useState(false);

  const handlePrescriptionOpen = () => {
    setPrescriptionOpen(true);
  };
  const handlePrescriptionClose = () => {
    setPrescriptionOpen(false);
  };

  const buttons = [
    {
      icon: <Search />,
      label: "Rechercher un patient",
      color: "#10B981",
      onClick: onOpen,
    },
    {
      icon: (
        <Prescription
          open={prescriptionOpen}
          handlePrescriptionOpen={handlePrescriptionOpen}
          handlePrescriptionClose={handlePrescriptionClose}
          setPrescriptionOpen={setPrescriptionOpen}
        />
      ),
      label: "Nouvelle ordonnance",
      color: "#3B82F6",
    },
    {
      icon: <Download />,
      label: "Télécharger la fiche",
      color: "#8B5CF6",
      onClick: () => console.log("Download"),
    },
    {
      icon: <Calendar />,
      label: "Planifier un rendez-vous",
      color: "#EC4899",
      onClick: () => console.log("Schedule"),
    },
    {
      icon: <MedicalHistory />,
      label: "Historique médical",
      color: "#F59E0B",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col-reverse gap-4">
      {isExpanded && (
        <div className="flex flex-col-reverse gap-3 transition-all duration-300">
          {buttons.map((button, index) => (
            <ActionButton
              key={index}
              icon={button.icon}
              label={button.label}
              color={button.color}
              onClick={button.onClick}
            />
          ))}
        </div>
      )}
      <button
        className={`
          flex items-center justify-center
          w-14 h-14
          bg-gray-800
          text-white
          rounded-full
          shadow-2xl
          hover:bg-gray-700
          transition-all
          duration-300
          focus:outline-none
          focus:ring-4
          focus:ring-gray-600
          focus:ring-opacity-50
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <X className="w-8 h-8 transition-transform duration-300" />
        ) : (
          <Settings2 className="w-8 h-8 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};

export default FloatingActionButtons;
