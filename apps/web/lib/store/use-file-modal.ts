import { Doc } from "@repo/backend/convex/_generated/dataModel";
import { create } from "zustand";

type TValue = Pick<Doc<"files">, "_id" | "title">;

type TModal = {
  isOpen: boolean;
  values?: TValue;
 // eslint-disable-next-line no-unused-vars
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
