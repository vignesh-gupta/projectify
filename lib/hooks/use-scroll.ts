import { useEffect, useRef } from "react";

export const useScroll = (
  behavior?: ScrollBehavior | undefined,
  block?: ScrollLogicalPosition | undefined
) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollIntoView({
      block,
      behavior,
    });
  }, [behavior, block]);

  return scrollRef;
};
