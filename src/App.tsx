import React, { createContext, useEffect, useState } from 'react';
import Keyboard from './components/keyboard';
import './styles/App.css';
import Board from './components/Board';
import Alert from './components/Alert';

export interface TileObj {
  value: string,
  state: "" | "active" | "wrong" | "correct" | "wrong-position",
}

export interface AppContextInterface {
  board: TileObj[][],
  setBoard: any,
  currentAttempt: CurrentAttemptInterface | null,
  setCurrentAttempt: any,
  setAlertList: any,
  alertList: string[],
}

export interface CurrentAttemptInterface {
  attempt: number,
  letterPos: number,
}

export const AppContext = createContext<AppContextInterface | null>(null);

function App() {

  const eTile: TileObj = {
    value: '',
    state: ''
};
const aTile: TileObj = {
    value: '',
    state: 'active'
};
const wTile: TileObj = {
    value: 'A',
    state: 'wrong'
};
const cTile: TileObj = {
    value: 'R',
    state: 'correct'
};
const wpTile: TileObj = {
    value: 'F',
    state: 'wrong-position',
};

  const mat = new Array(6).fill(null).map(x => new Array(5).fill(eTile));
  const [board, setBoard] = useState<TileObj[][]>(mat)
  const [alertList, setAlertList] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState<CurrentAttemptInterface>({attempt: 0, letterPos: 0});

  useEffect(() => {
    // setCurrentTile([0, 0]);
    setBoard(mat);
  },[])

console.log("alertList", alertList);


  return (
    <div className='App'>
      <div style={{color: "red"}}>Header</div>
      <AppContext.Provider value={{board, currentAttempt, alertList, setCurrentAttempt, setBoard, setAlertList}}>
        <div className="alert-container">
            {alertList.map((value: string, index) => {
              console.log("index", index);
              
              return <Alert key={value+index} data={value}/>
            })}
        </div>
      <div className='guess-grid'>
        <Board/>
      </div>
      <Keyboard/>
      </AppContext.Provider>
    </div>
  );
}

export default App;
