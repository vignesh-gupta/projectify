import { Doc } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type TModal = {
  isOpen: boolean;
  values?: Omit<Doc<"feedbacks">, "_creationTime">;
  onOpen: (values?: Omit<Doc<"feedbacks">, "_creationTime">) => void;
  onClose: () => void;
};

export const useFeedbackModal = create<TModal>((set) => {
  return {
    isOpen: false,
    values: undefined,
    onOpen: (values) => set({ isOpen: true, values }),
    onClose: () => set({ isOpen: false, values: undefined }),
  };
});
