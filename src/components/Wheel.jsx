function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    x,
    y,
    "L",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "Z",
  ].join(" ");
}

function getContrastColor(hexColor) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#1a1a2e" : "#ffffff";
}

export function Wheel({ entries, rotation, isSpinning, spinDuration, onSpin }) {
  const size = 400;
  const center = size / 2;
  const radius = size / 2 - 10;
  const segmentAngle = entries.length > 0 ? 360 / entries.length : 360;

  const handleClick = () => {
    if (!isSpinning && entries.length > 0) {
      onSpin();
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-[min(90vw,320px)] sm:max-w-[400px] mx-auto">
      <div
        className="absolute -top-2 z-10 w-0 h-0"
        style={{
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderTop: "30px solid var(--pointer-color)",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
        }}
      />

      <div
        className="cursor-pointer select-none"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Click to spin the wheel"
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${size} ${size}`}
          className="drop-shadow-2xl max-w-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? `transform ${spinDuration}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`
              : "none",
          }}
        >
          <circle
            cx={center}
            cy={center}
            r={radius + 5}
            fill="none"
            stroke="var(--wheel-border)"
            strokeWidth="8"
          />

          {entries.length === 0 ? (
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="var(--bg-tertiary)"
            />
          ) : (
            entries.map((entry, index) => {
              const startAngle = index * segmentAngle;
              const endAngle = startAngle + segmentAngle;
              const midAngle = startAngle + segmentAngle / 2;
              const textRadius = radius * 0.65;
              const textPos = polarToCartesian(
                center,
                center,
                textRadius,
                midAngle
              );
              const textColor = getContrastColor(entry.color);

              return (
                <g key={entry.id}>
                  <path
                    d={describeArc(
                      center,
                      center,
                      radius,
                      startAngle,
                      endAngle
                    )}
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    fill={textColor}
                    fontSize={
                      entries.length > 12
                        ? "10"
                        : entries.length > 8
                        ? "12"
                        : "14"
                    }
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      transform: `rotate(${midAngle}deg)`,
                      transformOrigin: `${textPos.x}px ${textPos.y}px`,
                    }}
                  >
                    {entry.name.length > 10
                      ? entry.name.slice(0, 10) + "..."
                      : entry.name}
                  </text>
                </g>
              );
            })
          )}

          <circle
            cx={center}
            cy={center}
            r="35"
            fill="var(--wheel-center)"
            className="drop-shadow-lg"
          />
          <text
            x={center}
            y={center}
            fill="#ffffff"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {isSpinning ? "SPINNING" : "SPIN"}
          </text>
        </svg>
      </div>

      {entries.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-[var(--text-muted)] text-lg font-medium">
            Add entries to spin!
          </p>
        </div>
      )}
    </div>
  );
}
