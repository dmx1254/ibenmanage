// store/notificationStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Patient } from "@/types";

// Interface pour le store
interface MyPatient {
  patient: Patient | null;
  addPatient: (patient: Patient) => void;
}

type CombineState = MyPatient;

// Créez le store Zustand
const myStore = create<CombineState>()(
  persist(
    (set) => ({
      patient: null,
      addPatient: (patient) => set({ patient: patient }),
    }),
    {
      name: "medicale-dash",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default myStore;
