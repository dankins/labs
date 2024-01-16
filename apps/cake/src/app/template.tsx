"use client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initFlowbite();
  }, []);
  return <>{children}</>;
}
