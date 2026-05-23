import { getTitle } from '../utils/gameLogic';

export default function LeftPanel({ state }) {
  const title = getTitle(state);

  return (
    <div className="lp">
      <div className="nc">
        <div className="nav">🧑‍🦱</div>
        <div className="nname">Rean Ashvane</div>
        <div className="nttl">{title}</div>
      </div>
      <div className="pt">Stats</div>
      {Object.entries(state.stats).map(([k, v]) => (
        <div key={k} className="sr">
          <div className="sn">{k}</div>
          <div className="sbg">
            <div className="sf" style={{ width: `${v}%` }} />
          </div>
          <div className="sv">{v}</div>
        </div>
      ))}
      <div className="pt" style={{ marginTop: 10 }}>
        Skills
      </div>
      {state.skills.length === 0 ? (
        <div className="noskill">
          No skills yet.
          <br />
          They unlock through action.
        </div>
      ) : (
        state.skills.map((s, i) => (
          <span key={i} className={`sk${s.tp === 'modern' ? ' mod' : ''}`}>
            {s.tp === 'modern' ? '⚡' : '⚔️'} {s.n} <span className="skl">Lv.{s.lv}</span>
          </span>
        ))
      )}
      <div className="pt" style={{ marginTop: 10 }}>
        Achievements
      </div>
      {state.achievements.length === 0 ? (
        <div className="noskill">None yet.</div>
      ) : (
        state.achievements.map((a, i) => (
          <div key={i} style={{ fontSize: 10, color: 'var(--parch2)', marginBottom: 3 }}>
            {a.ic} {a.n}
          </div>
        ))
      )}
    </div>
  );
}
