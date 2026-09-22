import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface MotionContextType {
  reduced: boolean;
  paused: boolean;
  toggle: () => void;
}

const MotionContext = createContext<MotionContextType>({
  reduced: false,
  paused: false,
  toggle: () => {}
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const [systemReduced, setSystemReduced] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setSystemReduced(q.matches);
    change();
    q.addEventListener('change', change);
    return () => q.removeEventListener('change', change);
  }, []);

  const reduced = systemReduced || paused;

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduced);
    return () => document.documentElement.classList.remove('reduce-motion');
  }, [reduced]);

  return (
    <MotionContext.Provider value={{ reduced, paused, toggle: () => setPaused(p => !p) }}>
      {children}
    </MotionContext.Provider>
  );
}

export const useMotion = () => useContext(MotionContext);

export default MotionProvider;
