import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import "./../styles/keyboard.css";
import Key from "./Key";

const Keyboard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const appContext = useContext(AppContext);
  const { keysState } = appContext || {};

  return (
    <>
      <div ref={ref} className="keyboard">
        {keysState?.map(({ keyValue, state }) => {
          if (keyValue == "A") {
            return (
              <>
                <div className="space"></div>
                <Key keyValue={keyValue} state={state} />
              </>
            );
          }
          return <Key keyValue={keyValue} state={state} />;
        })}
      </div>
    </>
  );
};

export default Keyboard;
