// Utility helpers for generating random numbers and shuffling
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function makeQuestion(questionText, correctAnswer, wrongAnswers, explanationText) {
  const allChoices = [correctAnswer, ...wrongAnswers];
  const shuffled = shuffleArray(allChoices);
  return {
    question: questionText,
    options: shuffled,
    answer: shuffled.indexOf(correctAnswer),
    explanation: explanationText
  };
}

// =========================================================
// 1. DYNAMIC GENERATORS (Randomized Numbers)
// =========================================================
const dynamicGenerators = {
  // Derivative Generator: f(x) = a*x^n + b*x
  randomDerivative() {
    const a = getRandomInt(2, 9);
    const n = getRandomInt(2, 5);
    const b = getRandomInt(1, 9);
    
    const correctCoeff = a * n;
    const correctExp = n - 1;

    return makeQuestion(
      `What is the derivative of $f(x) = ${a}x^{${n}} + ${b}x$?`,
      `$${correctCoeff}x^{${correctExp}} + ${b}$`,
      [
        `$${a}x^{${correctExp}} + ${b}$`,
        `$${correctCoeff}x^{${n}} + ${b}$`,
        `$${correctCoeff}x^{${correctExp}}$`
      ],
      `Power rule: $\\frac{d}{dx}(${a}x^{${n}}) = ${a} \\cdot ${n}x^{${correctExp}} = ${correctCoeff}x^{${correctExp}}$ and $\\frac{d}{dx}(${b}x) = ${b}$.`
    );
  },

  // Integral Generator: \int_0^k a*x dx
  randomIntegral() {
    const a = getRandomInt(1, 5) * 2;
    const k = getRandomInt(1, 4);
    const ansValue = (a / 2) * (k * k);

    return makeQuestion(
      `Evaluate the integral: $$\\int_{0}^{${k}} ${a}x \\, dx$$`,
      `$${ansValue}$`,
      [`$${ansValue * 2}$`, `$${ansValue + a}$`, `$${(a / 2) * k}$`],
      `Antiderivative is $${a / 2}x^2$. Evaluating from $0$ to $${k}$: $${a / 2}(${k}^2) = ${ansValue}$.`
    );
  },

  // Determinant Generator: 2x2 Matrix
  randomDeterminant() {
    const a = getRandomInt(1, 6), b = getRandomInt(1, 6);
    const c = getRandomInt(1, 6), d = getRandomInt(1, 6);
    const det = (a * d) - (b * c);

    return makeQuestion(
      `Calculate the determinant of $A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$.`,
      `$${det}$`,
      [`$${(a * d) + (b * c)}$`, `$${(a * c) - (b * d)}$`, `$${det + getRandomInt(1, 3)}$`],
      `$\\det(A) = (${a})(${d}) - (${b})(${c}) = ${det}$.`
    );
  }
};

// =========================================================
// 2. YOUR TOPIC BANK
// Add all your static questions and dynamic generators here
// =========================================================
const topicDefinitions = {
  "Randomized Calculus": [
    dynamicGenerators.randomDerivative,
    dynamicGenerators.randomDerivative,
    dynamicGenerators.randomIntegral,
    dynamicGenerators.randomIntegral
  ],
  "Randomized Linear Algebra": [
    dynamicGenerators.randomDeterminant,
    dynamicGenerators.randomDeterminant,
    dynamicGenerators.randomDeterminant
  ],
  "Static Physics": [
    {
      question: "What is Newton's second law of motion?",
      options: ["$F = ma$", "$E = mc^2$", "$p = mv$", "$v = u + at$"],
      answer: 0,
      explanation: "Force equals mass times acceleration ($F = ma$)."
    },
    {
      question: "What is the standard acceleration due to gravity on Earth?",
      options: ["$9.8 \\text{ m/s}^2$", "$5.0 \\text{ m/s}^2$", "$12.2 \\text{ m/s}^2$", "$1.6 \\text{ m/s}^2$"],
      answer: 0,
      explanation: "Standard gravity is approximately $9.81 \\text{ m/s}^2$."
    }
  ]
};
