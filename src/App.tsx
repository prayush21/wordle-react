import React, { createContext, useEffect, useState } from 'react';
import Keyboard from './components/keyboard';
import './styles/App.css';
import './styles/Fireworks.css';
import Board from './components/Board';
import Alert from './components/Alert';
import targetWords from './components/targetWords';
import dictionary from './components/dictionary';
import { FiSettings } from "react-icons/fi";
import { FaHamburger } from "react-icons/fa";
import {GrClose } from "react-icons/gr"
import { isWordInDictionary } from './components/Key';
import useImportScriptHook from './useImportScriptHook';

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
  showModal: Boolean, 
  setShowModal: any
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
  // console.log("diffDays", targetWords[diffDays]);
  // console.log("total words", targetWords.length);
  // console.log('diffHrs', diffHrs);
  return targetWords[diffDays];
  
}

function App() {

  const wordOfTheDay = 'krupa';

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
  const [alertList, setAlertList] = useState<string[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<CurrentAttemptInterface>({attempt: 0, letterPos: 0});
  const [showModal, setShowModal] = useState<Boolean>(false);

  useEffect(() => {
    // setCurrentTile([0, 0]);
    setBoard(mat);
    // document.addEventListener('keydown', detectKeyDown, true);
  },[])

  useImportScriptHook("./ei.js")
// console.log("alertList", alertList);


// const detectKeyDown = (e: KeyboardEvent) => {
//   console.log("Clicked", e.key);
//   const keyValue = e.key == 'Backspace' ? 'Delete' : e.key;
//   console.log("keyValue", keyValue);

//   const { attempt, letterPos } = currentAttempt || {};

//     console.log(keyValue, attempt, letterPos);
//     if (board !== undefined) {
//       if (keyValue === "Enter") {
//         if (attempt !== undefined && letterPos !== undefined) {
//           onEnterClick(attempt, letterPos);
//         }
//       } else if (keyValue === "Delete") {
//         if (attempt !== undefined && letterPos !== undefined) {
//           if (letterPos <= 0) return;
//           let newBoard = [...board];
//           newBoard[attempt][letterPos - 1] = { value: "", state: "" };
//           setBoard(newBoard);
//           setCurrentAttempt({ ...currentAttempt, letterPos: letterPos - 1 });
//         }
//       } else {
//         if (attempt !== undefined && letterPos !== undefined) {
//           if (letterPos > 4) return;
//           let newBoard = [...board];
//           // console.log("newBoard", board[attempt]);
//           newBoard[attempt][letterPos] = { value: keyValue, state: "" };
//           // console.log("haha", newBoard[attempt][letterPos].value);
//           setBoard(newBoard);
//           setCurrentAttempt({ ...currentAttempt, letterPos: letterPos + 1 });
//         }
//       }
//     }
//   };

// const onEnterClick = (attempt: number, letterPos: number) => {
//   if(board !== undefined){
//   if (letterPos !== 5) {
//     alertList && setAlertList([`Not Enough Letters`, ...alertList]);
//     return;
//   } else {
//     const word = board[attempt].map(({ value }) => value).join("").toLowerCase();
//     if(isWordInDictionary(word) && wordOfTheDay !== undefined){
//       if(word === wordOfTheDay){
//         const newBoard = [...board];
//         let newRow = [...board[attempt]].map((tile: TileObj): TileObj => {
//           return {...tile, state: "correct"};
//         });
//         newBoard[attempt] = newRow;
//         setBoard(newBoard);
//         alertList && setAlertList([`Thats Right!`, ...alertList]);
//       } else if(attempt === 5){
//         alertList && setAlertList([`Game Over`, ...alertList]);
//       } else {
//         const newBoard = [...board];

//         for (let index = 0; index < wordOfTheDay.length; index++) {
//           if(word[index] === wordOfTheDay[index]){
//             newBoard[attempt][index].state = "correct";
//           } else if(wordOfTheDay.includes(word[index])){
//             newBoard[attempt][index].state = 'wrong-position'
//           } else {
//             newBoard[attempt][index].state = "wrong";
//           }
//         }
//         if(keysState){
//           const newKeysState = [...keysState];
//           newBoard[attempt].map(({value, state}) => {
//             const index = newKeysState.findIndex(({keyValue, }) => keyValue === value);
//             newKeysState[index].state = state === 'active' ? "" : state;
//           })
//           setKeysState(newKeysState);
//         }

//         setBoard(newBoard);
//         setCurrentAttempt({
//           ...currentAttempt,
//           attempt: attempt + 1,
//           letterPos: 0,
//         });
//       }
//     } else {
//       alertList && setAlertList([`Word not in dictionary`, ...alertList]);
//     }
//   }
// }
// }

  return (
    <div className='App'>
      <AppContext.Provider value={{board, currentAttempt, alertList, keysState, setCurrentAttempt, setBoard, setAlertList, setKeysState, wordOfTheDay, showModal, setShowModal}}>
      <header className='App-header-module'>
        <div className="header-left">
        <FaHamburger/>
        </div>
        <div className='title'>
            Wordle
        </div>
        <div className="header-right">
        <FiSettings/>
        </div>
      </header>
      <div className="App-game-module">
      <div className='Board-module-container'>
        <Board/>
      </div>
      <div className="keyboard-container">
      <Keyboard/>
      </div>
      </div>  
        <div className="alert-container">
            {alertList.map((value: string, index: number) => {
              return <Alert key={value+index} data={value}/>
            })}
        </div>
       {showModal && (<div className='Modal-container'>
            <div className="Modal-content">
              <div className="close-icon" onClick={() => setShowModal(false)}>
            <GrClose/>
              </div>
              {/* <div className="card">
      <div className="outside">
        <div className="front">
          <p>Happy Birthday</p>
          <div className="cake">
            <div className="top-layer"></div>
            <div className="middle-layer"></div>
            <div className="bottom-layer"></div>
            <div className="candle"></div>
          </div>
        </div>
        <div className="back"></div>
      </div>
      <div className="inside">
        <p>Wishing you a very happy birthday filled with love and laughter</p>
        <h1>&#127873;</h1>
      </div>
    </div> */}

  <h1>Happy Birthday Mummy!!</h1>
  {/* <h1></h1> */}
  <canvas id="birthday"></canvas>


{/* <p className="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XKKYZW" data-user="arcs" >
  <span>See the Pen <a href="https://codepen.io/arcs/pen/XKKYZW">
  Happy Birthday</a> by Patrick Stillhart (<a href="https://codepen.io/arcs">@arcs</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script> */}
            </div>
        </div>)}
      </AppContext.Provider>
    </div>
  );
}

export default App;
