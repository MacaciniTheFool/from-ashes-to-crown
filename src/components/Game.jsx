import { useState, useEffect, useRef } from 'react';
import Topbar from './Topbar';
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RightPanel from './RightPanel';
import Achievement from './Achievement';
import { EV } from '../data/events';
import { applyFx, getTitle } from '../utils/gameLogic';
import { MONTHS, SEASONS } from '../data/constants';

export default function Game({ state, setState }) {
  const [msgs, setMsgs] = useState([]);
  const [ach, setAch] = useState(null);
  const [tab, setTab] = useState('people');
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [msgs]);

  useEffect(() => {
    if (ach) {
      const t = setTimeout(() => setAch(null), 4500);
      return () => clearTimeout(t);
    }
  }, [ach]);

  useEffect(() => {
    loadEv('start_arrival');
  }, []);

  function loadEv(id) {
    const ev = EV[id] || EV['hub'];
    setMsgs((prev) => [
      ...prev,
      { type: 'n', title: ev.title, text: ev.n, id: Date.now() },
      ...(ev.s ? [{ type: 's', text: ev.s, id: Date.now() + 1 }] : []),
    ]);
    setState((prev) => ({ ...prev, curEv: id }));
  }

  function pick(c) {
    if (c.cg && state.gold < c.cg) {
      setMsgs((p) => [...p, { type: 's', text: `Need ${c.cg} gold. You have ${state.gold}. Earn more first.`, id: Date.now() }]);
      return;
    }
    if (c.cw && state.wood < c.cw) {
      setMsgs((p) => [...p, { type: 's', text: `Need ${c.cw} wood. You have ${state.wood}. Gather more first.`, id: Date.now() }]);
      return;
    }
    if (c.cs && state.stone < c.cs) {
      setMsgs((p) => [...p, { type: 's', text: `Need ${c.cs} stone. You have ${state.stone}. Mine more first.`, id: Date.now() }]);
      return;
    }

    setMsgs((p) => [...p, { type: 'c', text: `▶ ${c.t}`, id: Date.now() }]);
    const ns = applyFx(state, c.fx || {});

    if (c.fx?.skill && !state.skills.find((s) => s.n === c.fx.skill.n)) {
      setMsgs((p) => [
        ...p,
        {
          type: 'ntf',
          title: `⚡ ${c.fx.skill.tp === 'modern' ? 'MODERN KNOWLEDGE' : 'SKILL'} UNLOCKED`,
          body: `[ ${c.fx.skill.n} Lv.${c.fx.skill.lv} ] — "${c.fx.skill.d}"`,
          id: Date.now() + 2,
        },
      ]);
    }

    if (c.fx?.ach) setAch(c.fx.ach);
    setState(ns);
    setTimeout(() => loadEv(c.nx || 'hub'), 80);
  }

  const ev = EV[state.curEv] || EV['hub'];
  const mi = Math.floor((state.day - 1) / 40) % 16;
  const month = MONTHS[mi];
  const season = SEASONS[mi];
  const title = getTitle(state);

  return (
    <div className="game">
      <Topbar state={state} month={month} season={season} />
      <LeftPanel state={state} />
      <CenterPanel msgs={msgs} ref={ref} ev={ev} pick={pick} state={state} />
      <RightPanel state={state} tab={tab} setTab={setTab} />
      {ach && <Achievement ach={ach} />}
    </div>
  );
}
