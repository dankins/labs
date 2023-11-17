export function GlowCard({ children }: { children?: React.ReactNode }) {
  return (
    <div className="p-5 rounded-5 container relative">
      <svg
        className="relative top"
        viewBox="0 0 900 600"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        fill="white"
      >
        <filter id="shadow">
          <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
        </filter>
        <filter id="sofGlow" height="300%" width="300%" x="-75%" y="-75%">
          <feMorphology
            operator="dilate"
            radius="4"
            in="SourceAlpha"
            result="thicken"
          />

          <feGaussianBlur in="thicken" stdDeviation="10" result="blurred" />

          <feFlood flood-color="#9381ff" result="glowColor" />

          <feComposite
            in="glowColor"
            in2="blurred"
            operator="in"
            result="softGlow_colored"
          />

          <feMerge>
            <feMergeNode in="softGlow_colored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <g
          transform="translate(410.35696160895793 272.1586464044217)"
          filter="url(#sofGlow)"
        >
          <path
            d="M112.3 -162.6C155.1 -147.3 205.8 -132.2 237.9 -98C270 -63.9 283.5 -10.6 267 31.7C250.6 74.1 204.3 105.5 167.7 142.3C131.1 179.2 104.3 221.5 66.2 238.9C28.1 256.2 -21.3 248.5 -60.3 227.1C-99.3 205.7 -127.9 170.6 -149.7 135.3C-171.6 100 -186.8 64.5 -192.4 27.5C-198 -9.6 -194 -48.2 -177.3 -79.3C-160.5 -110.5 -131 -134.1 -99.3 -154.5C-67.6 -174.8 -33.8 -191.9 0.5 -192.7C34.8 -193.5 69.6 -177.9 112.3 -162.6"
            fill="inherit"
          ></path>
        </g>
      </svg>
      <div>{children}</div>
    </div>
  );
}
