import React, { useState } from "react";
import Box from "./Box";

function UseCallBack2() {
  const [size, setSizes] = useState(100);
  const [isDark, setIsDark] = useState(false);

  const createBoxStyle = () => {
    return {
      backgroundColor: "pink",
      width: `${size}px`,
      height: `${size}px`,
    };
  };

  return (
    <div
      style={{
        background: isDark ? "black" : "white",
      }}
    >
      <input
        type="number"
        value={size}
        onChange={(e) => setSizes(e.target.value)}
      />
      <button onClick={() => setIsDark(!isDark)}>다크 모드</button>
      <Box createBoxStyle={createBoxStyle} />
    </div>
  );
}

export default UseCallBack2;
