/**
 * @param operand 需要格式化的值
 * @returns formattedResult:string
 */
export default function useFormat() {
  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us");
  const formatOperand = (operand) => {
    if (!operand) return;
    const [integer, decimal] = operand.toString().split(".");
    if (decimal === null || decimal === undefined)
      return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
  };
  return { formatOperand };
}
