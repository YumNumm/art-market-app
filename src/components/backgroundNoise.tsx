export function BackgroundNoise() {
  return (
    <svg className="fixed w-full h-full opacity-70">
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={(Math.random() * 3 + 1) / 1000}
          result="fractalNoise"
        />
        <feColorMatrix
          in="myComposite"
          type="matrix"
          values={`
                0   0   0   0   ${Math.random() * 0.3 + 0.1}
                0   0   0   0   ${Math.random() * 0.3 + 0.1}
                0   0   0   0   1
                0   0   0   1   0
                `}
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)"></rect>
    </svg>
  );
}
