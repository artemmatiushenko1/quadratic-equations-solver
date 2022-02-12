import { MODES } from './constants.js';
import fs from 'fs/promises';
import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });

class QuadraticEquationsSolver {
  mode = MODES.INTERACTIVE;
  filePath = '';
  inputValues = { a: '', b: '', c: '' };
  roots = [];

  constructor() {
    if (process.argv.slice(2).length > 0) {
      this.setMode(MODES.FILE);
      this.setFilePath(process.argv.slice(2)[0]);
    }
  }

  setMode(mode) {
    this.mode = mode;

    while (true) {
      console.log(mode);
    }
  }

  setFilePath(path) {
    this.filePath = path;
  }

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

  async getValuesFromFile(path) {
    const pattern = /^(-?\d*\.?\d*\s){2}-?\d*\.?\d*\n$/g;
    const content = await fs.readFile(path, 'utf-8');
    if (!pattern.test(content)) {
      throw new Error('Invalid file format!');
    }
    const values = content.split(' ').map((number) => Number(number));
    if (values[0] === 0) {
      throw new Error('Error! a cannot be 0');
    }
    const [a, b, c] = values;
    this.setInputValues({ a, b, c });
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

  runInteractiveMode() {
    const a = this.askForValue('a', (value) => Number(value) !== 0);
    const b = this.askForValue('b');
    const c = this.askForValue('c');
    this.setInputValues({ a, b, c });
    this.showEquation();
    this.findRoots();
    this.logResult();
  }

  async runFileMode() {
    try {
      await this.getValuesFromFile(this.filePath);
      this.showEquation();
      this.findRoots();
      this.logResult();
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  }

  start() {
    if (this.mode === MODES.INTERACTIVE) {
      this.runInteractiveMode();
    }
    if (this.mode === MODES.FILE) {
      this.runFileMode();
    }
  }
}

const quadraticEquationsSolver = new QuadraticEquationsSolver();
quadraticEquationsSolver.start();
