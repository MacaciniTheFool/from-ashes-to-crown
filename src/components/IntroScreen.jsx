import { useState } from 'react';

const panels = [
  { type: 'n', cap: 'ERYNDAL — YEAR 847', txt: 'Rain hammers the cobblestones. A student walks home, earphones in, oblivious to everything except exam relief.' },
  { type: 'n', cap: 'A MOMENT OF INATTENTION', txt: 'The light. The screech of tires. Then—', red: true },
  { type: 's', txt: 'So. You\'re dead.\n\nDon\'t panic. I mean, you can — it won\'t help.\n\nI\'m what you\'d call a System.\nAnd you\'re about to be very confused.\n\nWelcome to Eryndal.\nTry not to die again.\nI\'m still calibrating.' },
  { type: 'n', cap: 'DAY 1 — INSIDE A CARRIAGE', txt: 'You open your eyes. Smell of horse and damp wood. Hands that aren\'t yours. A royal decree of exile crumpled in your lap.' },
];

export default function IntroScreen({ onStart }) {
  const [step, setStep] = useState(0);

  return (
    <div className="intro">
      <div className="intro-inner">
        {panels.slice(0, step + 1).map((p, i) =>
          p.type === 's' ? (
            <div key={i} className="si">
              <div className="sl">⚡ SYSTEM</div>
              <div className="st">{p.txt}</div>
            </div>
          ) : (
            <div key={i} className={`mp${p.red ? ' red' : ''}`}>
              {p.cap && <div className="mp-cap">{p.cap}</div>}
              <div className="mp-txt">{p.txt}</div>
            </div>
          )
        )}
        {step < panels.length - 1 ? (
          <button className="ibtn" onClick={() => setStep(step + 1)}>
            Continue ▶
          </button>
        ) : (
          <button className="ibtn" onClick={onStart}>
            ⚡ BEGIN — Day 1 of Embervale
          </button>
        )}
      </div>
    </div>
  );
}
