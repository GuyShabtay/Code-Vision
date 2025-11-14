import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type FadeOnScrollProps = {
  children: React.ReactNode;
  fadeStart?: number; // distance from top to start fading
  fadeEnd?: number;   // distance from top to fully disappear
};

export default function FadeOnScroll({ children, fadeStart = 50, fadeEnd = 0 }: FadeOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top;

      if (top > fadeStart) setOpacity(1);
      else if (top < fadeEnd) setOpacity(0);
      else setOpacity((top - fadeEnd) / (fadeStart - fadeEnd));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fadeStart, fadeEnd]);

  return (
    <motion.div ref={ref} style={{ opacity }}>
      {children}
    </motion.div>
  );
}
