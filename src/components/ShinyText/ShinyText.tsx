import React, { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 2,
  className = "",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const animationDuration = speed * 1000;

  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    const cycleTime = elapsedRef.current % (animationDuration * (yoyo ? 2 : 1));
    let p = (cycleTime / animationDuration) * 100;

    if (yoyo && p > 100) {
      p = 200 - p;
    }

    progress.set(direction === "left" ? p : 100 - p);
  });

  // Background position control
  const backgroundPosition = useTransform(
    progress,
    (p) => `${150 - p * 2}% center`,
  );

  const gradientStyle: React.CSSProperties = {
    // Yahan hum --text-color ko base rakh rahe hain aur --shine-highlight ko chamak
    backgroundImage: `linear-gradient(${spread}deg, 
      var(--main-text-color) 0%, 
      var(--main-text-color) 35%, 
      var(--shine-highlight) 50%, 
      var(--main-text-color) 65%, 
      var(--main-text-color) 100%)`,
    backgroundSize: "250% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  };

  return (
    <motion.span
      className={className}
      style={{ ...gradientStyle, backgroundPosition }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
