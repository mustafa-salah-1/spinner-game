import { useState, useRef } from "react";

const DEFAULT_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E9",
  "#F8B500",
  "#FF6F61",
  "#6B5B95",
  "#88B04B",
  "#F7CAC9",
  "#92A8D1",
  "#955251",
  "#B565A7",
  "#009B77",
  "#DD4124",
];

const DEFAULT_ENTRIES = [
  "Ali",
  "Beatriz",
  "Charles",
  "Diya",
  "Eric",
  "Fatima",
  "Gabriel",
  "Hanna",
];

function getSecureRandomNumber() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / (0xffffffff + 1);
}

function generateId() {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
}

export function useSpinnerGame() {
  const [entries, setEntries] = useState(() =>
    DEFAULT_ENTRIES.map((name, index) => ({
      id: generateId(),
      name,
      color: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    }))
  );

  const [results, setResults] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [settings, setSettings] = useState({
    spinDuration: 5000,
    removeWinnerAfterSpin: false,
    soundEnabled: true,
  });

  const spinTimeoutRef = useRef(null);

  const addEntry = (name) => {
    if (!name.trim()) return;
    const newEntry = {
      id: generateId(),
      name: name.trim(),
      color: DEFAULT_COLORS[entries.length % DEFAULT_COLORS.length],
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const removeEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const updateEntry = (id, name) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, name } : entry))
    );
  };

  const clearEntries = () => {
    setEntries([]);
  };

  const shuffleEntries = () => {
    setEntries((prev) => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(getSecureRandomNumber() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  const sortEntries = () => {
    setEntries((prev) =>
      [...prev].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const spin = () => {
    if (entries.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    const winnerIndex = Math.floor(getSecureRandomNumber() * entries.length);
    const selectedWinner = entries[winnerIndex];

    const segmentAngle = 360 / entries.length;
    const winnerCenterAngle = winnerIndex * segmentAngle + segmentAngle / 2;
    const pointerPosition = 270;
    const targetAngle = pointerPosition - winnerCenterAngle;
    const fullRotations = 5 + Math.floor(getSecureRandomNumber() * 3);
    const totalRotation = fullRotations * 360 + targetAngle;

    setRotation((prev) => prev + totalRotation);

    spinTimeoutRef.current = setTimeout(() => {
      setIsSpinning(false);
      setWinner(selectedWinner);

      setResults((prev) =>
        [
          {
            id: generateId(),
            winner: selectedWinner,
            timestamp: new Date().toISOString(),
          },
          ...prev,
        ].slice(0, 50)
      );

      if (settings.removeWinnerAfterSpin) {
        setEntries((prev) =>
          prev.filter((entry) => entry.id !== selectedWinner.id)
        );
      }
    }, settings.spinDuration);
  };

  const resetWheel = () => {
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
    }
    setIsSpinning(false);
    setWinner(null);
    setRotation(0);
  };

  const clearResults = () => {
    setResults([]);
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const closeWinnerModal = () => {
    setWinner(null);
  };

  return {
    entries,
    results,
    isSpinning,
    winner,
    rotation,
    settings,
    addEntry,
    removeEntry,
    updateEntry,
    clearEntries,
    shuffleEntries,
    sortEntries,
    spin,
    resetWheel,
    clearResults,
    updateSettings,
    closeWinnerModal,
  };
}
