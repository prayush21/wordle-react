import React from 'react';
import Keyboard from './components/keyboard';
import Tiles from './components/Tiles';
import './styles/App.css';

function App() {
  return (
    <div className='App'>
      <div style={{color: "red"}}>Header</div>
      <div className='guess-grid'>
        <Tiles/>
      </div>
      <Keyboard/>
    </div>
  );
}

export default App;
