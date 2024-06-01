/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./GameCircle.css";

const GameCircle = ({ id, onCircleClicked, colur, className }) => {
  return (
    <div
      onClick={() => onCircleClicked(id)}
      className={`circle ` + className}
      style={{ backgroundColor: colur }}
    ></div>
  );
};

export default GameCircle;
