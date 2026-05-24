import { useState, useEffect, useRef } from 'react';
import Topbar from './Topbar';
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RightPanel from './RightPanel';
import Achievement from './Achievement';
import { EV } from '../data/events';
import { applyFx, getTitle } from '../utils/gameLogic';
import { MONTHS, SEASONS } from '../data/constants';

export default function Game({ state, setState, onMenu, onExport }) {
  const [msgs, setMsgs] = useState([]);
  const [curChoices, setCurChoices] = useState([]);
  const [ach, setAch] = useState(null);
  const [tab, setTab] = useState('people');
  const [picking, setPicking] = useState(false);
  const ref = useRef(null);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [msgs]);

  useEffect(() => {
    if (ach) {
      const t = setTimeout(() => setAch(null), 4500);
      return () => clearTimeout(t);
    }
  }, [ach]);

  const startedRef = useRef(false);
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      loadEv('start_arrival');
    }
  }, []);

  function loadEv(id) {
    const ev = EV[id] || EV['hub'];
    if (!ev) {
      loadEv('hub');
      return;
    }
    setMsgs((prev) => [
      ...prev,
      { type: 'n', title: ev.title, text: ev.n, id: Date.now() },
      ...(ev.s ? [{ type: 's', text: ev.s, id: Date.now() + 1 }] : []),
    ]);
    setCurChoices(ev.c || []);
    setState((prev) => ({ ...prev, curEv: id }));
  }

  function pick(c) {
    if (picking) return;
    const cur = stateRef.current;

    if (c.cg && cur.gold < c.cg) {
      setMsgs((p) => [
        ...p,
        { type: 's', text: `Need ${c.cg} gold. You have ${cur.gold}. Earn more first.`, id: Date.now() },
      ]);
      return;
    }
    if (c.cw && cur.wood < c.cw) {
      setMsgs((p) => [
        ...p,
        { type: 's', text: `Need ${c.cw} wood. You have ${cur.wood}. Gather more first.`, id: Date.now() },
      ]);
      return;
    }
    if (c.cs && cur.stone < c.cs) {
      setMsgs((p) => [
        ...p,
        { type: 's', text: `Need ${c.cs} stone. You have ${cur.stone}. Mine more first.`, id: Date.now() },
      ]);
      return;
    }

    setPicking(true);
    setCurChoices([]);
    setMsgs((p) => [...p, { type: 'c', text: `▶ ${c.t}`, id: Date.now() }]);
    const ns = applyFx(cur, c.fx || {});

    if (c.fx?.skill && !cur.skills.find((s) => s.n === c.fx.skill.n)) {
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
    stateRef.current = ns;
    setTimeout(() => {
      loadEv(c.nx || 'hub');
      setPicking(false);
    }, 150);
  }

  const mi = Math.max(0, Math.floor((state.day - 1) / 40) % 16);
  const month = MONTHS[mi];
  const season = SEASONS[mi];
  const title = getTitle(state);

  return (
    <div className="game">
      <Topbar state={state} month={month} season={season} onMenu={onMenu} onExport={onExport} />
      <LeftPanel state={state} />
      <CenterPanel msgs={msgs} ref={ref} curChoices={curChoices} pick={pick} state={state} picking={picking} />
      <RightPanel state={state} tab={tab} setTab={setTab} />
      {ach && <Achievement ach={ach} />}
    </div>
  );
}
