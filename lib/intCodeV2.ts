export class IntCodeComputerV2 {
  public executionHalted = false;
  public currentOutput: string;

  private inputSignals: string[] = [];
  private currentInstructionIndex: number = 0;
  private instructions: string[];
  private executionPaused: boolean = true;
  private relativeBase: string = "0";

  constructor(instructions: string[]) {
    this.instructions = [...instructions];
  }

  execute(): string {
    this.executionPaused = false;

    while (!this.executionPaused && !this.executionHalted) {
      console.log(this.currentInstructionIndex)

      const [opCode, parameterModes] = this.parseOpCode(this.instructions[this.currentInstructionIndex]);
      this.processInstruction(this.currentInstructionIndex, opCode, parameterModes);
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
    const parameterModes = codeStr.slice(0, -2).split("").reverse();
    return [Number(opCode), parameterModes];
  }

  private processInstruction(index: number, opCode: number, parameterModes: string[]): void {
    const [firstParameter, secondParameter] = this.getParameters(parameterModes);
    // console.log(firstParameter, secondParameter)

    switch (opCode) {
      case 1: {
        this.instructions[this.instructions[index + 3]] = (BigInt(firstParameter) + BigInt(secondParameter)).toString();
        this.currentInstructionIndex = index + 4;
        break;
      }

      case 2: {
        this.instructions[this.instructions[index + 3].toString()] = (BigInt(firstParameter) * BigInt(secondParameter)).toString();
        this.currentInstructionIndex = index + 4;
        break;
      }

      case 3: {
        const input = this.getCurrentInput();
        if (!input) {
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
        console.log("CURRENT OUTPUT: ", this.currentOutput)
        this.currentInstructionIndex = index + 2;
        break;
      }

      case 5: {
        this.currentInstructionIndex = firstParameter === "0" ? index + 3 : Number(secondParameter);
        break;
      }

      case 6: {
        this.currentInstructionIndex = firstParameter !== "0" ? index + 3 : Number(secondParameter);
        break;
      }

      case 7: {
        this.instructions[this.instructions[index + 3]] = BigInt(firstParameter) < BigInt(secondParameter) ? "1" : "0";
        this.currentInstructionIndex = index + 4;
        break;
      }

      case 8: {
        this.instructions[this.instructions[index + 3]] = firstParameter === secondParameter ? "1" : "0";
        this.currentInstructionIndex = index + 4;
        break;
      }

      case 9: {
        this.relativeBase = (BigInt(this.relativeBase) + BigInt(firstParameter)).toString();
        // console.log("REL BASE: ", this.relativeBase)
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


  private getParameters(parameterModes: string[]): string[] {
    let parameters: string[] = [];
    for (let i = 0; i < 2; i++) {
      parameters[i] = this.getParameter(parameterModes[i], i + 1);
    }
    return parameters;
  }

  private getParameter(parameterMode = "0", i: number): string {
    const nextVal = this.instructions[this.currentInstructionIndex + i];

    switch(parameterMode) {
      case "0": {
        return this.instructions[nextVal] || "0";
      }

      case "1": {
        return nextVal;
      }

      case "2": {
        const nextIndex = (BigInt(this.relativeBase) + BigInt(nextVal)).toString();
        return this.instructions[nextIndex] || "0";
        // return nextIndex;
      }
    }
  }
}

