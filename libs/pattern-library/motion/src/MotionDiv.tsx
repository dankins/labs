"use client";
import { motion } from "framer-motion";

// TODO(dankins): hack to get around "use client" issue
// details here: https://github.com/framer/motion/issues/2054
export const MotionDiv = motion.div;
