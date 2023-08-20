"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function BackgroundNoise() {
  const [noise, setNoise] = useState([0, 0, 0]);
  useEffect(() => {
    setNoise([Math.random(), Math.random(), Math.random()]);
  }, []);
  const { theme } = useTheme();
  const isDark = theme == "dark";
  console.log(theme);

  return (
    <svg
      className="fixed w-full h-full opacity-70"
      style={{
        backgroundImage: isDark
          ? "radial-gradient(circle at 12.5px 10px, dimgray 3%, transparent 0%), radial-gradient(circle at 37.5px 37.5px, dimgray 3%, transparent 0%)"
          : "radial-gradient(circle at 12.5px 10px, lightgray 3%, transparent 0%), radial-gradient(circle at 37.5px 37.5px, lightgray 3%, transparent 0%)",
        backgroundSize: "50px 50px",
      }}
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={(noise[0] * 3 + 1) / 1000}
          result="fractalNoise"
        />
        <feColorMatrix
          in="myComposite"
          type="matrix"
          values={`
                0   0   0   0   ${noise[1] * 0.3 + 0.1}
                0   0   0   0   ${noise[2] * 0.3 + 0.1}
                0   0   0   0   1
                0   0   0   1   0
                `}
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)"></rect>
    </svg>
  );
}
