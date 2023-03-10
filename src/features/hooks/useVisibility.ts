import { useState } from 'react';

export const useVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible((current) => !current);
  };

  return { isVisible, handleVisibility };
};
