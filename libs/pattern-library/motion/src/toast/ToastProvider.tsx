"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

export type ToastContextType = {
  addToast(config: Partial<ToastConfig> | string): void;
};

// @ts-ignore
export const ToastContext = React.createContext<ToastContextType>();

type ToastMap = { [key: string]: ToastConfig };
export type ToastConfig = {
  id: string;
  message: string;
  displayForSeconds: number;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMap>({});

  const value = useMemo(() => {
    return {
      addToast(config: Partial<ToastConfig> | string) {
        let toast: ToastConfig = {
          id: uuid(),
          message: "Pop!",
          displayForSeconds: 2,
        };
        if (typeof config === "string") {
          toast.message = config;
        } else {
          toast = { ...toast, ...config };
        }

        setToasts((currentToasts) => ({ ...currentToasts, [toast.id]: toast }));
        setTimeout(() => {
          setToasts((currentToasts) => {
            const { [toast.id]: deleteThis, ...newToasts } = currentToasts;
            return newToasts;
          });
        }, toast.displayForSeconds * 1000);
      },
    };
  }, [toasts, setToasts]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster toasts={toasts} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ config }: { config: ToastConfig }) {
  return (
    <motion.div
      key={config.id}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0, transition: { duration: 0.6 } }}
      className="p-3 m-3 bg-white rounded-xl shadow text-black text-xs"
    >
      {config.message}
    </motion.div>
  );
}

export function Toaster({ toasts }: { toasts: ToastMap }) {
  return (
    <div className="fixed bottom-0 right-0 z-[1001]">
      <AnimatePresence>
        {Object.keys(toasts).map((id, idx) => (
          <ToastContainer key={idx} config={toasts[id]} />
        ))}
      </AnimatePresence>
    </div>
  );
}
