import { MODES } from './constants.js';
import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });

class QuadraticEquationsSolver {
  inputValues = { a: '', b: '', c: '' };

  constructor() {}

  setInputValues(inputValues) {
    this.inputValues = inputValues;
  }

  setRoots(roots) {
    this.roots = roots;
  }

  findRoots() {
    const roots = [];
    const { a, b, c } = this.inputValues;
    const discriminant = Math.pow(b, 2) - 4 * a * c;
    if (discriminant === 0) {
      const x = -b / (2 * a);
      roots.push(x);
    }
    if (discriminant > 0) {
      const discriminantSqrt = Math.sqrt(discriminant);
      const x1 = (-b - discriminantSqrt) / (2 * a);
      const x2 = (-b + discriminantSqrt) / (2 * a);
      roots.push(x1, x2);
    }
    this.setRoots(roots);
  }

  askForValue(valueName, extraValidationRule = () => true) {
    while (true) {
      const value = prompt(`${valueName} = `);
      if (value !== '' && !isNaN(Number(value)) && extraValidationRule(value)) {
        return Number(value);
      }
      console.log(`Expected a valid real number, got ${value} instead`);
    }
  }

  showEquation() {
    const { a, b, c } = this.inputValues;
    console.log(`Equation is: (${a}) x^2 + (${b}) x + (${c}) = 0`);
  }

  logResult() {
    const numberOfRoots = this.roots.length;
    if (numberOfRoots === 1) {
      console.log(
        `There is only ${numberOfRoots} root: \nx1 = ${this.roots[0]}`
      );
    }
    if (numberOfRoots > 1) {
      console.log(
        `There are ${numberOfRoots} roots: \nx1 = ${this.roots[0]} \nx2 = ${this.roots[1]}`
      );
    }
    if (numberOfRoots === 0) {
      console.log('No roots found.');
    }
  }

  start() {
    const a = this.askForValue('a', (value) => Number(value) !== 0);
    const b = this.askForValue('b');
    const c = this.askForValue('c');
    this.setInputValues({ a, b, c });
    this.showEquation();
    this.findRoots();
    this.logResult();
  }
}

const quadraticEquationsSolver = new QuadraticEquationsSolver();
quadraticEquationsSolver.start();
