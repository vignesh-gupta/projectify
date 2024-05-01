import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type TModalProvider = {
  isOpen: boolean;
  values?: Omit<Doc<"workItems">, "_creationTime">;
  onOpen: (values?: Omit<Doc<"workItems">, "_creationTime">) => void;
  onClose: () => void;
};

export const useTaskModal = create<TModalProvider>((set) => {
  return {
    isOpen: false,
    values: undefined,
    onOpen: (values) => set({ isOpen: true, values }),
    onClose: () => set({ isOpen: false, values: undefined }),
  };
});
