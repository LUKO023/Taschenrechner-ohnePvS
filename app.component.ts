import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-project';

  displaySmall: string = '';
  display: string = '';
  operator: string = '';
  sum: string = '';
  numArray: number[] = [];
  numberConvertArray: string[] = [];
  storeArray: string[] = [];
  operatorConverArray: string[] = [];
  num: number = 0;
  secondNum: number = 0;
  regexNumber = /[0-9\.]/;
  regexOperator = /[+-\/*] /;
  convertInt: number = 0.000;
  opPointer: number = 0;
  numPointer: number = 1;
  boolean: boolean = false;

  clear() {
    this.storeArray = [];
    this.numberConvertArray = [];
    this.operatorConverArray = [];
    this.display = '';
    this.displaySmall = '';
    this.numArray = [];

    this.boolean = false;
    this.sum = '';
    this.opPointer = 0
    this.numPointer = 1
  }

  result() {
    this.numArray = [];

    this.numberConvertArray = [];
    this.operatorConverArray = [];
    //Nacheinander folgende Zahlen werden zu einer Stelle im Arrays zusammen gefasst
    this.convertArrayForCalculation()

    //Array wird in zwei Arrays aufgeteilt, einer mit nur Zahlen der anderen mit nur Operatoren
    this.onlynumbers();
    this.onlyOperator();

    //Rechnung: Schleife die prüft ob die rechnung fertig ist und abfragt welcher Operator benutzt wird
    this.calculus();
   

    console.log(this.storeArray);
    console.log(this.numberConvertArray)
    console.log(this.numArray)
    console.log(this.operatorConverArray)
    console.log(this.num)
    console.log(this.secondNum)
    console.log(this.sum)
  }

  convertArrayForCalculation(): void {

    for (var i = 0; i <= this.storeArray.length; i++) {
      if (this.regexNumber.test(this.storeArray[i]) === true && this.regexNumber.test(this.storeArray[i + 1]) === true) {
        this.storeArray[i + 1] = this.storeArray[i] + this.storeArray[i + 1];
        this.storeArray.splice(i, 1);
        this.convertArrayForCalculation();

      }
    }
  }

  delete() {
    this.display = this.display.slice(0, -1);
    this.storeArray = this.storeArray.slice(0, -1);
    this.numArray = this.numArray.slice(0, -1);
  }

  input(number: any): void {

    if (this.boolean === true) {
      this.displaySmall = 'Ans=' + this.sum;
      this.storeArray = [];
      this.storeArray = this.storeArray.concat(this.sum)
      this.boolean = false;
    }
    this.storeArray = this.storeArray.concat(number)
    this.display = this.storeArray.join('');
    




  }

  plus(): void {
    this.secondNum = this.numArray[this.numPointer];
    this.num += this.secondNum;
  }
  minus(): void {
    this.secondNum = this.numArray[this.numPointer];
    this.num -= this.secondNum;
  }
  multiplication(): void {
    this.secondNum = this.numArray[this.numPointer];
    this.num *= this.secondNum;
  }
  division(): void {
    this.secondNum = this.numArray[this.numPointer];
    this.num /= this.secondNum;
  }

  onlynumbers(): void {
    this.numberConvertArray = this.storeArray.slice();
    for (var i = 1; i < this.storeArray.length; i++) {
      this.numberConvertArray.splice(i, 1);
    }

    for (var i = 0; i < (this.numberConvertArray.length) * 2;) {
      this.convertInt = parseFloat(this.storeArray[i]);
      this.numArray = this.numArray.concat(this.convertInt);
      i = i + 2;
    }

  }

  onlyOperator(): void {
    this.operatorConverArray = this.storeArray.slice();
    for (var i = 0; i < this.storeArray.length; i++) {
      this.operatorConverArray.splice(i, 1);
    }

  }

  calculus(): void {
    this.num = this.numArray[0];
    
    while (this.operatorConverArray[this.opPointer] != undefined) {
      if (this.operatorConverArray[this.opPointer] === '+') {
        this.plus();
        this.numPointer++;
        this.opPointer++;
      }

      if (this.operatorConverArray[this.opPointer] === '-') {
        this.minus();
        this.numPointer++;
        this.opPointer++;
      }

      if (this.operatorConverArray[this.opPointer] === '*') {
        this.multiplication();
        this.numPointer++;
        this.opPointer++;
      }

      if (this.operatorConverArray[this.opPointer] === '/') {
        this.division();
        this.numPointer++;
        this.opPointer++;
      }
    }
    this.sum = this.num.toString();
    this.display = this.sum;
    this.displaySmall = this.storeArray.join('');

    // boolean = true für einmultiplicationiges = input
    this.boolean = true;
    this.opPointer = 0
    this.numPointer = 1


  }

}


















