
export class IntCodeComputer {
  private currentOutput: number = null;
  private inputSignals = [];
  private currentInstructionIndex = 0;
  private instructions: number[];
  public executionHalted = false;
  private executionPaused = true;

  constructor(instructions: number[]) {
    this.instructions = [...instructions];
  }

  public execute(): number {
    this.executionPaused = false;

    while (!this.executionPaused && !this.executionHalted) {
      const [opCode, parameterModes] = this.parseOpCode(this.instructions[this.currentInstructionIndex]);
      this.processInstruction(this.currentInstructionIndex, opCode, parameterModes);
    }

    return this.currentOutput;
  }

  public enqueueInput(...inputs: number[]): IntCodeComputer {
    this.inputSignals.push(...inputs);
    return this;
  }

  public getCurrentOutput(): number {
    return this.currentOutput;
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

        this.currentInstructionIndex = index + 2;
        this.currentOutput = (parameterModes[0] || "0") === "0" ? this.instructions[this.instructions[index + 1]] : this.instructions[index + 1];
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
    let parameters = [];
    for (let i = 0; i < 2; i++) {
      const nextVal = this.instructions[this.currentInstructionIndex + i + 1];
      parameters[i] = (parameterModes[i] || "0") === "0" ? this.instructions[nextVal] : nextVal;
    }
    return parameters;
  }
}