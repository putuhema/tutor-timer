import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(date: Date | null) {
  if (!date) return "Not Started";
  return date.toLocaleString("id-ID", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function formatTimeRange(
  start: Date | null,
  end: Date | null
) {
  if (!start || !end) return "Not Started";
  return `${formatDateTime(start)} - ${formatDateTime(
    end
  )}`;
}

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export function formatTimestamp(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return hours
    ? `${hours}h`
    : minutes
    ? `${minutes}m`
    : `${remainingSeconds}s`;
}

interface CalculationResult {
  result: number;
  operation: string;
}

export function calculatePrisma(
  input: number,
  operators: string[],
  numbers: number[]
): CalculationResult {
  // Validate inputs
  if (
    input < 2 ||
    input > 4 ||
    operators.length < 1 ||
    operators.length > 3
  ) {
    throw new Error("Invalid input parameters");
  }

  // Helper function to get operator symbol
  const getOperatorSymbol = (op: string): string => {
    switch (op) {
      case "add":
        return "+";
      case "subtract":
        return "-";
      case "multiply":
        return "×";
      case "divide":
        return ":";
      case "sqrt":
        return "√";
      case "pow":
        return "²";
      default:
        throw new Error("Invalid operator");
    }
  };

  // Handle single operator calculations
  if (operators.length === 1) {
    let result: number;
    let operation: string;

    switch (operators[0]) {
      case "add":
        result = numbers.reduce(
          (acc, curr) => acc + curr,
          0
        );
        operation = numbers.join("+");
        break;
      case "subtract":
        result = numbers.reduce(
          (acc, curr, index) =>
            index === 0 ? curr : acc - curr,
          0
        );
        operation = numbers.join("-");
        break;
      case "multiply":
        result = numbers.reduce(
          (acc, curr) => acc * curr,
          1
        );
        operation = numbers.join("×");
        break;
      case "divide":
        result = numbers.reduce(
          (acc, curr, index) =>
            index === 0 ? curr : acc / curr,
          0
        );
        operation = numbers.join(":");
        break;
      case "sqrt":
        result = Math.sqrt(numbers[0]);
        operation = `√${numbers[0]}`;
        break;
      case "pow":
        result = Math.pow(numbers[0], 2);
        operation = `${numbers[0]}²`;
        break;
      default:
        throw new Error("Invalid operator");
    }

    return { result, operation };
  }

  // Handle multiple operators
  let result = numbers[0];
  let operation = numbers[0].toString();

  for (let i = 0; i < operators.length; i++) {
    const currentOperator = operators[i];
    const nextNumber = numbers[i + 1];
    const operatorSymbol =
      getOperatorSymbol(currentOperator);

    operation += operatorSymbol + nextNumber;

    switch (currentOperator) {
      case "add":
        result += nextNumber;
        break;
      case "subtract":
        result -= nextNumber;
        break;
      case "multiply":
        result *= nextNumber;
        break;
      case "divide":
        result /= nextNumber;
        break;
      default:
        throw new Error(
          `Invalid operator: ${currentOperator}`
        );
    }
  }

  return { result, operation };
}

export const formatNumber = (
  num: number,
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale).format(num);
};
