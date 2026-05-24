export default function Topbar({ state, month, season, onMenu, onExport }) {
  return (
    <div className="topbar">
      <div className="gtitle">From Ashes to Crown</div>
      <div className="gdate">
        Day {state.day} · {month} · Year 1 · {season}
      </div>
      <div className="res-bar">
        <div className="res">
          💰<span className="rv">{state.gold}g</span>
        </div>
        <div className="res">
          💀<span className="rd">-{state.debt}g</span>
        </div>
        <div className="res">
          🌾<span className="rv">{state.food}</span>
        </div>
        <div className="res">
          🪵<span className="rv">{state.wood}</span>
        </div>
        <div className="res">
          🪨<span className="rv">{state.stone}</span>
        </div>
        <div className="res">
          ⚡<span className="rsp">{state.sp}SP</span>
        </div>
        <div className="res">
          ⭐<span className="rv">{state.reputation}</span>
        </div>
        <button
          onClick={onExport}
          title="Export save file"
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--parch2)',
            fontFamily: 'Share Tech Mono,monospace',
            fontSize: 9,
            letterSpacing: 1,
            padding: '3px 8px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.borderColor = 'var(--gold)')}
          onMouseLeave={(e) => (e.target.style.borderColor = 'var(--border)')}
        >
          📤 Save
        </button>
        <button
          onClick={onMenu}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--parch2)',
            fontFamily: 'Share Tech Mono,monospace',
            fontSize: 9,
            letterSpacing: 1,
            padding: '3px 8px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.borderColor = 'var(--gold)')}
          onMouseLeave={(e) => (e.target.style.borderColor = 'var(--border)')}
        >
          ☰ Menu
        </button>
      </div>
    </div>
  );
}
