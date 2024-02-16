type Operation = "multiply" | "add" | "divide";

const calculator = (a: number, b: number, op: Operation): number => {
  if (op === "multiply") {
    return a * b;
  } else if (op === "add") {
    return a + b;
  } else if (op === "divide") {
    if (b === 0) {
      throw new Error("Can't divide by 0!");
    }
    return a / b;
  } else {
    throw new Error("Unsupported operation");
  }
};

try {
  console.log(calculator(1, 5, "divide"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    // type narrowing so we can use error.message
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
