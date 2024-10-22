import React, { useEffect, useRef } from 'react';

type Props = {
  isLoadingInitial: boolean;
  isLoadingMore: boolean;
  children: React.ReactNode;
  loadMore: () => void;
};

function InfiniteScroll({ isLoadingInitial, isLoadingMore, children, loadMore }: Props) {
  const observerElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && (!isLoadingMore || !isLoadingInitial)) {
          loadMore();
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });

    if (observerElement.current) {
      observer.observe(observerElement.current);
    }

    return () => observer.disconnect();
  }, [isLoadingMore, isLoadingInitial, loadMore]);

  return (
    <>
      {children}
      <div ref={observerElement} id="obs">
      </div>
    </>
  );
}

export default InfiniteScroll;