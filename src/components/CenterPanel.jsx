import { forwardRef } from 'react';

const CenterPanel = forwardRef(({ msgs, ev, pick, state }, ref) => {
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
      {ev && (
        <div className="choices">
          <div className="clbl">◆ What do you do?</div>
          {ev.c.map((c, i) => {
            const lk = (c.cg && state.gold < c.cg) || (c.cw && state.wood < c.cw) || (c.cs && state.stone < c.cs);
            return (
              <button key={i} className={`cbtn${lk ? ' locked' : ''}`} onClick={() => !lk && pick(c)}>
                {c.t}
                {c.h && <span className="hint">({c.h})</span>}
                {lk && <span className="hint" style={{ color: '#e07070' }}>[Not enough resources]</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

CenterPanel.displayName = 'CenterPanel';
export default CenterPanel;
