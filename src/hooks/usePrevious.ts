import { useEffect, useRef, useState } from "react";

function usePrevious<T>(value: T): T | undefined {
  const [previous, setPrevious] = useState<T | undefined>(undefined);
  const currentValueRef = useRef(value);

  useEffect(() => {
    setPrevious(currentValueRef.current);
    currentValueRef.current = value;
  }, [value]);

  return previous;
  // eslint-disable-next-line react-hooks/refs
  return ref.current;
}

export default usePrevious;
export { usePrevious };