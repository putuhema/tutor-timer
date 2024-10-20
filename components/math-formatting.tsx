type Props = {
  operator: string;
  firstNum: number;
  secondNum?: number | undefined;
  result: number;
}
export default function MathFormatting({ operator, firstNum, secondNum, result }: Props) {
  switch (operator) {
    case "divide":
      return Divide(firstNum, secondNum!, result);
    case "multiply":
      return Multiply(firstNum, secondNum!, result);
    case "pow":
      return Pow(firstNum, result);
    case "sqrt":
      return Sqrt(firstNum, result);
    default:
      return <div>
        <p>{firstNum} {operator} {secondNum} = {result}</p>
      </div>
  }
}

function Divide(firstNum: number, secondNum: number, result: number) {
  return (
    <div>
      <p>{firstNum} : {secondNum} = <span className="font-bold">{result}</span></p>
    </div>
  )
}



function Multiply(firstNum: number, secondNum: number, result: number) {
  return (
    <div>
      <p>{firstNum} x {secondNum} = <span className="font-bold">{result}</span></p>
    </div>
  )
}


function Sqrt(firstNum: number, result: number) {
  return (
    <div className="grid grid-cols-3 w-full ">
      <p>√ {firstNum}</p>
      <p className="text-center">=</p>
      <p className="font-bold">{result}</p>
    </div>
  )
}

function Pow(firstNum: number, result: number) {
  return (
    <div className="grid grid-cols-3 w-full ">
      <p>{firstNum} <sup>2</sup> </p>
      <p className="text-center">=</p>
      <p className="font-bold">{result}</p>
    </div>
  )
}