import React, { useState, useEffect, useRef } from 'react';

function StartButton() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  function Timer() {
    setIsRunning(true);
    intervalRef.current = setInterval(() => setCount((c) => c + 1), 1000);
    console.log(count);
  }

  function Pause() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  return(
    <>
     <button onClick={Timer}>START</button>
     <button onClick={Pause}>PAUSE</button>
     <p>{count}</p>
     {isRunning ? (
      <p>Activate</p>
     ): (
      <p>Pause</p>
     )}
    </>
  );
}

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      <h1>Welcome to my app</h1>
      <StartButton/>
     
      {(typeof data.members === 'undefined') ? (
        <p>Loadng ...</p>
      ): (
        data.members.map((mambers, i) => (
          <p key={i}>{mambers}</p>
        ))
      )}

    </div>
  )
}

export default App
