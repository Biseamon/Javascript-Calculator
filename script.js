
class Calculator{
  constructor(prevOperandTextEle, currOperandTextEle){
    this.prevOperand = prevOperandTextEle;
    this.currentOperand = currOperandTextEle;  
    this.clear();
  }

  clear(){
      this.currentOperandText = '';
      this.previousOperandText = '';
      this.operation = undefined;
  }

  delete(){
      this.currentOperandText = this.currentOperandText.toString().slice(0, -1);
  }

  appendNumber(number){
    if(number === '.' && this.currentOperandText.includes('.')) return;
      this.currentOperandText = this.currentOperandText.toString() + number.toString();
  }

  chooseOperation(operation){
    if(this.currentOperandText === '') return;
    if(this.previousOperandText !== ''){
      this.compute();
    }
      this.operation = operation;
      this.previousOperandText = this.currentOperandText;
      this.currentOperandText = '';
  }

  compute(){
      let computation;
      const prev = parseFloat(this.previousOperandText);
      const current = parseFloat(this.currentOperandText);
      if(isNaN(prev) || isNaN(current)) return
      switch(this.operation){
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '/':
          computation = prev / current;
          break;
        default:
          return;        
      }

      this.currentOperandText = computation;
      this.operation = undefined;
      this.previousOperandText = '';


  }

  getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if(isNaN(integerDigits)){
      integerDisplay = '';
    }else{
      integerDisplay = integerDigits.toLocaleString('en', {maxFractionDigits: 0})
    }
    if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`;
    }else{
      return integerDisplay;
    }
  }

  updateDisplay(){
      this.currentOperand.innerText = this.getDisplayNumber(this.currentOperandText)
      if(this.operation != null){
        this.prevOperand.innerText = `${this.getDisplayNumber(this.previousOperandText)} ${this.operation}`
      }else{
        this.prevOperand.innerText = '';
      }
      
  }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const ACButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const prevOperand = document.querySelector('[data-prev-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

const calc =  new Calculator(prevOperand, currentOperand)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calc.appendNumber(button.innerText)
    calc.updateDisplay()
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calc.chooseOperation(button.innerText)
    calc.updateDisplay()
  });
});

equalsButton.addEventListener('click', button => {
  calc.compute();
  calc.updateDisplay();
});

ACButton.addEventListener('click', button => {
  calc.clear();
  calc.updateDisplay();
});

deleteButton.addEventListener('click', button =>{
  calc.delete();
  calc.updateDisplay();
});