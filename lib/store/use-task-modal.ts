import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type TModalProvider = {
  isOpen: boolean;
  values: Partial<Doc<"workItems">>;
  onOpen: (values: Partial<Doc<"workItems">>) => void;
  onClose: () => void;
};

export const useTaskModal = create<TModalProvider>((set) => {
  return {
    isOpen: false,
    values: {},
    onOpen: (values) => set({ isOpen: true, values }),
    onClose: () => set({ isOpen: false, values: {} }),
  };
});
