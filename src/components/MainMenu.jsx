import { useState, useRef } from 'react';

export default function MainMenu({ onNew, onContinue, hasSaveFile, onImport, saveDay }) {
  const [confirm, setConfirm] = useState(false);
  const fileRef = useRef(null);

  const styles = `
    @keyframes mFade {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes mBlink {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.9; }
    }
    .mw {
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: mFade 0.7s ease;
    }
    .mt {
      font-family: 'Cinzel', serif;
      font-weight: 900;
      letter-spacing: 6px;
      color: #c9922a;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.1;
    }
    .ms {
      font-family: 'Cinzel', serif;
      font-size: 10px;
      letter-spacing: 5px;
      color: #f0c050;
      opacity: 0.45;
      text-transform: uppercase;
      margin-top: 8px;
      margin-bottom: 40px;
    }
    .mdv {
      width: 160px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #c9922a, transparent);
      margin: 16px 0;
    }
    .mb {
      background: transparent;
      border: none;
      color: #c8b98a;
      font-family: 'Cinzel', serif;
      font-size: 14px;
      letter-spacing: 4px;
      padding: 11px 56px;
      cursor: pointer;
      text-transform: uppercase;
      transition: all 0.25s;
      display: block;
      text-align: center;
      width: 300px;
      position: relative;
      margin: 3px 0;
    }
    .mb::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      right: 50%;
      height: 1px;
      background: #c9922a;
      transition: all 0.25s;
    }
    .mb:hover {
      color: #f0c050;
      letter-spacing: 7px;
    }
    .mb:hover::after {
      left: 20%;
      right: 20%;
    }
    .mb.dis {
      opacity: 0.18;
      cursor: not-allowed;
      pointer-events: none;
    }
    .mb.dr:hover {
      color: #e07070;
    }
    .mb.gr:hover {
      color: #7bc47b;
    }
    .mver {
      position: fixed;
      bottom: 12px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 9px;
      color: #c8b98a;
      opacity: 0.12;
      letter-spacing: 2px;
    }
    .mqt {
      font-family: 'Crimson Text', serif;
      font-size: 13px;
      color: #c8b98a;
      opacity: 0.3;
      font-style: italic;
      text-align: center;
      max-width: 340px;
      margin-top: 28px;
      line-height: 1.8;
    }
    .msi {
      font-family: 'Share Tech Mono', monospace;
      font-size: 9px;
      color: #7bc47b;
      opacity: 0.5;
      letter-spacing: 1px;
      margin-top: 3px;
      text-align: center;
    }
    .mcb {
      border: 1px solid #8b1a1a;
      background: rgba(139, 26, 26, 0.07);
      padding: 14px 24px;
      text-align: center;
      animation: mFade 0.3s ease;
      width: 300px;
      margin-top: 4px;
    }
    .mct {
      font-family: 'Crimson Text', serif;
      font-size: 13px;
      color: #c8b98a;
      margin-bottom: 10px;
      font-style: italic;
    }
    .mcr {
      display: flex;
      gap: 8px;
      justify-content: center;
    }
    .mce {
      background: transparent;
      border: 1px solid #8b1a1a;
      color: #e07070;
      font-family: 'Cinzel', serif;
      font-size: 10px;
      letter-spacing: 2px;
      padding: 5px 16px;
      cursor: pointer;
      text-transform: uppercase;
      transition: all 0.2s;
    }
    .mce:hover {
      background: #8b1a1a;
      color: #fff;
    }
    .mco {
      background: transparent;
      border: 1px solid #2a5c2a;
      color: #7bc47b;
      font-family: 'Cinzel', serif;
      font-size: 10px;
      letter-spacing: 2px;
      padding: 5px 16px;
      cursor: pointer;
      text-transform: uppercase;
      transition: all 0.2s;
    }
    .mco:hover {
      background: #2a5c2a;
      color: #fff;
    }
  `;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#080604',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{styles}</style>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(201,146,42,.009) 1deg, transparent 2deg)',
          pointerEvents: 'none',
        }}
      />
      <div className="mw">
        <div className="mt" style={{ fontSize: 44 }}>
          From Ashes
        </div>
        <div className="mt" style={{ fontSize: 32, color: '#f0c050' }}>
          to Crown
        </div>
        <div className="ms">The Embervale Chronicles</div>
        <div className="mdv" />
        <button className="mb" onClick={onNew}>
          {hasSaveFile ? '⚔️  New Game' : '⚔️  Begin Your Journey'}
        </button>
        <button className={`mb${!hasSaveFile ? ' dis' : ''}`} onClick={onContinue}>
          📜  Continue
        </button>
        {hasSaveFile && saveDay && <div className="msi">↳ Day {saveDay} — Embervale</div>}
        <button className="mb gr" onClick={() => fileRef.current.click()}>
          📥  Import Save
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files[0]) onImport(e.target.files[0]);
            e.target.value = '';
          }}
        />
        <div className="mdv" />
        {hasSaveFile && !confirm && (
          <button
            className="mb dr"
            style={{ fontSize: 11, opacity: 0.35 }}
            onClick={() => setConfirm(true)}
          >
            ✕  Delete Save
          </button>
        )}
        {confirm && (
          <div className="mcb">
            <div className="mct">Erase all progress? This cannot be undone.</div>
            <div className="mcr">
              <button
                className="mce"
                onClick={() => {
                  localStorage.removeItem('fatc_save_v1');
                  window.location.reload();
                }}
              >
                Erase
              </button>
              <button className="mco" onClick={() => setConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
        <button
          className="mb dr"
          style={{ fontSize: 11, opacity: 0.25, marginTop: 4 }}
          onClick={() => window.close()}
        >
          ✕  Quit
        </button>
        <div className="mqt">
          "An ember is just a fire
          <br />
          that hasn't given up yet."
        </div>
      </div>
      <div className="mver">From Ashes to Crown · Early Access · v0.2</div>
    </div>
  );
}
