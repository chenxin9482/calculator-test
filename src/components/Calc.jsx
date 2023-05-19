import { useReducer } from "react";
import "./Calc.css";
import { ACTIONS } from "@/constant";
import CalcButtion from "./CalcButtion";
import useCalc from "@/hooks/useCalc";
import useFormat from "@/hooks/useFormat";

function Calc() {
  const elemProps = [
    {
      value: "C",
      type: ACTIONS.CLEAR,
    },
    {
      value: "DEL",
      type: ACTIONS.DELETE,
    },
    {
      value: "÷",
      type: ACTIONS.OPERATION,
    },
    {
      value: "*",
      type: ACTIONS.OPERATION,
    },
    {
      value: "7",
      type: ACTIONS.DIGIT,
    },
    {
      value: "8",
      type: ACTIONS.DIGIT,
    },
    {
      value: "9",
      type: ACTIONS.DIGIT,
    },
    {
      value: "-",
      type: ACTIONS.OPERATION,
    },
    {
      value: "4",
      type: ACTIONS.DIGIT,
    },
    {
      value: "5",
      type: ACTIONS.DIGIT,
    },
    {
      value: "6",
      type: ACTIONS.DIGIT,
    },
    {
      value: "+",
      type: ACTIONS.OPERATION,
    },
    {
      value: "1",
      type: ACTIONS.DIGIT,
    },
    {
      value: "2",
      type: ACTIONS.DIGIT,
    },
    {
      value: "3",
      type: ACTIONS.DIGIT,
    },
    {
      value: "=",
      type: ACTIONS.EVALUATE,
      class: "rows-two orange",
    },
    {
      value: "0",
      type: ACTIONS.DIGIT,
      class: "columns-two",
    },
    {
      value: ".",
      type: ACTIONS.DIGIT,
    },
  ];
  const { reducer } = useCalc();
  const { formatOperand } = useFormat();
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: 0 }
  );

  return (
    <div className="calculator">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      {elemProps.map((item, index) => (
        <CalcButtion
          key={index}
          className={item.class}
          value={item.value}
          type={item.type}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}

export default Calc;
