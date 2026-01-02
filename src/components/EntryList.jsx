import { useState } from "react";
import { useForm } from "react-hook-form";

function ShuffleIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

function EntryItem({ entry, onRemove, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(entry.name);

  const handleSave = () => {
    if (editValue.trim()) {
      onUpdate(entry.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(entry.name);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-colors group">
      <div
        className="w-4 h-4 rounded-full flex-shrink-0"
        style={{ backgroundColor: entry.color }}
      />

      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-1 text-sm border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--bg-primary)] text-[var(--text-primary)]"
          autoFocus
        />
      ) : (
        <span
          className="flex-1 text-sm text-[var(--text-primary)] cursor-pointer truncate"
          onDoubleClick={() => setIsEditing(true)}
          title={entry.name}
        >
          {entry.name}
        </span>
      )}

      <button
        onClick={() => onRemove(entry.id)}
        className="p-1 text-[var(--text-muted)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Remove ${entry.name}`}
      >
        <svg
          className="w-4 h-4"
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
    </div>
  );
}

export function EntryList({
  entries,
  onAdd,
  onRemove,
  onUpdate,
  onShuffle,
  onSort,
  onClear,
}) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (data.newEntry.trim()) {
      onAdd(data.newEntry);
      reset();
    }
  };

  return (
    <div className="w-full lg:max-w-sm bg-[var(--bg-secondary)] rounded-2xl p-3 sm:p-4 flex flex-col h-full border border-[var(--border-color)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          Entries{" "}
          <span className="text-[var(--text-muted)] font-normal">
            ({entries.length})
          </span>
        </h2>
        <div className="flex gap-1">
          <button
            onClick={onShuffle}
            className="p-2 text-[var(--text-muted)] hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
            title="Shuffle entries"
            disabled={entries.length < 2}
          >
            <ShuffleIcon />
          </button>
          <button
            onClick={onSort}
            className="p-2 text-[var(--text-muted)] hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
            title="Sort entries A-Z"
            disabled={entries.length < 2}
          >
            <SortIcon />
          </button>
          <button
            onClick={onClear}
            className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Clear all entries"
            disabled={entries.length === 0}
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
        <div className="flex gap-2">
          <input
            {...register("newEntry")}
            type="text"
            placeholder="Add new entry..."
            className="flex-1 px-3 py-2 text-sm border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
        {entries.length === 0 ? (
          <div className="text-center py-8 text-[var(--text-muted)]">
            <p className="mb-2">No entries yet</p>
            <p className="text-sm">Add names or items above</p>
          </div>
        ) : (
          entries.map((entry) => (
            <EntryItem
              key={entry.id}
              entry={entry}
              onRemove={onRemove}
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
}
