import { forwardRef } from 'react';

const CenterPanel = forwardRef(
  ({ msgs, curChoices, pick, state, picking }, ref) => {
    return (
      <div className="ctr">
        <div className="story" ref={ref}>
          {msgs.map((m) => {
            if (m.type === 'n')
              return (
                <div key={m.id} className="ep">
                  <div className="eph">◆ {m.title || 'Embervale Chronicle'}</div>
                  <div className="epb">
                    {m.text.split('\n').map((p, i) => (p.trim() ? <p key={i}>{p}</p> : null))}
                  </div>
                </div>
              );
            if (m.type === 's')
              return (
                <div key={m.id} className="ep sys">
                  <div className="eph">⚡ SYSTEM</div>
                  <div className="epb">{m.text}</div>
                </div>
              );
            if (m.type === 'ntf')
              return (
                <div key={m.id} className="ntf">
                  <div className="ntft">{m.title}</div>
                  <div className="ntfb">{m.body}</div>
                </div>
              );
            if (m.type === 'c') return <div key={m.id} className="cm">{m.text}</div>;
            return null;
          })}
        </div>
        {curChoices.length > 0 && (
          <div className="choices">
            <div className="clbl">◆ What do you do?</div>
            {curChoices.map((c, i) => {
              const cur = state;
              const lk =
                picking || (c.cg && cur.gold < c.cg) || (c.cw && cur.wood < c.cw) || (c.cs && cur.stone < c.cs);
              return (
                <button
                  key={i}
                  className={`cbtn${lk ? ' locked' : ''}`}
                  onClick={() => !lk && pick(c)}
                  disabled={picking}
                >
                  {c.t}
                  {c.h && <span className="hint">({c.h})</span>}
                  {!picking && c.cg && cur.gold < c.cg && (
                    <span className="hint" style={{ color: '#e07070' }}>
                      [Need {c.cg}g]
                    </span>
                  )}
                  {!picking && c.cw && cur.wood < c.cw && (
                    <span className="hint" style={{ color: '#e07070' }}>
                      [Need {c.cw}🪵]
                    </span>
                  )}
                  {!picking && c.cs && cur.stone < c.cs && (
                    <span className="hint" style={{ color: '#e07070' }}>
                      [Need {c.cs}🪨]
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

CenterPanel.displayName = 'CenterPanel';
export default CenterPanel;
