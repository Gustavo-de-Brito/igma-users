class CpfFactory {
  public createInvalidCpf(): string {
    const firstDigits: string = this.generateFirstDigits();

    const penultimateDigit: string = this.generateWrongDigit(firstDigits);
    const lastDigit: string = (
      this.generateWrongDigit(firstDigits + penultimateDigit)
    );

    const invalidCpf: string = firstDigits + penultimateDigit + lastDigit;
    return invalidCpf;
  }

  public createValidCpf(): string {
    const firstDigits: string = this.generateFirstDigits();

    const penultimateDigit: string = this.generateRightDigit(firstDigits);
    const lastDigit: string = (
      this.generateRightDigit(firstDigits + penultimateDigit)
    );

    const validCpf: string = firstDigits + penultimateDigit + lastDigit;
    return validCpf;
  }

  private generateFirstDigits(): string {
    let firstDigits: string = '';

    for(let i = 0; i < 9; i++) {
      const newDigit: number = Math.floor(Math.random() * 10);
      firstDigits += String(newDigit);
    }
  
    return firstDigits;
  }

  private generateWrongDigit(partialCpf: string) {
    let sum: number = 0;
    let multi: number = partialCpf.length + 1;
  
    for(const digit of partialCpf) {
      sum += Number(digit) * multi;
      multi--;
    }

    const lastDigit = (11 - (sum % 11)) + 1;

    return lastDigit > 9 ? '1' : String(lastDigit);
  }

  private generateRightDigit(partialCpf: string) {
    let sum: number = 0;
    let multi: number = partialCpf.length + 1;
  
    for(const digit of partialCpf) {
      sum += Number(digit) * multi;
      multi--;
    }

    const lastDigit = 11 - (sum % 11);

    return lastDigit > 9 ? '0' : String(lastDigit);
  }
}

export default new CpfFactory();