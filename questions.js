// Utility helpers
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

// Assembles a question object with randomly shuffled choices (A, B, C, D)
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
// YOUR TOPIC BANK
// Add all static problems and dynamic problem generators directly here.
// Everything is an inline arrow function () => ... so numbers 
// AND choice orders (A, B, C, D) are freshly shuffled on every restart.
// =========================================================
const topicDefinitions = {
  "Calculus": [
    // Dynamic Derivative Problem
    () => {
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

    // Dynamic Definite Integral Problem
    () => {
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

    // Static Problem (choices automatically randomized)
    () => makeQuestion(
      "Which of the following equals $\\lim_{x \\to 0} \\frac{\\sin(x)}{x}$?",
      "$1$",
      ["$0$", "$\\infty$", "Undefined"],
      "This is a fundamental trigonometric limit equal to 1."
    )
  ],

  "Linear Algebra": [
    // Dynamic 2x2 Matrix Determinant Problem
    () => {
      const a = getRandomInt(1, 6), b = getRandomInt(1, 6);
      const c = getRandomInt(1, 6), d = getRandomInt(1, 6);
      const det = (a * d) - (b * c);

      return makeQuestion(
        `Calculate the determinant of $A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix}$.`,
        `$${det}$`,
        [`$${(a * d) + (b * c)}$`, `$${(a * c) - (b * d)}$`, `$${det + getRandomInt(1, 3)}$`],
        `$\\det(A) = (${a})(${d}) - (${b})(${c}) = ${det}$.`
      );
    },

    // Static Problem (choices automatically randomized)
    () => makeQuestion(
      "If matrix $A$ is $3 \\times 2$ and $B$ is $2 \\times 4$, what are the dimensions of $AB$?",
      "$3 \\times 4$",
      ["$2 \\times 2$", "$4 \\times 3$", "Undefined"],
      "Inner dimensions match ($2 = 2$), so product is $3 \\times 4$."
    )
  ],
  "Galaxies": [
    () => makeQuestion(
      "Which letter represents elliptical galaxies in galaxy classification?",
      "E",
      ["S", "SB", "I"],
      "Elliptical galaxies are designated E."
    ),

    () => makeQuestion(
      "What does the classification E0 indicate about an elliptical galaxy?",
      "It appears nearly spherical.",
      [
        "It has tightly wound spiral arms.",
        "It has a prominent central bar.",
        "It has no stars."
      ],
      "E0 galaxies appear nearly spherical, while higher E numbers indicate a more flattened appearance."
    ),

    () => makeQuestion(
      "Which elliptical galaxy classification indicates the most flattened appearance?",
      "E7",
      ["E0", "E2", "E5"],
      "The elliptical galaxy sequence runs from E0, nearly spherical, to E7, flattened."
    ),

    () => makeQuestion(
      "How does the appearance of elliptical galaxies change from E0 to E7?",
      "They appear increasingly flattened.",
      [
        "Their spiral arms become more tightly wound.",
        "Their central bars become longer.",
        "They appear increasingly spherical."
      ],
      "Increasing E numbers indicate an increasingly flattened appearance."
    ),

    () => makeQuestion(
      "Which stellar population is characteristic of elliptical galaxies?",
      "Mostly old stars",
      [
        "Only newly formed stars",
        "Only stars orbiting in spiral arms",
        "No stars, only gas"
      ],
      "Elliptical galaxies are characterized by populations of mostly old stars."
    ),

    () => makeQuestion(
      "Which galaxy type is the most common?",
      "Elliptical galaxies",
      [
        "Spiral galaxies",
        "Barred spiral galaxies",
        "Irregular galaxies"
      ],
      "Elliptical galaxies are the most common galaxy type."
    ),

    () => makeQuestion(
      "How do stars typically orbit within an elliptical galaxy?",
      "In many different directions",
      [
        "All in the same direction within a thin disk",
        "Only along spiral arms",
        "Only in circular orbits around a central bar"
      ],
      "Stars in elliptical galaxies have orbits oriented in many different directions."
    ),

    () => makeQuestion(
      "What is a defining structural feature of a spiral galaxy?",
      "Spiral arms surrounding a central bulge",
      [
        "A nearly spherical shape with no disk",
        "A central bar with no surrounding stars",
        "An irregular distribution with no central structure"
      ],
      "Spiral galaxies have spiral arms arranged around a central bulge."
    ),

    () => makeQuestion(
      "What does S represent in galaxy classification?",
      "Spiral galaxy",
      [
        "Spherical galaxy",
        "Stellar stream",
        "Supernova bubble"
      ],
      "S is the designation for spiral galaxies."
    ),

    () => makeQuestion(
      "What distinguishes a barred spiral galaxy from an ordinary spiral galaxy?",
      "It has a bar-shaped structure through its center.",
      [
        "It contains no central bulge.",
        "It contains only old stars.",
        "It has no spiral arms."
      ],
      "Barred spiral galaxies have a central bar-shaped structure and are designated SB."
    ),

    () => makeQuestion(
      "Which designation identifies a barred spiral galaxy?",
      "SB",
      ["E", "S0", "S"],
      "SB identifies barred spiral galaxies."
    ),

    () => makeQuestion(
      "As spiral galaxy classifications progress from a to c, how do the spiral arms change?",
      "They become more loosely wound.",
      [
        "They become more tightly wound.",
        "They disappear entirely.",
        "They become a spherical halo."
      ],
      "From a to c, the spiral arms become more loosely wound."
    ),

    () => makeQuestion(
      "As spiral galaxy classifications progress from a to c, how does the central bulge change?",
      "It becomes smaller.",
      [
        "It becomes larger.",
        "It becomes a stellar stream.",
        "It becomes the entire galaxy."
      ],
      "From a to c, the central bulge becomes smaller."
    ),

    () => makeQuestion(
      "Compared with an Sa galaxy, which features would an Sc galaxy have?",
      "More loosely wound arms and a smaller central bulge",
      [
        "More tightly wound arms and a larger central bulge",
        "More loosely wound arms and a larger central bulge",
        "More tightly wound arms and a smaller central bulge"
      ],
      "The progression from a to c corresponds to more loosely wound arms and a smaller central bulge."
    ),

    () => makeQuestion(
      "How is the Milky Way classified?",
      "An SBbc barred spiral galaxy",
      [
        "An E0 elliptical galaxy",
        "An S0 galaxy",
        "An irregular galaxy"
      ],
      "The Milky Way is classified as a barred spiral galaxy of type SBbc."
    ),

    () => makeQuestion(
      "Where are the Milky Way's oldest stars found?",
      "In the halo",
      [
        "Only in the spiral arms",
        "Inside the central black hole",
        "Only in supernova bubbles"
      ],
      "The Milky Way's oldest stars are found in the halo."
    ),

    () => makeQuestion(
      "Which structures characterize an S0 galaxy?",
      "A smooth disk and a central bulge",
      [
        "Spiral arms with no central bulge",
        "A central black hole with no stars",
        "Only an irregular cloud of gas"
      ],
      "S0 galaxies have a smooth disk and a central bulge."
    ),

    () => makeQuestion(
      "S0 galaxies combine characteristics of which two galaxy types?",
      "Elliptical and spiral galaxies",
      [
        "Irregular and barred spiral galaxies",
        "Elliptical and irregular galaxies",
        "Dwarf galaxies and stellar streams"
      ],
      "S0 galaxies combine characteristics of elliptical and spiral galaxies."
    ),

    () => makeQuestion(
      "Which description best matches an irregular galaxy?",
      "A galaxy that does not fit the other regular shape categories",
      [
        "A galaxy with tightly wound spiral arms",
        "A galaxy with a smooth disk and bulge",
        "A galaxy classified between E0 and E7"
      ],
      "Irregular galaxies do not fit the other regular galaxy shape categories."
    ),

    () => makeQuestion(
      "Approximately what percentage of all galaxies are irregular?",
      "25%",
      ["5%", "50%", "75%"],
      "Irregular galaxies account for approximately 25% of all galaxies."
    ),

    () => makeQuestion(
      "What is a galactic year?",
      "The time the Sun takes to complete one orbit around the Milky Way's center",
      [
        "The time Earth takes to orbit the Sun",
        "The time light takes to cross the Milky Way",
        "The time a supernova takes to form a bubble"
      ],
      "A galactic year is one complete orbit of the Sun around the Milky Way's center, where Sagittarius A* is located."
    ),

    () => makeQuestion(
      "Approximately how long is a galactic year?",
      "225 million years",
      [
        "225 thousand years",
        "100 million years",
        "225 billion years"
      ],
      "The Sun's orbital period around the Galactic center is approximately 225 million years."
    ),

    () => makeQuestion(
      "Approximately how wide is the Milky Way?",
      "100,000 light-years",
      [
        "100 light-years",
        "1,000 light-years",
        "225 million light-years"
      ],
      "The Milky Way is approximately 100,000 light-years across."
    ),

    () => makeQuestion(
      "How do supernovae create clear bubbles in interstellar gas?",
      "They sweep away surrounding gas, creating a clearer region.",
      [
        "They gather all surrounding stars into a central bulge.",
        "They turn spiral galaxies into elliptical galaxies.",
        "They stop the Sun from orbiting the Galactic center."
      ],
      "Supernovae sweep away surrounding gas to form clearer bubble-like regions, allowing a relatively clear view."
    ),

    () => makeQuestion(
      "Which galaxy is the Milky Way currently merging with, and what does this interaction produce?",
      "The Sagittarius Dwarf Spheroidal Galaxy, producing stellar streams",
      [
        "An E7 galaxy, producing a central bar",
        "An S0 galaxy, producing supernova bubbles",
        "An Sc galaxy, producing the Galactic halo in a single event"
      ],
      "The Milky Way is merging with the Sagittarius Dwarf Spheroidal Galaxy. Stars pulled from the dwarf galaxy form stellar streams."
    ),

    () => makeQuestion(
      "What powers an active galactic nucleus?",
      "Matter falling toward and accreting onto a central black hole",
      [
        "Stars orbiting in different directions",
        "The winding of a galaxy's spiral arms",
        "The Sun completing a galactic year"
      ],
      "An active galactic nucleus is powered by matter accreting onto the galaxy's central black hole."
    )
  ]
};
