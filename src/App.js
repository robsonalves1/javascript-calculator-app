import React from 'react';
import './App.scss'

const arrElementsCalculator = [
  { 
    id: 'clear',
    class: 'btn btn-clear',
    elem: 'AC' 
  },
  {
    id: 'divide',
    class: 'btn',
    elem: '/'
  },
  {
    id: 'multiply',
    class: 'btn',
    elem: '*'
  },
  {
    id: 'seven',
    class: 'btn',
    elem: '7'
  },
  {
    id: 'eight',
    class: 'btn',
    elem: '8'
  },
  {
    id: 'nine',
    class: 'btn',
    elem: '9'
  },
  {
    id: 'subtract',
    class: 'btn',
    elem: '-'
  },
  {
    id: 'four',
    class: 'btn',
    elem: '4'
  },
  {
    id: 'five',
    class: 'btn',
    elem: '5'
  },
  {
    id: 'six',
    class: 'btn',
    elem: '6'
  },
  {
    id: 'add',
    class: 'btn',
    elem: '+'
  },
  {
    id: 'one',
    class: 'btn',
    elem: '1'
  },
  {
    id: 'two',
    class: 'btn',
    elem: '2'
  },
  {
    id: 'three',
    class: 'btn',
    elem: '3'
  },
  {
    id: 'equals',
    class: 'btn btn-equals',
    elem: '='
  },
  { 
    id: 'zero',
    class: 'btn',
    elem: '0' 
  },
  {
    id: 'decimal',
    class: 'btn',
    elem: '.'
  },
]
let inp = '';
let isDecimal = false;
let isNotMinusOperator = false;
let isOperator = false;
let result = 0;
const arrayInput = [];


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '0'
    }

    this.click = this.click.bind(this);

  }

  calculateInput(elem) { 
    const arrayElements = elem.split('');
    isNotMinusOperator = true;
    let res = 0;

    //looping arrayElements to separate numbers and operators ex.: ['1', '0', '-', '5', '.', '5'] equal ['10', '-', '5.5']
    let indexArrayInput = 0;
    for (let i = 0; i < arrayElements.length; i++) {
      if(Number(arrayElements[i]) || arrayElements[i] == '0' || arrayElements[i] == '.') {
        (arrayInput[indexArrayInput] == undefined) 
        ? arrayInput[indexArrayInput] = arrayElements[i] 
        : arrayInput[indexArrayInput] += arrayElements[i];
        isNotMinusOperator = true;
      } else if(arrayElements[i] == '-') {
        switch (isNotMinusOperator) {
          case true:
            isNotMinusOperator = false;
            indexArrayInput++;
            arrayInput[indexArrayInput] = arrayElements[i];
            indexArrayInput++;  
            break;
          case false:
            arrayInput[indexArrayInput] = arrayElements[i];
            isNotMinusOperator = true;
            break;
        }
      } else {
        indexArrayInput++;
        arrayInput[indexArrayInput] = arrayElements[i];
        isNotMinusOperator = false;
        indexArrayInput++;
      }
    }

    //Math result of arrayInput
    for (let i = 0; i < arrayInput.length; i+=2) {
      let num1, operator, num2;

      if(i == 0) {
        num1 = Number(arrayInput[0]);
      } else {
        num1 = res;
      }

      operator = arrayInput[i + 1];
      num2 = Number(arrayInput[i + 2]);
      
      switch (operator) {
        case '+':
          res = num1 + num2
          break;
      case '-':
          res = num1 - num2
          break;
      case '*':
          res = num1 * num2
          break; 
      case '/':
          res = num1 / num2
          break;    
      }      
    }

    //Empty arrays
    arrayElements.splice(0, arrayElements.length);
    arrayInput.splice(0, arrayInput.length);

    return res;
  }

  click(e) {
    let btnElem = e.target.innerHTML;

    if(btnElem.match(/\d/)) { //Inserting Numbers
      if(inp == '0') {
        inp = btnElem;
      } else {
        inp += btnElem; 
      }

      isOperator = false;
      isNotMinusOperator = false

    } else if(btnElem.match(/[\/\*\-\+]/)) { //Inserting Operators
        if(btnElem == '-' && !isNotMinusOperator) {
          if(inp.split('')[inp.length - 1 ] == '-' || isOperator) {
            isNotMinusOperator = true;
          }

          inp += btnElem;
          isOperator = true;
  
        } else if(!isOperator) {
          inp += btnElem;
          isOperator = true;

        } else {
          let newInp = inp.split('');

          if(btnElem != '-' && newInp[newInp.length - 1] == '-') {
            newInp.pop();
            newInp.pop();
            newInp.push(btnElem);
            inp = newInp.join('');

          } else {
            newInp.pop();
            newInp.push(btnElem);
            inp = newInp.join('');

          }

        }
      
      isDecimal = false;

    } else if(btnElem == '.' && !isDecimal) { //Inserting Decimal Dot
      if(inp == '' || inp.split('')[inp.length - 1].match(/[\/\*\-\+]/)) {
        inp += '0' + btnElem;

      } else {
        inp += btnElem;
      
      }

      isDecimal = true;
    
    } else if(btnElem == 'AC') { //Clearing All Entries 
      inp = '0';
      isOperator = false;
      isNotMinusOperator = false;
      isDecimal = false;
    
    } else if(btnElem == '='){ // Clinking in =
      result = this.calculateInput(inp);
      inp = result;
      (String(inp).match(/\./g)) ? isDecimal = true : isDecimal = false;      
      isOperator = false;
      isNotMinusOperator = false;

    }

    this.setState({
      input: inp
    })
  }
  

  render() {
    return (
      <div className='container'>
        <div className='container-calculator'>
          <h1 id='display'>{this.state.input}</h1>
          {arrElementsCalculator
           .map((k) => {
              return <button className={k.class} id={k.id} onClick={this.click}>
                {k.elem}
              </button>
           })
          }
        </div>
      </div>
    );
  }
}

export default App;
