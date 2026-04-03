"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Mode = "creative" | "developer";

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
  setMode: (mode: Mode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("creative");

  useEffect(() => {
    const savedMode = localStorage.getItem("portfolio-mode") as Mode;
    if (savedMode) {
      setModeState(savedMode);
      document.body.setAttribute("data-mode", savedMode);
    } else {
      document.body.setAttribute("data-mode", "creative");
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === "creative" ? "developer" : "creative";
    setModeState(newMode);
    localStorage.setItem("portfolio-mode", newMode);
    document.body.setAttribute("data-mode", newMode);
  };

  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    localStorage.setItem("portfolio-mode", newMode);
    document.body.setAttribute("data-mode", newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}
