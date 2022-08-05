import React from 'react';
import Keyboard from './components/keyboard';
import './styles/App.css';

function App() {
  return (
    <div className='App'>
      <div style={{color: "red"}}>Header</div>
      <div style={{color: "red"}}>Blocks</div>
      <Keyboard/>
    </div>
  );
}

export default App;
