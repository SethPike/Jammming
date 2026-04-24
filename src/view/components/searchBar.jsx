import { Navbar, Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [

];

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Filter suggestions as user types
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const filtered = SUGGESTIONS.filter((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    setSuggestions(filtered);
    setOpen(filtered.length > 0);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (value) => {
    setQuery(value);
    setOpen(false);
  };

  const handleSearch = () => {
    setOpen(false);
    if (onSearch) onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", maxWidth: 520 }}>
      {/* Search bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 999,
          padding: "6px 6px 6px 20px",
          gap: 8,
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search anything…"
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: 15,
          }}
        />
        <button
          onClick={handleSearch}
          className="btn btn-light btn-sm rounded-pill px-3"
          style={{ whiteSpace: "nowrap", fontWeight: 500 }}
        >
          Search
        </button>
      </div>

      {/* Suggestions dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            background: "rgba(20, 25, 50, 0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 16,
            overflow: "hidden",
            zIndex: 100,
          }}
        >
          {suggestions.map((s) => (
            <div
              key={s}
              onMouseDown={() => handleSelect(s)}
              style={{
                padding: "11px 18px",
                color: "rgba(255,255,255,0.85)",
                fontSize: 14,
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}