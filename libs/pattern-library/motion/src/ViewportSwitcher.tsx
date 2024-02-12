"use client";

import { Children, use, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import sticky from "./StickyContainer.module.css";
import { useRef } from "react";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";

export function StickyContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Example conditional logic (adjust threshold as needed)
  const threshold = 0.5; // Represents 50% scroll, adjust based on your needs
  const isScrolledPast = scrollYProgress.get() > threshold;

  return (
    <motion.div
      className={sticky.StickyContainer}
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollYProgress.get() > 0.5 ? 1 : 0 }} // Example of conditional animation based on scroll
    >
      <motion.h1>{isScrolledPast ? "PAST" : "NOT PAST"}</motion.h1>
      <motion.h1>{scrollYProgress}</motion.h1>
      {children}
    </motion.div>
  );
}

export function ViewportSwitcher({ children }: { children: React.ReactNode }) {
  return children;
}

// export function ViewportSwitcher({ children }: { children: React.ReactNode }) {
//   // Assuming a full viewport height for simplicity in calculations
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);

//   function panelUp() {
//     console.log("scroll up", currentIndex);
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   }
//   function panelDown() {
//     console.log("scroll down", currentIndex);
//     if (currentIndex < Children.count(children) - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   }

//   return (
//     <AnimatePresence>
//       {Children.map(children, (child, idx) => (
//         <motion.div
//           className="w-full h-full"
//           ref={containerRef}
//           initial={{ opacity: 0, scale: 1 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0, scale: 0 }}
//         >
//           {child}
//         </motion.div>
//       ))}
//     </AnimatePresence>
//   );
// }

// export function ViewportSwitcher({ children }: { children: React.ReactNode }) {
//   // Assuming a full viewport height for simplicity in calculations
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);

//   function panelUp() {
//     console.log("scroll up", currentIndex);
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   }
//   function panelDown() {
//     console.log("scroll down", currentIndex);
//     if (currentIndex < Children.count(children) - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   }

//   return (
//     <ReactScrollWheelHandler
//       upHandler={panelUp}
//       downHandler={panelDown}
//       className="w-full h-full"
//       wheelConfig={[7, 50, 0.05, 0]}
//     >
//       <AnimatePresence>
//         {" "}
//         {Children.map(children, (child, idx) =>
//           idx === currentIndex ? (
//             <motion.div
//               className="w-full h-full"
//               ref={containerRef}
//               initial={{ opacity: 0, scale: 1 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0, scale: 0 }}
//             >
//               {child}
//             </motion.div>
//           ) : undefined
//         )}
//       </AnimatePresence>
//     </ReactScrollWheelHandler>
//   );
// }
