import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";
import { OptionalProperty } from "../types";

type TValue = Omit<OptionalProperty<Doc<"changeLogs">, "_id">, "_creationTime">;

type TModal = {
  isOpen: boolean;
  values?: TValue;
  onOpen: (values?: TValue) => void;
  onClose: () => void;
};

export const useChangelogModal = create<TModal>((set) => {
  return {
    isOpen: false,
    values: undefined,
    onOpen: (values) => set({ isOpen: true, values }),
    onClose: () => set({ isOpen: false, values: undefined }),
  };
});