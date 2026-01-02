import { useEffect, useState } from "react";

function Confetti({ count = 50 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#F7DC6F",
      "#BB8FCE",
    ];
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      isCircle: Math.random() > 0.5,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti"
          style={{
            left: `${particle.x}%`,
            top: "-20px",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: particle.isCircle ? "50%" : "2px",
            animationDelay: `${particle.delay}s`,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export function WinnerModal({ winner, onClose, onRemove }) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!winner) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {showConfetti && <Confetti />}

      <div
        className="relative rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl animate-scaleIn border "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2  transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center">
          <div className="mb-4">
            <span className="text-6xl">🎉</span>
          </div>

          <h2 className="text-xl font-medium mb-2">
            Winner!
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="w-6 h-6 rounded-full shadow-md"
              style={{ backgroundColor: winner.color }}
            />
            <p className="text-3xl font-bold ">
              {winner.name}
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                onRemove(winner.id);
                onClose();
              }}
              className="px-6 py-3 bg-red-500/20 text-red-500 font-medium rounded-xl hover:bg-red-500/30 transition-colors"
            >
              Remove Winner
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
