import React, { createContext, useEffect, useState } from "react";
import Keyboard from "./components/keyboard";
import "./styles/App.css";
import Board from "./components/Board";
import Alert from "./components/Alert";
import dictionary from "./components/dictionary";
import menuIcon from "./assets/menu_icon.svg";
import settingsIcon from "./assets/settings_icon.svg";
import helpIcon from "./assets/help.svg";

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
  setBoard: React.Dispatch<React.SetStateAction<TileObj[][]>>;
  currentAttempt: CurrentAttemptInterface;
  setCurrentAttempt: React.Dispatch<
    React.SetStateAction<CurrentAttemptInterface>
  >;
  setAlertList: React.Dispatch<React.SetStateAction<string[]>>;
  alertList: string[];
  wordOfTheDay: string;
  keysState: KeyObj[];
  setKeysState: React.Dispatch<React.SetStateAction<KeyObj[]>>;
  keyClick: (keyValue: string) => void;
  gameStatus: "playing" | "won" | "lost";
}

export interface CurrentAttemptInterface {
  attempt: number;
  letterPos: number;
}

export const AppContext = createContext<AppContextInterface | null>(null);

function App() {
  // List of possible words for the game
  // const targetWords = [
  //   "reset",
  //   "world",
  //   "apple",
  //   "light",
  //   "house",
  //   "mouse",
  //   "ocean",
  //   "cloud",
  //   "brain",
  //   "smile",
  // ];

  // Randomly select a word of the day
  const wordOfTheDay = "house";

  const eTile: TileObj = {
    value: "",
    state: "",
  };

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
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );

  const mat = new Array(6).fill(null).map(() => new Array(5).fill(eTile));
  const [board, setBoard] = useState<TileObj[][]>(mat);
  const [alertList, setAlertList] = useState<string[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<CurrentAttemptInterface>(
    { attempt: 0, letterPos: 0 }
  );

  const isWordInDictionary = React.useCallback((word: string) => {
    return (
      dictionary.find((dictWord) => dictWord === word.toLowerCase()) !==
      undefined
    );
  }, []);

  const updateKeyboardState = React.useCallback(
    (attempt: number) => {
      const newKeysState = [...keysState];
      board[attempt].forEach(({ value, state }) => {
        const keyIndex = newKeysState.findIndex(
          ({ keyValue }) => keyValue.toLowerCase() === value.toLowerCase()
        );
        if (keyIndex !== -1) {
          // Only update the key state if the new state is more specific
          const currentKeyState = newKeysState[keyIndex].state;
          if (
            (state === "correct" && currentKeyState !== "correct") ||
            (state === "wrong-position" &&
              currentKeyState !== "correct" &&
              currentKeyState !== "wrong-position") ||
            (state === "wrong" && currentKeyState === "")
          ) {
            newKeysState[keyIndex].state = state;
          }
        }
      });
      setKeysState(newKeysState);
    },
    [keysState, board]
  );

  const onEnterClick = React.useCallback(
    (attempt: number, letterPos: number) => {
      // Check if the word is complete
      if (letterPos !== 5) {
        setAlertList(["Not Enough Letters"]);
        return;
      }

      // Get the current guess
      const word = board[attempt]
        .map(({ value }) => value)
        .join("")
        .toLowerCase();

      // Validate the word
      if (!isWordInDictionary(word)) {
        setAlertList(["Word not in dictionary"]);
        return;
      }

      // Create a copy of the solution word to track letter usage
      const solutionArray: Array<string | null> = wordOfTheDay.split("");
      const newBoard = [...board];

      // First pass: mark correct letters (green)
      board[attempt].forEach((tile, index) => {
        if (tile.value.toLowerCase() === solutionArray[index]) {
          newBoard[attempt][index].state = "correct";
          solutionArray[index] = null; // Mark as used
        }
      });

      // Second pass: mark wrong position letters (yellow)
      board[attempt].forEach((tile, index) => {
        if (newBoard[attempt][index].state === "") {
          const letterIndex = solutionArray.indexOf(tile.value.toLowerCase());
          if (letterIndex !== -1) {
            newBoard[attempt][index].state = "wrong-position";
            solutionArray[letterIndex] = null; // Mark as used
          } else {
            newBoard[attempt][index].state = "wrong";
          }
        }
      });

      // Update board and keyboard state
      setBoard(newBoard);
      updateKeyboardState(attempt);

      // Check win/lose conditions
      if (word === wordOfTheDay) {
        setGameStatus("won");
        setAlertList(["Congratulations! You won!"]);
        return;
      }

      // Move to next attempt or end game
      if (attempt === 5) {
        setGameStatus("lost");
        setAlertList([`Game Over! The word was ${wordOfTheDay.toUpperCase()}`]);
        return;
      }

      // Move to next attempt
      setCurrentAttempt((prev) => ({
        attempt: attempt + 1,
        letterPos: 0,
      }));
    },
    [
      board,
      setBoard,
      setAlertList,
      updateKeyboardState,
      setCurrentAttempt,
      wordOfTheDay,
      isWordInDictionary,
    ]
  );

  const keyClick = React.useCallback(
    (keyValue: string) => {
      // Do nothing if game is over
      if (gameStatus !== "playing") return;

      const { attempt, letterPos } = currentAttempt;

      if (keyValue === "ENTER") {
        onEnterClick(attempt, letterPos);
      } else if (keyValue === "DELETE") {
        if (letterPos > 0) {
          let newBoard = [...board];
          newBoard[attempt][letterPos - 1] = { value: "", state: "" };
          setBoard(newBoard);
          setCurrentAttempt({ ...currentAttempt, letterPos: letterPos - 1 });
        }
      } else {
        if (letterPos < 5) {
          let newBoard = [...board];
          newBoard[attempt][letterPos] = { value: keyValue, state: "" };
          setBoard(newBoard);
          setCurrentAttempt({ ...currentAttempt, letterPos: letterPos + 1 });
        }
      }
    },
    [
      board,
      currentAttempt,
      onEnterClick,
      setBoard,
      setCurrentAttempt,
      gameStatus,
    ]
  );

  const keyBoardKeyClick = React.useCallback(
    ({ key }: KeyboardEvent) => {
      const keyValue =
        key === "Backspace" ? "DELETE" : key === "Enter" ? "ENTER" : key;

      if (keyValue.length > 1 && !["DELETE", "ENTER"].includes(keyValue))
        return;
      if (keyValue === " ") return;

      keyClick(keyValue.toUpperCase());
    },
    [keyClick]
  );

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
          <img src={settingsIcon} alt="Settings Icon" className="menu-icon" />
          <img src={helpIcon} alt="Help Icon" className="menu-icon" />
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
          gameStatus,
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
