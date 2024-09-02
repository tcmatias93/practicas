export type Operation = "multuply" | "add" | "divide";
type Result = number | string;

const calculator = (a: number, b: number, op: Operation): Result => {
  if (op === "multuply") {
    return a * b;
  } else if (op === "add") {
    return a + b;
  } else if (op === "divide") {
    if (b === 0) return "Can t divide by 0!";
    return a / b;
  }
};

calculator(1, 2, "add");

export const calculator1 = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multuply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

try {
  console.log(calculator1(1, 5, "divide"));
} catch (error: unknown) {
  let errorMessagge = "Something went wrong";
  if (error instanceof Error) {
    errorMessagge += error.message;
  }
  console.log(errorMessagge);
}
