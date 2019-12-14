export class IntCodeComputerV2 {
  public executionHalted = false;
  public executionPaused: boolean = true;
  public currentOutput: string;
  public outputs: string[] = [];
  public lastVisitedIndex = 0;
  public pointer: number = 0;
  public instructions: string[];

  private inputSignals: string[] = [];
  private relativeBase: string = "0";

  constructor(instructions: string[]) {
    this.instructions = [...instructions];
  }

  execute(): string {
    this.executionPaused = false;

    while (!this.executionPaused && !this.executionHalted) {
      const [opCode, parameterModes] = this.parseOpCode(
        this.instructions[this.pointer]
      );
      this.processInstruction(this.pointer, opCode, parameterModes);
      this.lastVisitedIndex = this.pointer;
    }

    return this.currentOutput;
  }

  enqueueInput(...inputs: any[]): IntCodeComputerV2 {
    this.inputSignals.push(...inputs.map(i => i.toString()));
    return this;
  }

  private getCurrentInput(): string {
    return this.inputSignals.shift();
  }

  private parseOpCode(code: string): [number, string[]] {
    const codeStr = code.toString();
    const opCode = codeStr.slice(-2);
    const parameterModes = codeStr
      .slice(0, -2)
      .split("")
      .reverse();
    return [Number(opCode), parameterModes];
  }

  private processInstruction(
    index: number,
    opCode: number,
    parameterModes: string[]
  ): void {
    const [firstParameter, secondParameter] = this.getParameters(
      parameterModes
    );

    switch (opCode) {
      case 1: {
        if (
          parameterModes.length >= 3 &&
          parameterModes[parameterModes.length - 1] === "2"
        ) {
          this.instructions[
            (
              BigInt(this.instructions[index + 3]) + BigInt(this.relativeBase)
            ).toString()
          ] = (BigInt(firstParameter) + BigInt(secondParameter)).toString();
        } else {
          this.instructions[this.instructions[index + 3]] = (
            BigInt(firstParameter) + BigInt(secondParameter)
          ).toString();
        }

        this.pointer = index + 4;
        break;
      }

      case 2: {
        if (
          parameterModes.length >= 3 &&
          parameterModes[parameterModes.length - 1] === "2"
        ) {
          this.instructions[
            (
              BigInt(this.instructions[index + 3]) + BigInt(this.relativeBase)
            ).toString()
          ] = (BigInt(firstParameter) * BigInt(secondParameter)).toString();
        } else {
          this.instructions[this.instructions[index + 3]] = (
            BigInt(firstParameter) * BigInt(secondParameter)
          ).toString();
        }
        this.pointer = index + 4;
        break;
      }

      case 3: {
        const input = this.getCurrentInput();
        if (!input) {
          this.executionPaused = true;
        } else {
          const parameter = parameterModes[0];
          if (parameter === "2") {
            this.instructions[
              (
                BigInt(this.instructions[index + 1]) + BigInt(this.relativeBase)
              ).toString()
            ] = input;
          } else {
            this.instructions[this.instructions[index + 1]] = input;
          }
          this.pointer = index + 2;
        }
        break;
      }

      case 4: {
        // if (!this.inputSignals.length) {
        //   this.executionPaused = true;
        // }
        const parameter = this.getParameter(parameterModes[0], 1);
        this.outputs.push(parameter);
        this.currentOutput = parameter;
        this.pointer = index + 2;
        break;
      }

      case 5: {
        this.pointer =
          firstParameter === "0" ? index + 3 : Number(secondParameter);
        break;
      }

      case 6: {
        this.pointer =
          firstParameter !== "0" ? index + 3 : Number(secondParameter);
        break;
      }

      case 7: {
        if (
          parameterModes.length >= 3 &&
          parameterModes[parameterModes.length - 1] === "2"
        ) {
          this.instructions[
            (
              BigInt(this.instructions[index + 3]) + BigInt(this.relativeBase)
            ).toString()
          ] = BigInt(firstParameter) < BigInt(secondParameter) ? "1" : "0";
        } else {
          this.instructions[this.instructions[index + 3]] =
            BigInt(firstParameter) < BigInt(secondParameter) ? "1" : "0";
        }

        this.pointer = index + 4;
        break;
      }

      case 8: {
        if (
          parameterModes.length >= 3 &&
          parameterModes[parameterModes.length - 1] === "2"
        ) {
          this.instructions[
            (
              BigInt(this.instructions[index + 3]) + BigInt(this.relativeBase)
            ).toString()
          ] = firstParameter === secondParameter ? "1" : "0";
        } else {
          this.instructions[this.instructions[index + 3]] =
            firstParameter === secondParameter ? "1" : "0";
        }
        this.pointer = index + 4;
        break;
      }

      case 9: {
        this.relativeBase = (
          BigInt(this.relativeBase) + BigInt(firstParameter)
        ).toString();
        this.pointer = index + 2;
        break;
      }

      case 99: {
        this.executionHalted = true;
        break;
      }

      default: {
        this.executionHalted = true;
        throw new Error("Opcode invalid.");
      }
    }
  }

  private getParameters(parameterModes: string[]): string[] {
    let parameters: string[] = [];
    for (let i = 0; i < 3; i++) {
      parameters[i] = this.getParameter(parameterModes[i], i + 1);
    }
    return parameters;
  }

  private getParameter(parameterMode = "0", i: number): string {
    const nextElement = this.instructions[this.pointer + i];

    switch (parameterMode) {
      case "0": {
        return (this.instructions[nextElement] =
          this.instructions[nextElement] || "0");
      }

      case "1": {
        return nextElement;
      }

      case "2": {
        const nextIndex = (
          BigInt(this.relativeBase) + BigInt(nextElement)
        ).toString();
        return (this.instructions[nextIndex] =
          this.instructions[nextIndex] || "0");
      }
    }
  }
}
