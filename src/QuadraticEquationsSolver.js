class QuadraticEquationsSolver {
  inputValues = { a: '', b: '', c: '' };

  constructor() {}

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
    return roots;
  }
}
