import { chain, add, subtract, multiply, divide } from "mathjs";
import { ACTIONS } from "@/constant";

export default function useCalc() {
  /**
   * @param state 组件状态
   * @param action {type payload} 执行操作类型 所属的值
   * @returns state
   */
  function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload.value,
            overwrite: false,
          };
        }
        if (payload.value === "0" && state.currentOperand === "0") {
          return state;
        }
        if (payload.value === ".") {
          if (!state.currentOperand) {
            return {
              ...state,
              currentOperand: `0.`,
            };
          } else if (state.currentOperand?.includes(".")) {
            return state;
          }
        }
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.value}`,
        };
      case ACTIONS.OPERATION:
        if (!state.currentOperand && !state.previousOperand) {
          return state;
        }

        if (!state.currentOperand) {
          return {
            ...state,
            operation: payload.value,
          };
        }
        if (!state.previousOperand) {
          return {
            ...state,
            operation: payload.value,
            previousOperand: state.currentOperand,
            currentOperand: null,
          };
        } else if (state.previousOperand != parseFloat(state.previousOperand)) {
          return {
            ...state,
            operation: payload.value,
            previousOperand: parseFloat(state.currentOperand).toString(),
            currentOperand: null,
          };
        }

        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.value,
          currentOperand: null,
        };
      case ACTIONS.CLEAR:
        return {};
      case ACTIONS.DELETE:
        if (state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOperand: null,
          };
        }
        if (state.currentOperand === null) return state;
        if (state.currentOperand.length === 1) {
          return { ...state, currentOperand: null };
        }
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        };
      case ACTIONS.EVALUATE:
        if (!state.operation || !state.currentOperand || !state.previousOperand)
          return state;
        if (state.previousOperand != parseFloat(state.previousOperand))
          return state;
        return {
          ...state,
          overwrite: true,
          operation: payload.value,
          previousOperand: `${state.previousOperand} ${state.operation} ${state.currentOperand}`,
          currentOperand: evaluate(state),
        };
    }
  }
  /**
   * 
   * @param currentOperand 当前值
   * @param previousOperand 保存值
   * @param operation 执行操作
   * @returns calcResult:string
   */
  function evaluate({ currentOperand, previousOperand, operation }) {
    const previous = Number(previousOperand);
    const current = Number(currentOperand);
    if (!operation) return current;
    if (isNaN(previous) || isNaN(current)) return "";
    let computation = "";
    switch (operation) {
      case "+":
        computation = chain(previous).add(current).done();
        break;
      case "-":
        computation = chain(previous).subtract(current).done();
        break;
      case "*":
        computation = chain(previous).multiply(current).done();
        break;
      case "÷":
        computation = chain(previous).divide(current).done();
        break;
    }

    return computation.toString();
  }

  return { reducer, evaluate };
}
