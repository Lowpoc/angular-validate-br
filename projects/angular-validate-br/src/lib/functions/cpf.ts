import { Anotation } from './anotation';
import { OnlyNumbers } from './onlyNumbers';

export class Cpf implements Anotation {
  document: string;

  constructor(value: string) {
    this.document = value;
  }

  validate(): boolean {
    // tslint:disable-next-line:prefer-const
    if (this.document === '' || this.document === null || this.document === undefined) { return true; }
    const cpf = new OnlyNumbers(this.document).format();
    
    if (cpf.length !== 11) { return false; }

    // tslint:disable-next-line:curly
    if (cpf === '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999') { return false; }

    let add = 0;
    // tslint:disable-next-line:radix
    for (let i = 0; i < 9; i++) { add += parseInt(cpf.charAt(i)) * (10 - i); }
    let rev = 11 - (add % 11);

    if (rev === 10 || rev === 11) { rev = 0; }

    // tslint:disable-next-line:radix
    if (rev !== parseInt(cpf.charAt(9))) { return false; }

    add = 0;
    // tslint:disable-next-line:radix
    for (let i = 0; i < 10; i++) { add += parseInt(cpf.charAt(i)) * (11 - i); }
    rev = 11 - (add % 11);

    if (rev === 10 || rev === 11) { rev = 0; }

    // tslint:disable-next-line:radix
    if (rev !== parseInt(cpf.charAt(10))) { return false; }

    return true;
  }

}
