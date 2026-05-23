export default function Achievement({ ach }) {
  return (
    <div className="ach">
      <div className="acht">🏆 Achievement Unlocked</div>
      <div className="achn">
        {ach.ic} {ach.n}
      </div>
      <div className="achd">{ach.d || ach.desc}</div>
    </div>
  );
}
