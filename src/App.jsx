import { Toaster } from "react-hot-toast";
import { useSpinnerGame } from "./hooks/useSpinnerGame";
import { Wheel } from "./components/Wheel";
import { EntryList } from "./components/EntryList";
import { ResultsHistory } from "./components/ResultsHistory";
import { WinnerModal } from "./components/WinnerModal";
import { ParticlesBackground } from "./components/ParticlesBackground";

function SettingsPanel({ settings, onUpdate }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-3 sm:p-4 border border-slate-700">
      <h2 className="text-base sm:text-lg font-semibold text-slate-100 mb-3 sm:mb-4">
        Settings
      </h2>

      <div className="space-y-4">
        <div>
          <label className="flex items-center justify-between text-sm text-slate-300">
            <span>Spin Duration</span>
            <span className="font-medium">{settings.spinDuration / 1000}s</span>
          </label>
          <input
            type="range"
            min="2000"
            max="10000"
            step="1000"
            value={settings.spinDuration}
            onChange={(e) => onUpdate({ spinDuration: Number(e.target.value) })}
            className="w-full mt-2 accent-blue-600"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.removeWinnerAfterSpin}
            onChange={(e) =>
              onUpdate({ removeWinnerAfterSpin: e.target.checked })
            }
            className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-300">
            Remove winner after spin
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(e) => onUpdate({ soundEnabled: e.target.checked })}
            className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-300">Sound effects</span>
        </label>
      </div>
    </div>
  );
}

function AppContent() {
  const {
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
    clearResults,
    updateSettings,
    closeWinnerModal,
  } = useSpinnerGame();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300 relative">
      <ParticlesBackground />

      <div className="relative z-10">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              padding: "16px",
              fontWeight: "500",
              background: "var(--card-bg)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
            },
          }}
        />

        <header className="py-4 sm:py-6 px-4 max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] text-center">
            🎡 Spinner Game
          </h1>
        </header>

        <main className="container mx-auto px-4 pb-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start justify-center">
            <div className="w-full lg:w-80 lg:order-1">
              <EntryList
                entries={entries}
                onAdd={addEntry}
                onRemove={removeEntry}
                onUpdate={updateEntry}
                onShuffle={shuffleEntries}
                onSort={sortEntries}
                onClear={clearEntries}
              />
            </div>

            <div className="flex flex-col items-center gap-4 sm:gap-6 lg:order-2 w-full lg:w-auto">
              <Wheel
                entries={entries}
                rotation={rotation}
                isSpinning={isSpinning}
                spinDuration={settings.spinDuration}
                onSpin={spin}
              />

              <button
                onClick={spin}
                disabled={isSpinning || entries.length === 0}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSpinning ? "Spinning..." : "Spin the Wheel!"}
              </button>
            </div>

            <div className="w-full lg:w-72 lg:order-3 space-y-4 sm:space-y-6">
              <ResultsHistory results={results} onClear={clearResults} />
              <SettingsPanel settings={settings} onUpdate={updateSettings} />
            </div>
          </div>
        </main>

        <WinnerModal
          winner={winner}
          onClose={closeWinnerModal}
          onRemove={removeEntry}
        />
      </div>
    </div>
  );
}

function App() {
  document.documentElement.classList.add("dark");
  return <AppContent />;
}

export default App;
