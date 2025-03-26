import React, { createContext, useEffect, useState } from "react";
import Keyboard from "./components/keyboard";
import "./styles/App.css";
import Board from "./components/Board";
import Alert from "./components/Alert";
import dictionary from "./components/dictionary";
import menuIcon from "./assets/menu_icon.svg"; // Import the SVG file
import settingsIcon from "./assets/settings_icon.svg"; // Import the SVG file
import helpIcon from "./assets/help.svg"; // Import the SVG file
// import lightbulbIcon from "./assets/lightbulb_2.svg"; // Import the SVG file
// import statsIcon from "./assets/equalizer.svg"; // Import the SVG file

export interface TileObj {
  value: string;
  state: "" | "active" | "wrong" | "correct" | "wrong-position";
}

export interface KeyObj {
  keyValue: string;
  state: "" | "wrong" | "correct" | "wrong-position";
}

export interface AppContextInterface {
  board: TileObj[][];
  setBoard: any;
  currentAttempt: CurrentAttemptInterface | null;
  setCurrentAttempt: any;
  setAlertList: any;
  alertList: string[];
  wordOfTheDay: string;
  keysState: KeyObj[];
  setKeysState: any;
  keyClick: any;
}

export interface CurrentAttemptInterface {
  attempt: number;
  letterPos: number;
}

export const AppContext = createContext<AppContextInterface | null>(null);

// const getTodaysWord = () => {
//   const timeNow = Date.now();
//   const startDate = new Date("1/1/2022");
//   const diffDays = Math.floor(
//     (timeNow - startDate.getTime()) / 1000 / 60 / 60 / 24
//   );
//   const diffHrs = 24 * diffDays;
//   // console.log("diffDays", targetWords[diffDays]);
//   // console.log("total words", targetWords.length);
//   // console.log("diffHrs", diffHrs);
//   return targetWords[diffDays];
// };

