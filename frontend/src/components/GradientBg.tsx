"use client";
import React from "react";
import { FloatingDots } from "./floating-dots";

const GradientBg = () => {

  return (
  <div className="fixed inset-0 -z-10 w-full h-screen bg-[#050505] overflow-hidden">
  <FloatingDots
    className="w-full"
    maxRadius={0.5}
    maxSpeed={0.8}
    minSpeed={0.1}
    color="white"
  />
  <div
    className="absolute inset-0 transform-gpu overflow-hidden blur-3xl flex items-center justify-center"
    aria-hidden="true"
  >
    <div
      className="relative aspect-[1155/678] w-[100rem]
        bg-gradient-to-tr from-white to-white opacity-25 rotate-[25deg]"
      style={{
                    background: "linear-gradient(to top right, #d5d5ffff, #9a9af7ff)",

        clipPath:
          "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
      }}
    />
  </div>
</div>

  );
};

export default GradientBg;