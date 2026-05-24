import { useState, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import { initState } from './data/gameState';
import './styles/global.css';

const SAVE_KEY = 'fatc_save_v1';

function saveGame(state) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Save failed:', e);
  }
}

function loadGame() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
}

function hasSave() {
  try {
    return !!localStorage.getItem(SAVE_KEY);
  } catch (e) {
    return false;
  }
}

function deleteSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) {}
}

function exportSave(state) {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `embervale_day${state.day}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importSave(file, cb) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      cb(JSON.parse(e.target.result));
    } catch (err) {
      alert('Invalid save file.');
    }
  };
  reader.readAsText(file);
}

export default function App() {
  const [phase, setPhase] = useState('menu');
  const [state, setState] = useState(initState);
  const [saveExists, setSaveExists] = useState(hasSave());
  const [saveDay, setSaveDay] = useState(() => {
    try {
      const s = loadGame();
      return s?.day || null;
    } catch (e) {
      return null;
    }
  });

  // Auto-save during game
  useEffect(() => {
    if (phase === 'game') {
      saveGame(state);
      setSaveDay(state.day);
      setSaveExists(true);
    }
  }, [state, phase]);

  function startNew() {
    deleteSave();
    setState(initState);
    setPhase('intro');
  }

  function startContinue() {
    const saved = loadGame();
    if (saved) {
      setState(saved);
      setPhase('game');
    }
  }

  function handleImport(file) {
    importSave(file, (saved) => {
      setState(saved);
      saveGame(saved);
      setSaveExists(true);
      setSaveDay(saved.day);
      setPhase('game');
    });
  }

  return (
    <div className="root">
      {phase === 'menu' && (
        <MainMenu
          onNew={startNew}
          onContinue={startContinue}
          hasSaveFile={saveExists}
          onImport={handleImport}
          saveDay={saveDay}
        />
      )}
      {phase === 'intro' && <IntroScreen onStart={() => setPhase('game')} />}
      {phase === 'game' && (
        <Game
          state={state}
          setState={setState}
          onMenu={() => setPhase('menu')}
          onExport={() => exportSave(state)}
        />
      )}
    </div>
  );
}
