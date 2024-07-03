/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

type ModeContextType = {
  isDarkMode: boolean;
  toogleMode: () => void;
};

type ModeProviderProps = {
  children: React.ReactNode;
};

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: ModeProviderProps) => {
  const { value: isDarkMode, setValue: setIsDarkMode } = useLocalStorageState(
    false,
    "isDarkMode"
  );

  const toogleMode = () => {
    setIsDarkMode((mode) => !mode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <ModeContext.Provider value={{ isDarkMode, toogleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useChangeMode = () => {
  const context = useContext(ModeContext);

  if (!context) throw new Error("ModeContext was used outside of ModeProvider");

  return context;
};
