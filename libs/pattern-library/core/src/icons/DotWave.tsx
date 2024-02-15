export function DotWave(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <circle cx="4" cy="15" r="3">
        <animate
          attributeName="cy"
          values="15;10;15"
          dur="0.6s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>

      <circle cx="15" cy="15" r="3">
        <animate
          attributeName="cy"
          values="15;10;15"
          dur="0.6s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </circle>

      <circle cx="26" cy="15" r="3">
        <animate
          attributeName="cy"
          values="15;10;15"
          dur="0.6s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </circle>
    </svg>
  );
}
