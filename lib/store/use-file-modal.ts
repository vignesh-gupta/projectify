import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type TModal = {
  isOpen: boolean;
  values?: Omit<Doc<"files">, "_creationTime">;
  onOpen: (values?: Omit<Doc<"files">, "_creationTime">) => void;
  onClose: () => void;
};

export const useFileModal = create<TModal>((set) => {
  return {
    isOpen: false,
    values: undefined,
    onOpen: (values) => set({ isOpen: true, values }),
    onClose: () => set({ isOpen: false, values: undefined }),
  };
});
