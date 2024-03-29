import { SyntheticEvent, useContext, useEffect, useRef } from "react";
import { AppContext, CurrentAttemptInterface, KeyObj, TileObj } from "../App";
import dictionary from "./dictionary";
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
    wordOfTheDay,
    keysState,
    setKeysState,
    keyClick,
  } = appContext || {};

  const { keyValue, state } = props;
  const stateForClass =
    keyValue == "ENTER" || keyValue == "DELETE" ? "large" : state;

//   const keyClick = (keyValue: string) => {
//     const { attempt, letterPos } = currentAttempt || {};

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

//   const onEnterClick = (attempt: number, letterPos: number) => {
//     if(board !== undefined){
//     if (letterPos !== 5) {
//       i++;
//       alertList && setAlertList([`Not Enough Letters`]);
//       return;
//     } else {
//       const word = board[attempt].map(({ value }) => value).join("").toLowerCase();
//       if(isWordInDictionary(word) && wordOfTheDay !== undefined){
//         if(word === wordOfTheDay){
//           const newBoard = [...board];
//           let newRow = [...board[attempt]].map((tile: TileObj): TileObj => {
//             return {...tile, state: "correct"};
//           });
//           newBoard[attempt] = newRow;
//           setBoard(newBoard);
//           alertList && setAlertList([`Thats Right!`]);
//         } else if(attempt === 5){
//           alertList && setAlertList([`Game Over`]);
//         } else {
//           const newBoard = [...board];
  
//           for (let index = 0; index < wordOfTheDay.length; index++) {
//             if(word[index] === wordOfTheDay[index]){
//               newBoard[attempt][index].state = "correct";
//             } else if(wordOfTheDay.includes(word[index])){
//               newBoard[attempt][index].state = 'wrong-position'
//             } else {
//               newBoard[attempt][index].state = "wrong";
//             }
//           }
//           if(keysState){
//             const newKeysState = [...keysState];
//             newBoard[attempt].map(({value, state}) => {
//               const index = newKeysState.findIndex(({keyValue, }) => keyValue === value);
//               newKeysState[index].state = state === 'active' ? "" : state;
//             })
//             setKeysState(newKeysState);
//           }

//           setBoard(newBoard);
//           setCurrentAttempt({
//             ...currentAttempt,
//             attempt: attempt + 1,
//             letterPos: 0,
//           });
//         }
//       } else {
//         alertList && setAlertList([`Word not in dictionary`]);
//       }
//     }
//   }
// }

  return (
    <button
      onClick={() => keyClick(keyValue)}
      className={`key ${stateForClass}`}
    >
      {keyValue !== "DELETE" ? (
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
