import { useRef, useEffect } from "react";

// Generic T with explicit return type T | undefined
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // eslint-disable-next-line react-hooks/refs
  return ref.current;
}

export default usePrevious;
export { usePrevious };