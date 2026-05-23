import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import Game from './components/Game';
import { initState } from './data/gameState';
import './styles/global.css';

export default function App() {
  const [phase, setPhase] = useState('intro');
  const [state, setState] = useState(initState);

  return (
    <div className="root">
      {phase === 'intro' ? (
        <IntroScreen onStart={() => setPhase('game')} />
      ) : (
        <Game state={state} setState={setState} />
      )}
    </div>
  );
}
