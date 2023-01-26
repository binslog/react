import React, { useState } from "react";
import OddEvenResult from "./OddEvenResult";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={increaseCount}> + </button>
      <button onClick={decreaseCount}> - </button>
      <OddEvenResult count={count} />
    </div>
  );
};

export default Counter;
