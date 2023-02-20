export default class ValidateCpf {
  cpfNumbers: string;

  constructor(cpf: string) {
    this.cpfNumbers = cpf.replace(/\D+/g, '');
  }

  public verifyCpf() {
    if(this.cpfNumbers.length !== 11) return false;
    else if(this.isSequence()) return false;

    const partialCpf = this.cpfNumbers.slice(0, 9);
  
    const penultimateDigit = this.generateDigit(partialCpf);
    const lastDigit = this.generateDigit(partialCpf + penultimateDigit);
  
    const calculatedCpf = partialCpf + penultimateDigit + lastDigit;

    if(calculatedCpf !== this.cpfNumbers) return false;

    return true;
  }

  private generateDigit(partialCpf: string) {
    let sum = 0;
    let multi = partialCpf.length + 1;
  
    for(const digit of partialCpf) {
      sum += Number(digit) * multi;
      multi--;
    }

    const lastDigit = 11 - (sum % 11);

    return lastDigit > 9 ? '0' : String(lastDigit);
  }

  private isSequence() {
    const sequence = this.cpfNumbers[0].repeat(11);

    return sequence === this.cpfNumbers;
  }
}