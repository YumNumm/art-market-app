"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function BackgroundNoise() {
  const [noise, setNoise] = useState({ x: 0, y: 0, z: 0 });
  useEffect(() => {
    setNoise({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
    });
  }, []);
  const { theme } = useTheme();
  const isDark = theme == "dark";
  const color = isDark ? "dimgray" : "lightgray";

  return (
    <svg
      className="fixed w-full h-full opacity-70"
      style={{
        backgroundImage: `radial-gradient(circle at 12.5px 10px, ${color} 3%, transparent 0%), radial-gradient(circle at 37.5px 37.5px, ${color} 3%, transparent 0%)`,
        backgroundSize: "50px 50px",
      }}
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={(noise.x * 3 + 1) / 1000}
          result="fractalNoise"
        />
        <feColorMatrix
          type="matrix"
          values={`
                0   0   0   0   ${noise.y * 0.3 + 0.1}
                0   0   0   0   ${noise.z * 0.3 + 0.1}
                0   0   0   0   1
                0   0   0   1   0
                `}
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)"></rect>
    </svg>
  );
}
