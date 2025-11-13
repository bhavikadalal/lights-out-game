import React from "react";
import Light from "./Light";

export default function Grid({ lights, onLightClick, hintIndex }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 50px)", justifyContent: "center" }}>
      {lights.map((isLit, idx) => (
        <Light
          key={idx}
          isLit={isLit}
          onClick={() => onLightClick(idx)}
          isHint={idx === hintIndex}
        />
      ))}
    </div>
  );
}
