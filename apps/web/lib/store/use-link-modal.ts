import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type TValue = Pick<Doc<"links">, "_id" | "title" | "url">;

type TModal = {
  isOpen: boolean;
  values?: TValue;
  onOpen: (values?: TValue) => void;
  onClose: () => void;
};

export const useLinkModal = create<TModal>((set) => {
  return {
    isOpen: false,
    values: undefined,
    onOpen: (values) => set({ isOpen: true, values }),
    onClose: () => set({ isOpen: false, values: undefined }),
  };
});
