
export class IntCodeComputer {
  public executionHalted = false;
  private currentOutput: number = null;
  private inputSignals: number[] = [];
  private currentInstructionIndex: number = 0;
  private instructions: number[];
  private executionPaused: boolean = true;
  private relativeBase: number = 0;

  constructor(instructions: number[]) {
    this.instructions = [...instructions];
  }

  execute(): number {
    this.executionPaused = false;

    while (!this.executionPaused && !this.executionHalted) {
      const [opCode, parameterModes] = this.parseOpCode(this.instructions[this.currentInstructionIndex]);
      this.processInstruction(this.currentInstructionIndex, opCode, parameterModes);
    }

    return this.currentOutput;
  }

  enqueueInput(...inputs: number[]): IntCodeComputer {
    this.inputSignals.push(...inputs);
    return this;
  }

  private getCurrentInput(): number {
    return this.inputSignals.shift();
  }

  private parseOpCode(code: number): [number, string[]] {
    const codeStr = code.toString();
    const opCode = Number(codeStr.slice(-2));
    const parameterModes = codeStr.slice(0, -2).split("").reverse();
    return [Number(opCode), parameterModes];
  }

  private processInstruction(index: number, opCode: number, parameterModes: string[]): void {
    const [firstParameter, secondParameter] = this.getParameters(parameterModes);

    switch (opCode) {
      case 1: {
        this.instructions[this.instructions[index + 3]] = firstParameter + secondParameter;
        this.currentInstructionIndex = index + 4;
        break;
      }

      case 2: {
        this.instructions[this.instructions[index + 3]] = firstParameter * secondParameter;
        this.currentInstructionIndex = index + 4;
        break;
      }

      case 3: {
        const input = this.getCurrentInput();
        if (input == null) {
          this.executionPaused = true;
        } else {
          this.instructions[this.instructions[index + 1]] = input;
          this.currentInstructionIndex = index + 2;
        }
        break;
      }

      case 4: {
        if (!this.inputSignals.length) {
          this.executionPaused = true;
        }

        const parameter = this.getParameter(parameterModes[0], 1);
        this.currentOutput = parameter;

        this.currentInstructionIndex = index + 2;
        // this.currentOutput = (parameterModes[0] || "0") === "0" ? this.instructions[this.instructions[index + 1]] : this.instructions[index + 1];
        break;
      }

      case 5: {
        this.currentInstructionIndex = firstParameter === 0 ? index + 3 : secondParameter;
        break;
      }

      case 6: {
        this.currentInstructionIndex = firstParameter !== 0 ? index + 3 : secondParameter;
        break;
      }

      case 7: {
        this.instructions[this.instructions[index + 3]] = firstParameter < secondParameter ? 1 : 0;
        this.currentInstructionIndex = index + 4;
        break;
      }

      case 8: {
        this.instructions[this.instructions[index + 3]] = firstParameter === secondParameter ? 1 : 0;
        this.currentInstructionIndex = index + 4;
        break;
      }

      case 9: {
        this.relativeBase = this.relativeBase + firstParameter;
        this.currentInstructionIndex = index + 2;
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

  private getParameters(parameterModes: string[]): number[] {
    let parameters: number[] = [];
    for (let i = 0; i < 2; i++) {
      parameters[i] = this.getParameter(parameterModes[i], i + 1);
    }
    return parameters;
  }

  private getParameter(parameterMode = "0", i: number): number {
    const nextVal = this.instructions[this.currentInstructionIndex + i];

    switch(parameterMode) {
      case "0": {
        return this.instructions[nextVal] || 0;
      }

      case "1": {
        return nextVal;
      }

      case "2": {
        const nextIndex = (BigInt(this.relativeBase) + BigInt(nextVal)).toString();
        return this.instructions[nextIndex] || 0;
      }
    }
  }
}
