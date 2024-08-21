import { useEffect } from "react";
import { toast } from "sonner";

export const useConstructions = (text: "page" | "area" | "feature") => {
  return useEffect(() => {
    toast.warning(`🚧 This ${text} is under construction`);
  }, [text]);
};
