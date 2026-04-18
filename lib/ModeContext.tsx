"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

type Mode = "creative" | "developer";

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
  setMode: (mode: Mode) => void;
  isTransitioning: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);
const MODE_STORAGE_KEY = "portfolio-mode";
const MODE_CHANGE_EVENT = "portfolio-mode-change";

function readMode(): Mode {
  if (typeof window === "undefined") {
    return "creative";
  }

  return localStorage.getItem(MODE_STORAGE_KEY) === "developer"
    ? "developer"
    : "creative";
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === MODE_STORAGE_KEY) {
      onStoreChange();
    }
  };

  const handleModeChange = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(MODE_CHANGE_EVENT, handleModeChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(MODE_CHANGE_EVENT, handleModeChange);
  };
}

function setStoredMode(mode: Mode) {
  localStorage.setItem(MODE_STORAGE_KEY, mode);
  window.dispatchEvent(new Event(MODE_CHANGE_EVENT));
}

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const mode = useSyncExternalStore<Mode>(subscribe, readMode, () => "creative");
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  useEffect(() => {
    document.body.setAttribute("data-mode", mode);
  }, [mode]);

  const triggerTransition = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 500); // Wait for transition to finish
  };

  const toggleMode = () => {
    triggerTransition();
    const newMode = mode === "creative" ? "developer" : "creative";
    setStoredMode(newMode);
  };

  const setMode = (newMode: Mode) => {
    if (newMode !== mode) {
      triggerTransition();
      setStoredMode(newMode);
    }
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode, setMode, isTransitioning }}>
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
