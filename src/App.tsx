import React, { createContext, useEffect, useState } from 'react';
import Keyboard from './components/keyboard';
import './styles/App.css';
import Board from './components/Board';
import Alert from './components/Alert';
import targetWords from './components/targetWords';
import dictionary from './components/dictionary';

export interface TileObj {
  value: string,
  state: "" | "active" | "wrong" | "correct" | "wrong-position",
}

export interface KeyObj {
  keyValue: string,
  state: "" | "wrong" | "correct" | "wrong-position",
}

export interface AppContextInterface {
  board: TileObj[][],
  setBoard: any,
  currentAttempt: CurrentAttemptInterface | null,
  setCurrentAttempt: any,
  setAlertList: any,
  alertList: string[],
  wordOfTheDay: string,
  keysState: KeyObj[],
  setKeysState: any,
}

export interface CurrentAttemptInterface {
  attempt: number,
  letterPos: number,
}

export const AppContext = createContext<AppContextInterface | null>(null);

const getTodaysWord = () => {
  const timeNow = Date.now();
  const startDate = new Date("1/1/2022");
  const diffDays = Math.floor((timeNow - startDate.getTime())/1000/60/60/24);
  const diffHrs = 24 * diffDays;
  console.log("diffDays", targetWords[diffDays]);
  console.log("total words", targetWords.length);
  console.log('diffHrs', diffHrs);
  return targetWords[diffDays];
  
}

function App() {

  const wordOfTheDay = getTodaysWord();

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
const keysArray = "Q W E R T Y U I O P A S D F G H J K L Enter Z X C V B N M Delete".split(" ");
const keysObjArray = keysArray.map((value): KeyObj => {
  return {
    keyValue: value,
    state: "",
  }
})

const [keysState, setKeysState] = useState(keysObjArray);

  const mat = new Array(6).fill(null).map(x => new Array(5).fill(eTile));
  const [board, setBoard] = useState<TileObj[][]>(mat)
  const [alertList, setAlertList] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState<CurrentAttemptInterface>({attempt: 0, letterPos: 0});

  useEffect(() => {
    // setCurrentTile([0, 0]);
    setBoard(mat);
  },[])

// console.log("alertList", alertList);


  return (
    <div className='App'>
      <div style={{color: "red"}}>Header</div>
      <AppContext.Provider value={{board, currentAttempt, alertList, keysState, setCurrentAttempt, setBoard, setAlertList, setKeysState, wordOfTheDay}}>
        <div className="alert-container">
            {alertList.map((value: string, index) => {
              // console.log("index", index);
              
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
