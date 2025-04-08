import { useEffect, useCallback } from "react";

interface UseObserverProps {
  targetRef: React.RefObject<HTMLElement>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const useObserver = ({
  targetRef,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseObserverProps) => {
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px 200px 0px",
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [targetRef, handleObserver]);
};

export default useObserver;
