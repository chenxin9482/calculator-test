import React from "react";

export default function CalcButtion({className, value, type, dispatch }) {
  return (
    <button className={className} onClick={() => dispatch({ type, payload: { value } })}>
      {value}
    </button>
  );
}
