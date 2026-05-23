export default function Topbar({ state, month, season }) {
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
      </div>
    </div>
  );
}
