const readline = require('readline');

function calculate(left, operator, right) {
  const a = Number(left);
  const b = Number(right);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Los dos valores deben ser numeros validos.');
  }

  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        throw new Error('No se puede dividir entre cero.');
      }
      return a / b;
    default:
      throw new Error('Operador no valido. Usa +, -, * o /.');
  }
}

function printResult(left, operator, right) {
  try {
    const result = calculate(left, operator, right);
    console.log(`Resultado: ${left} ${operator} ${right} = ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

function askQuestion(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function runInteractive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const left = await askQuestion(rl, 'Ingresa el primer numero: ');
    const operator = await askQuestion(rl, 'Ingresa la operacion (+, -, *, /): ');
    const right = await askQuestion(rl, 'Ingresa el segundo numero: ');
    printResult(left, operator.trim(), right);
  } finally {
    rl.close();
  }
}

const [, , left, operator, right] = process.argv;

if (left !== undefined && operator !== undefined && right !== undefined) {
  printResult(left, operator, right);
} else {
  runInteractive();
}
