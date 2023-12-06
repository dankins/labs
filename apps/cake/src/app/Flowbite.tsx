"use client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

export function Flowbite({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initFlowbite();
  }, []);
  return <>{children}</>;
}
