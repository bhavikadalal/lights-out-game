import React from "react";
import "./Light.css";

export default function Light({ isLit, onClick, isHint }) {
  return (
    <div
      className={`light ${isLit ? "on" : "off"} ${isHint ? "hint" : ""}`}
      onClick={onClick}
    />
  );
}
