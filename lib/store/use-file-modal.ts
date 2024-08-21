import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type TValue = Pick<Doc<"files">, "_id" | "title">;

type TModal = {
  isOpen: boolean;
  values?: TValue;
  onOpen: (values?: TValue) => void;
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