function App() {
  const wordOfTheDay = "onset";

  const eTile: TileObj = {
    value: "",
    state: "",
  };
  // const aTile: TileObj = {
  //   value: "",
  //   state: "active",
  // };
  // const wTile: TileObj = {
  //   value: "A",
  //   state: "wrong",
  // };
  // const cTile: TileObj = {
  //   value: "R",
  //   state: "correct",
  // };
  // const wpTile: TileObj = {
  //   value: "F",
  //   state: "wrong-position",
  // };
  const keysArray =
    "Q W E R T Y U I O P A S D F G H J K L ENTER Z X C V B N M DELETE".split(
      " "
    );
  const keysObjArray = keysArray.map((value): KeyObj => {
    return {
      keyValue: value,
      state: "",
    };
  });

  const [keysState, setKeysState] = useState(keysObjArray);

  const mat = new Array(6).fill(null).map((x) => new Array(5).fill(eTile));
  const [board, setBoard] = useState<TileObj[][]>(mat);
  const [alertList, setAlertList] = useState<string[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<CurrentAttemptInterface>(
    { attempt: 0, letterPos: 0 }
  );

  const keyClick = (keyValue: string) => {
    const { attempt, letterPos } = currentAttempt || {};

    console.log(keyValue, attempt, letterPos);
    if (board !== undefined) {
      if (keyValue === "ENTER") {
        if (attempt !== undefined && letterPos !== undefined) {
          onEnterClick(attempt, letterPos);
        }
      } else if (keyValue === "DELETE") {
        if (attempt !== undefined && letterPos !== undefined) {
          if (letterPos <= 0) return;
          let newBoard = [...board];
          newBoard[attempt][letterPos - 1] = { value: "", state: "" };
          setBoard(newBoard);
          setCurrentAttempt({ ...currentAttempt, letterPos: letterPos - 1 });
        }
      } else {
        if (attempt !== undefined && letterPos !== undefined) {
          if (letterPos > 4) return;
          let newBoard = [...board];
          // console.log("newBoard", board[attempt]);
          newBoard[attempt][letterPos] = { value: keyValue, state: "" };
          // console.log("haha", newBoard[attempt][letterPos].value);
          setBoard(newBoard);
          setCurrentAttempt({ ...currentAttempt, letterPos: letterPos + 1 });
        }
      }
    }
  };

  const isWordInDictionary = (Word: string) => {
    return dictionary.find((word) => word === Word) === undefined
      ? false
      : true;
  };

  const onEnterClick = (attempt: number, letterPos: number) => {
    if (board !== undefined) {
      if (letterPos !== 5) {
        alertList && setAlertList([`Not Enough Letters`]);
        return;
      } else {
        const word = board[attempt]
          .map(({ value }) => value)
          .join("")
          .toLowerCase();
        if (isWordInDictionary(word) && wordOfTheDay !== undefined) {
          if (word === wordOfTheDay) {
            const newBoard = [...board];
            let newRow = [...board[attempt]].map((tile: TileObj): TileObj => {
              return { ...tile, state: "correct" };
            });
            newBoard[attempt] = newRow;
            setBoard(newBoard);
            alertList && setAlertList([`Thats Right!`]);
          } else if (attempt === 5) {
            alertList && setAlertList([`Game Over`]);
          } else {
            const newBoard = [...board];
            const guessArray = newBoard[attempt].map((element) => {
              return { key: element.value.toLowerCase(), state: "grey" };
            });
            const solutionArray: any[] = [];
            for (let index = 0; index < wordOfTheDay.length; index++) {
              solutionArray.push(wordOfTheDay[index]);
              newBoard[attempt][index].state = "wrong";
            }
            console.log("guessAr, solAr", guessArray, solutionArray);

            // for (let index = 0; index < wordOfTheDay.length; index++) {
            //   if(word[index] === wordOfTheDay[index]){
            //     newBoard[attempt][index].state = "correct";
            //     console.log("word[index]", word[index], newBoard[attempt][index].state);
            //   } else if(wordOfTheDay.includes(word[index])){
            //     newBoard[attempt][index].state = 'wrong-position'
            //   } else {
            //     newBoard[attempt][index].state = "wrong";
            //   }
            // }

            guessArray.forEach((letter, index) => {
              if (solutionArray[index] === letter.key) {
                console.log("correct", letter.key);
                newBoard[attempt][index].state = "correct";
                letter.state = "green";
                solutionArray[index] = null;
              }
            });

            guessArray.forEach((letter, index) => {
              if (
                solutionArray.includes(letter.key) &&
                letter.state !== "green"
              ) {
                console.log("yellow", letter.key);
                newBoard[attempt][index].state = "wrong-position";
                solutionArray[solutionArray.indexOf(letter.key)] = null;
              }
            });

            if (keysState) {
              const newKeysState = [...keysState];
              console.log("newKeysState", newKeysState);

              newBoard[attempt].map(({ value, state }) => {
                const index = newKeysState.findIndex(
                  ({ keyValue }) => keyValue === value
                );
                console.log("inside", value, state, index);
                // console.log("newKeysState", newKeysState[index].state);
                newKeysState[index].state = state === "active" ? "" : state;
                return null;
              });
              setKeysState(newKeysState);
            }

            setBoard(newBoard);
            setCurrentAttempt({
              ...currentAttempt,
              attempt: attempt + 1,
              letterPos: 0,
            });
          }
        } else {
          alertList && setAlertList([`Word not in dictionary`]);
        }
      }
    }
  };

  const keyBoardKeyClick = React.useCallback(
    ({ key }: KeyboardEvent) => {
      console.log("key", key);
      const keyValue = key === "Backspace" ? "Delete" : key;
      if (keyValue !== "Enter" && keyValue !== "Delete" && keyValue.length > 1)
        return;
      if (keyValue === " ") return;
      keyClick(keyValue.toUpperCase());
    },
    [keyClick]
  );

  useEffect(() => {
    setBoard(mat);
  }, [mat]);

  useEffect(() => {
    window.addEventListener("keyup", keyBoardKeyClick);

    return () => window.removeEventListener("keyup", keyBoardKeyClick);
  }, [keyBoardKeyClick]);

  return (
    <div className="App">
      <header className="App-header-module">
        <div className="header-left">
          <img src={menuIcon} alt="Menu Icon" className="menu-icon" />
        </div>
        <div className="title">Wordle</div>
        <div className="header-right">
          <img src={settingsIcon} alt="Menu Icon" className="menu-icon" />
          {/* <img src={lightbulbIcon} alt="Menu Icon" className="menu-icon" />
          <img src={statsIcon} alt="Menu Icon" className="menu-icon" /> */}
          <img src={helpIcon} alt="Menu Icon" className="menu-icon" />
        </div>
      </header>
      <AppContext.Provider
        value={{
          board,
          currentAttempt,
          alertList,
          keysState,
          setCurrentAttempt,
          setBoard,
          setAlertList,
          setKeysState,
          wordOfTheDay,
          keyClick,
        }}
      >
        <div className="App-game-module">
          <div className="Board-module-container">
            <Board />
          </div>
          <div className="keyboard-container">
            <Keyboard />
          </div>
        </div>
        <div className="alert-container">
          {alertList.map((value: string, index) => {
            return <Alert key={index + value} data={value} />;
          })}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
