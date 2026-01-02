function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function ResultsHistory({ results, onClear }) {
  if (results.length === 0) {
    return (
      <div className="w-full lg:max-w-xs bg-[var(--bg-secondary)] rounded-2xl p-3 sm:p-4 border border-[var(--border-color)]">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
          Results{" "}
          <span className="text-[var(--text-muted)] font-normal">(0)</span>
        </h2>
        <div className="text-center py-8 text-[var(--text-muted)]">
          <svg
            className="w-12 h-12 mx-auto mb-2 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-sm">No results yet</p>
          <p className="text-xs mt-1">Spin the wheel to see results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-xs bg-[var(--bg-secondary)] rounded-2xl p-3 sm:p-4 flex flex-col h-full border border-[var(--border-color)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          Results{" "}
          <span className="text-[var(--text-muted)] font-normal">
            ({results.length})
          </span>
        </h2>
        <button
          onClick={onClear}
          className="text-sm text-[var(--text-muted)] hover:text-red-500 transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
        {results.map((result, index) => (
          <div
            key={result.id}
            className="flex items-center gap-3 p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border-color)]"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)] text-xs font-medium">
              {results.length - index}
            </div>
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: result.winner.color }}
            />
            <span className="flex-1 text-sm font-medium text-[var(--text-primary)] truncate">
              {result.winner.name}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {formatTime(result.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
