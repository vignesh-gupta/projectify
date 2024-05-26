import { useEffect, useRef } from "react";

export const useScroll = (
  behavior?: ScrollBehavior | undefined,
  block?: ScrollLogicalPosition | undefined,
  dependencies: any[] = []
) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollIntoView({
      block,
      behavior,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [behavior, block, ...dependencies]);

  return scrollRef;
};
