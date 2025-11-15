import { useEffect, useRef, useState } from "react";

type FadeOnScrollProps = {
  children: React.ReactNode;
  clipLine?: number; // distance from top where the "invisible line" is
};

export default function FadeOnScroll({ children, clipLine = 200 }: FadeOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState<string>("inset(0px 0px 0px 0px)");

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const top = rect.top;

      if (top > clipLine) {
        setClip("inset(0px 0px 0px 0px)"); // fully visible
      } else if (top + rect.height < clipLine) {
        setClip(`inset(${rect.height}px 0px 0px 0px)`); // fully hidden
      } else {
        const hiddenHeight = clipLine - top;
        setClip(`inset(${hiddenHeight}px 0px 0px 0px)`); // partially hidden
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [clipLine]);

  return (
    <div ref={ref} style={{ clipPath: clip, WebkitClipPath: clip }}>
      {children}
    </div>
  );
}
