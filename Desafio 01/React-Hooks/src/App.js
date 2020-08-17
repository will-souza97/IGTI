import React, { useState, useEffect } from "react";
import { getNewTimeStamp } from "./helpers/dataTimeHelper";

export default function App() {
  const [clickArray, setClickArray] = useState([]);

  useEffect(() => {
    if (clickArray.length != 0) {
      document.title = clickArray.length;
    }
  });

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);
    newClickArray.push(getNewTimeStamp());
    setClickArray(newClickArray);
  };

  return (
    <div>
      <h1>React e Class Components</h1>

      <button onClick={handleClick}>Clique Aqui</button>

      <ul>
        {clickArray.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
