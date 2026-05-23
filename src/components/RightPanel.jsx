export default function RightPanel({ state, tab, setTab }) {
  const unNPCs = state.npcs.filter((n) => n.un);
  const builtB = state.buildings.filter((b) => b.built);
  const notB = state.buildings.filter((b) => !b.built);

  return (
    <div className="rp">
      <div className="tabs">
        <button className={`tab${tab === 'people' ? ' active' : ''}`} onClick={() => setTab('people')}>
          People
        </button>
        <button className={`tab${tab === 'estate' ? ' active' : ''}`} onClick={() => setTab('estate')}>
          Estate
        </button>
        <button className={`tab${tab === 'build' ? ' active' : ''}`} onClick={() => setTab('build')}>
          Build
        </button>
      </div>

      {tab === 'people' && (
        <>
          <div className="pt">Characters</div>
          {unNPCs.map((n) => (
            <div key={n.id} className="ncard">
              <div className="ntop">
                <span className="nem">{n.em}</span>
                <div>
                  <div className="nnm">{n.n}</div>
                  <div className="nrl">{n.r}</div>
                </div>
              </div>
              <div className="nbr">
                <div className="nbl">Loyal</div>
                <div className="nbg">
                  <div className="nbf l" style={{ width: `${n.l}%` }} />
                </div>
                <span style={{ fontSize: 8, color: 'var(--gold2)', fontFamily: 'Share Tech Mono,monospace', marginLeft: 3 }}>
                  {n.l}
                </span>
              </div>
              <div className="nbr">
                <div className="nbl">Trust</div>
                <div className="nbg">
                  <div className="nbf t" style={{ width: `${n.t}%` }} />
                </div>
                <span style={{ fontSize: 8, color: '#4a9eff', fontFamily: 'Share Tech Mono,monospace', marginLeft: 3 }}>
                  {n.t}
                </span>
              </div>
              {n.a !== null && (
                <div className="nbr">
                  <div className="nbl">❤️</div>
                  <div className="nbg">
                    <div className="nbf a" style={{ width: `${n.a || 0}%` }} />
                  </div>
                  <span style={{ fontSize: 8, color: '#ff6b9d', fontFamily: 'Share Tech Mono,monospace', marginLeft: 3 }}>
                    {n.a || 0}
                  </span>
                </div>
              )}
              <div style={{ marginTop: 4 }}>
                {n.traits.map((tr, i) => (
                  <span key={i} className={`tp ${n.tt[i]}`}>
                    {tr}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div style={{ fontSize: 9, color: 'var(--parch2)', opacity: 0.3, fontStyle: 'italic', textAlign: 'center', padding: '6px' }}>
            More unlock as you explore...
          </div>
        </>
      )}
      {tab === 'estate' && (
        <>
          <div className="pt">Embervale</div>
          {[
            ['👥 Serfs', state.population],
            ['🌾 Food', state.food],
            ['🪵 Wood', state.wood],
            ['🪨 Stone', state.stone],
            ['⭐ Rep', `${state.reputation}/100`],
          ].map(([k, v]) => (
            <div key={k} className="pr">
              <span className="prn">{k}</span>
              <span className="prv">{v}</span>
            </div>
          ))}
          <div className="pt" style={{ marginTop: 8 }}>
            Buildings
          </div>
          {builtB.map((b, i) => (
            <div key={i} className="bi">
              <div className="btn">
                <span className="bname built">
                  {b.ic} {b.n}
                </span>
                <span className="bstat">Active</span>
              </div>
              <div className="breq">{b.eff}</div>
            </div>
          ))}
        </>
      )}
      {tab === 'build' && (
        <>
          <div className="pt">Available</div>
          {notB.map((b, i) => {
            const ok = state.gold >= b.rg && state.wood >= b.rw && state.stone >= b.rs && state.population >= b.rp;
            return (
              <div key={i} className="bi" style={{ opacity: ok ? 1 : 0.5 }}>
                <div className="btn">
                  <span className="bname">
                    {b.ic} {b.n}
                  </span>
                  <span style={{ fontSize: 8, color: ok ? 'var(--gold)' : '#e07070', fontFamily: 'Share Tech Mono,monospace' }}>
                    {ok ? '✓' : ''}
                  </span>
                </div>
                <div className="breq">
                  {b.rg > 0 && `${b.rg}g `}
                  {b.rw > 0 && `${b.rw}🪵 `}
                  {b.rs > 0 && `${b.rs}🪨 `}
                  {b.rp > 0 && `${b.rp}👥`}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
