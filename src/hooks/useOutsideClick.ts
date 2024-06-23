import { useEffect, useRef } from "react";

export const useOutsideClick = (
  handler: () => void,
  listenCapturing = true
) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (
        ref.current &&
        !(ref.current as Element).contains(e.target as HTMLElement)
      ) {
        handler();
      }
    };

    document.addEventListener(
      "click",
      handleClick as unknown as EventListenerOrEventListenerObject,
      listenCapturing
    );

    return () =>
      document.removeEventListener(
        "click",
        handleClick as unknown as EventListenerOrEventListenerObject,
        listenCapturing
      );
  }, [handler, listenCapturing]);

  return ref;
};
