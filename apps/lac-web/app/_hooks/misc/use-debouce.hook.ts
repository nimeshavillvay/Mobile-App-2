import { useEffect, useState } from "react";

/**
 * Get a delayed state
 */
const useDebounce = <T>(value: T, delay = 500) => {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return delayedValue;
};

export default useDebounce;
