"use client";
import { AnimationProps, LayoutGroup, motion } from "framer-motion";

export type AnimatedLogoProps = {
  repeat?: boolean;
};
export function AnimatedLogo({
  repeat,
  ...rest
}: AnimatedLogoProps & React.ComponentProps<(typeof motion)["svg"]>) {
  const flaskStroke = "#ecf1f1";
  const colors = ["#fafa6e", "#92dc7e", "#39b48e"];
  const duration = 4;
  const repeatDelay = 2;
  const numberOfCircles = 9.0;

  const circleAnimations = Array<Partial<AnimationProps> | unknown>(
    numberOfCircles
  )
    .fill(-1)
    .map((_, idx) => ({
      initial: { opacity: 0 },
      animate: { opacity: [0, 0, 1, 1] },
      transition: {
        duration,
        repeat: repeat ? Infinity : undefined,
        repeatType: "loop",
        repeatDelay,
        times: [0, 0.5 + idx * 0.05, 0.5 + idx * 0.05 + 0.1, 1],
      } as const,
    }));

  return (
    <LayoutGroup>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...rest}
        viewBox="0 0 114.854 140.76"
      >
        <defs>
          <linearGradient id="flaskGradient">
            <stop
              offset={0}
              style={{
                stopColor: colors[0],
                stopOpacity: 1,
              }}
            />
            <stop
              offset={0.759}
              style={{
                stopColor: colors[2],
                stopOpacity: 1,
              }}
            />
          </linearGradient>
        </defs>
        <g>
          <motion.path
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{
              pathLength: [0, 1.01, 1.01, 1.01],
              fillOpacity: [0, 0.05, 0.75, 1],
            }}
            transition={{
              duration,
              ease: "easeInOut",
              repeat: repeat ? Infinity : undefined,
              repeatType: "loop",
              repeatDelay,
              times: [0, 0.25, 0.5, 1],
            }}
            stroke={flaskStroke}
            strokeDasharray="0 1"
            strokeWidth={4}
            strokeOpacity={1}
            fill="url(#flaskGradient)"
            d="M21.266 68.525c4.467 4.828 8.703 9.72 11.947 15.376 3.749 6.533 6.02 13.49 5.59 21.111-.324 5.769-2.382 10.858-6.022 15.426-4.604 5.777-10.54 8.981-17.74 9.991-1.823.256-3.693.238-5.541.24-7.055.008-14.114.134-21.162-.088-7.606-.24-13.875-3.581-18.86-9.252-5.44-6.19-7.202-13.534-6.443-21.61.908-9.668 5.584-17.563 11.726-24.724 3.326-3.878 6.883-7.556 10.267-11.386 3.53-3.994 5.545-8.692 5.636-14.028.13-7.618.033-15.24.033-22.981-.59 0-1.147.01-1.703-.002-1.456-.03-2.3-.755-2.307-1.966-.007-1.21 2.11-.905 3.612-.91 5.07-.018 8.848-.006 13.919-.008 2.822-.002 5.723-.092 8.545-.09 1.402 0 2.4-.04 2.368 1.102-.036 1.307-.782 1.878-2.463 1.882H11c-.011.253-.03.454-.029.655.01 7.187.005 14.375.034 21.562.025 6.413 2.583 11.75 7.004 16.282 1.077 1.104 2.13 2.233 3.258 3.419"
            transform="translate(59.452 8.048)"
          />
        </g>
        <g>
          <motion.path
            d="M100.205 39.748c-2.275.796-4.143.414-5.375-1.075-1.245-1.505-1.423-3.188-.64-4.956.72-1.628 2.54-2.656 4.385-2.556 1.821.099 3.481 1.498 3.963 3.34.556 2.12-.163 3.79-2.333 5.247z"
            fill={colors[1]}
            transform="translate(-33.642 -20.937)"
            initial={circleAnimations[0].initial}
            animate={circleAnimations[0].animate}
            transition={circleAnimations[0].transition}
          />
          <motion.path
            d="M76.969 32.906c-3.034 1.063-5.525.553-7.167-1.433-1.66-2.006-1.898-4.25-.855-6.607.961-2.17 3.388-3.542 5.849-3.408 2.427.131 4.64 1.996 5.284 4.452.74 2.828-.218 5.055-3.111 6.996z"
            fill={colors[1]}
            transform="translate(-33.642 -20.937)"
            initial={circleAnimations[1].initial}
            animate={circleAnimations[1].animate}
            transition={circleAnimations[1].transition}
          />
          <motion.path
            d="M145.983 109.051c-2.275.797-4.143.415-5.375-1.075-1.245-1.505-1.423-3.188-.64-4.955.72-1.628 2.54-2.657 4.386-2.557 1.82.1 3.48 1.498 3.963 3.34.555 2.12-.164 3.79-2.334 5.247z"
            fill={colors[2]}
            transform="translate(-33.642 -20.937)"
            initial={circleAnimations[4].initial}
            animate={circleAnimations[4].animate}
            transition={circleAnimations[4].transition}
          />
          <motion.path
            d="M131.07 87.948c-4.3 1.505-7.827.783-10.154-2.03-2.351-2.843-2.688-6.022-1.21-9.361 1.36-3.075 4.798-5.018 8.285-4.828 3.439.186 6.575 2.829 7.486 6.308 1.048 4.006-.31 7.16-4.408 9.91z"
            fill={colors[2]}
            transform="translate(-33.642 -20.937)"
            initial={circleAnimations[3].initial}
            animate={circleAnimations[3].animate}
            transition={circleAnimations[3].transition}
          />
          <motion.path
            d="M126.475 59.789c-2.276.797-4.144.415-5.376-1.075-1.244-1.505-1.423-3.188-.64-4.955.72-1.628 2.54-2.657 4.386-2.557 1.82.1 3.48 1.498 3.963 3.34.555 2.12-.164 3.79-2.333 5.247z"
            fill={colors[1]}
            transform="translate(-33.642 -20.937)"
            initial={circleAnimations[2].initial}
            animate={circleAnimations[2].animate}
            transition={circleAnimations[2].transition}
          />
          <motion.path
            d="M123.272 28.576c-2.022.708-3.683.368-4.778-.956-1.106-1.337-1.265-2.833-.57-4.405.641-1.447 2.26-2.36 3.9-2.272 1.618.088 3.094 1.332 3.522 2.969.494 1.885-.145 3.37-2.074 4.664z"
            fill={colors[1]}
            transform="translate(-33.642 -20.937)"
            initial={circleAnimations[5].initial}
            animate={circleAnimations[5].animate}
            transition={circleAnimations[5].transition}
          />
          <motion.path
            d="M58.087 63.934c-4.906 1.717-8.934.893-11.59-2.318-2.684-3.243-3.069-6.871-1.382-10.682 1.554-3.51 5.478-5.726 9.458-5.51 3.926.212 7.506 3.228 8.546 7.199 1.197 4.571-.353 8.171-5.032 11.31z"
            fill={colors[0]}
            transform="translate(-33.642 -20.937)"
            initial={circleAnimations[6].initial}
            animate={circleAnimations[6].animate}
            transition={circleAnimations[6].transition}
          />
          <motion.path
            d="M51.6 88.994c-2.945 1.031-5.362.537-6.956-1.39-1.61-1.948-1.841-4.125-.829-6.413.933-2.106 3.288-3.437 5.676-3.307 2.356.128 4.504 1.938 5.128 4.321.719 2.744-.211 4.905-3.019 6.79z"
            fill={colors[0]}
            transform="translate(-33.642 -20.937)"
            initial={circleAnimations[7].initial}
            animate={circleAnimations[7].animate}
            transition={circleAnimations[7].transition}
          />
          <motion.path
            d="M39.236 116.297c-1.962.687-3.573.357-4.635-.927-1.074-1.298-1.227-2.75-.553-4.274.622-1.404 2.19-2.291 3.782-2.205 1.57.085 3.002 1.292 3.418 2.88.478 1.83-.141 3.27-2.012 4.526z"
            fill={colors[0]}
            transform="translate(-33.642 -20.937)"
            initial={circleAnimations[8].initial}
            animate={circleAnimations[8].animate}
            transition={circleAnimations[8].transition}
          />
        </g>
      </motion.svg>
    </LayoutGroup>
  );
}
