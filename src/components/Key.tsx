import { SyntheticEvent, useContext, useEffect, useRef } from "react";
import { AppContext, CurrentAttemptInterface } from "../App";
let i = 0;
const Key = (props: { keyValue: string; state: string }) => {
  const appContext = useContext(AppContext);
  const {
    board,
    setBoard,
    currentAttempt,
    setCurrentAttempt,
    alertList,
    setAlertList,
  } = appContext || {};

  const { keyValue, state } = props;
  const stateForClass =
    keyValue == "Enter" || keyValue == "Delete" ? "large" : state;

  const keyClick = (e: SyntheticEvent, keyValue: string) => {
    const { attempt, letterPos } = currentAttempt || {};

    console.log(keyValue, attempt, letterPos);
    if (board !== undefined) {
      if (keyValue === "Enter") {
        if (attempt !== undefined && letterPos !== undefined) {
          if (letterPos !== 5) {
            // alertList && setAlertList(["Not Enought Letters", ...alertList]);
            i++;
             alertList && setAlertList([`Not Enough Letters`, ...alertList])
          } else {
            setCurrentAttempt({
              ...currentAttempt,
              attempt: attempt + 1,
              letterPos: 0,
            });
          }
        }
      } else if (keyValue === "Delete") {
        if (attempt !== undefined && letterPos !== undefined) {
          if (letterPos < 0) return;
          let newBoard = [...board];
          newBoard[attempt][letterPos - 1] = { value: "", state: "" };
          setBoard(newBoard);
          setCurrentAttempt({ ...currentAttempt, letterPos: letterPos - 1 });
        }
      } else {
        if (attempt !== undefined && letterPos !== undefined) {
          if (letterPos > 4) return;
          let newBoard = [...board];
          console.log("newBoard", board[attempt]);
          newBoard[attempt][letterPos] = { value: keyValue, state: "" };
          console.log("haha", newBoard[attempt][letterPos].value);
          setBoard(newBoard);
          setCurrentAttempt({ ...currentAttempt, letterPos: letterPos + 1 });
        }
        // if(y < 5){
        //     const newBoard = board || [];
        //     newBoard[x][y] = {...board[x][y], value: keyValue};
        //     setBoard(newBoard);
        //     setCurrentTile([x, y+1]);
        // }
      }
    }
  };

  return (
    <button
      onClick={(e) => keyClick(e, keyValue)}
      className={`key ${stateForClass}`}
    >
      {keyValue !== "Delete" ? (
        keyValue
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            fill="var(--color-tone-1)"
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default Key;
