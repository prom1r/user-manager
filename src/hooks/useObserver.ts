import { useEffect, useCallback } from "react";

interface UseObserverProps {
  targetRef: React.RefObject<HTMLElement>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

/**
 * A custom React hook that observes a target element and triggers fetching the next page
 * when the target becomes visible, enabling infinite scrolling behavior.
 *
 * @param {Object} params - The hook parameters
 * @param {React.RefObject} params.targetRef - Reference to the target element to observe
 * @param {boolean} params.hasNextPage - Flag indicating if there are more pages to fetch
 * @param {boolean} params.isFetchingNextPage - Flag indicating if a page fetch is in progress
 * @param {function} params.fetchNextPage - Function to call when fetching the next page
 */
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
