import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../App';
import './../styles/keyboard.css'
import Key from './Key';


const Keyboard = () => {
  const ref = useRef<HTMLDivElement>(null);
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
  } = appContext || {};
 
  
  // useEffect(() => {
  //   const handleClick = (e:MouseEvent) => {
  //     console.log("clicked", e.target); 
  //   }
  //   const {current: element} = ref;

  //   element?.addEventListener('click', handleClick);

  //   return () => {
  //     element?.removeEventListener('click', handleClick);
  //   };
  // },[])


  return (
    <>
      <div ref={ref} className="keyboard">
        {keysState?.map(({keyValue, state}) => {
          if(keyValue == 'A'){
            return <><div className="space"></div><Key keyValue={keyValue} state={state}/></>
          }
        return <Key keyValue={keyValue} state={state}/>
        })}
      </div>
    </>
  );
};

export default Keyboard;

/*
  <div ref={ref} className="keyboard">
          <button className="key" data-key="Q">
            Q
          </button>
          <button className="key" data-key="W">
            W
          </button>
          <button className="key" data-key="E">
            E
          </button>
          <button className="key" data-key="R">
            R
          </button>
          <button className="key" data-key="T">
            T
          </button>
          <button className="key" data-key="Y">
            Y
          </button>
          <button className="key" data-key="U">
            U
          </button>
          <button className="key" data-key="I">
            I
          </button>
          <button className="key" data-key="O">
            O
          </button>
          <button className="key" data-key="P">
            P
          </button>
            <div className="space"></div>
          <button className="key wrong-location" data-key="A">
            A
          </button>
          <button className="key" data-key="S">
            S
          </button>
          <button className="key" data-key="D">
            D
          </button>
          <button className="key right" data-key="F">
            F
          </button>
          <button className="key" data-key="G">
            G
          </button>
          <button className="key" data-key="H">
            H
          </button>
          <button className="key" data-key="J">
            J
          </button>
          <button className="key wrong" data-key="K">
            K
          </button>
          <button className="key" data-key="L">
            L
          </button>
          <div className="space"></div>
        
          <button className="key large" data-enter>
            Enter
          </button>
          <button className="key" data-key="Z">
            Z
          </button>
          <button className="key" data-key="X">
            X
          </button>
          <button className="key" data-key="C">
            C
          </button>
          <button className="key" data-key="V">
            V
          </button>
          <button className="key" data-key="B">
            B
          </button>
          <button className="key" data-key="N">
            N
          </button>
          <button className="key" data-key="M">
            M
          </button>
          <button className="key large" data-delete>
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
          </button>
      </div>

*/