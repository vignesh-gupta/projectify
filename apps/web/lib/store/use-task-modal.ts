import { Doc } from "@repo/backend/convex/_generated/dataModel";
import { create } from "zustand";
import { OptionalProperty } from "../types";

type TValue = Omit<OptionalProperty<Doc<"workItems">, "_id">, "_creationTime">;

type TModalProvider = {
  isOpen: boolean;
  values?: TValue;
 // eslint-disable-next-line no-unused-vars
  onOpen: (values?: TValue) => void;
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
