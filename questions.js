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
  "SI Units": [
    // Dynamic Derivative Problem
    () => {
  const constants = [
  {
    name: `\\varepsilon_0`,
    dim: [-1, -3, 4, 2, 0, 0, 0] // kg, m, s, A, K, mol, cd
  },
  {
    name: `\\mu_0`,
    dim: [1, 1, -2, -2, 0, 0, 0]
  },
  {
    name: `h`,
    dim: [1, 2, -1, 0, 0, 0, 0]
  },
  {
    name: `G`,
    dim: [-1, 3, -2, 0, 0, 0, 0]
  },
  {
    name: `c`,
    dim: [0, 1, -1, 0, 0, 0, 0]
  },
  {
    name: `k_B`,
    dim: [1, 2, -2, 0, -1, 0, 0]
  },
  {
    name: `R`,
    dim: [1, 2, -2, 0, -1, -1, 0]
  },
  {
    name: `\\sigma`,
    dim: [1, 0, -3, 0, -4, 0, 0]
  },
  {
    name: `m_e`,
    dim: [1, 0, 0, 0, 0, 0, 0]
  },
  {
    name: `m_p`,
    dim: [1, 0, 0, 0, 0, 0, 0]
  },
  {
    name: `k_e`,
    dim: [1, 3, -4, -2, 0, 0, 0]
  }
];

  const c1 = constants[getRandomInt(0, constants.length - 1)];
  let c2 = constants[getRandomInt(0, constants.length - 1)];

  // Avoid dividing by the same constant, which would make the question trivial.
  while (c2 === c1) {
    c2 = constants[getRandomInt(0, constants.length - 1)];
  }

  const dim = c1.dim.map((x, i) => x - c2.dim[i]);

  const baseNames = ["kg", "m", "s", "A", "K", "mol", "cd"];

  const dimToLatex = (d) => {
    const parts = [];

    d.forEach((power, i) => {
      if (power === 0) return;

      if (power === 1) {
        parts.push(`\\mathrm{${baseNames[i]}}`);
      } else if (power === -1) {
        parts.push(`\\mathrm{${baseNames[i]}^{-1}}`);
      } else {
        parts.push(`\\mathrm{${baseNames[i]}^{${power}}}`);
      }
    });

    return parts.length ? parts.join("\\,") : "\\mathrm{dimensionless}";
  };

  const correct = `$${dimToLatex(dim)}$`;

  // Simple distractors: flip the ratio or square it.
  const flipped = c1.dim.map((x, i) => c2.dim[i] - x);
  const squared = dim.map((x) => x * 2);

  return makeQuestion(
    `What are the SI base units of $\\frac{${c1.name}}{${c2.name}}$?`,
    correct,
    [
      correct,
      `$${dimToLatex(flipped)}$`,
      `$${dimToLatex(squared)}$`
    ],
    `Add exponents when multiplying units and subtract them when dividing. Therefore, $\\frac{${c1.name}}{${c2.name}}$ has SI base units ${correct}.`
  );
},

  ],

  "Chapter 1: End of the Age of Silicon": [
  () => makeQuestion(
    "Who coined the term “quantum supremacy”?",
    "John Preskill",
    [
      "Richard Feynman",
      "Sundar Pichai",
      "Albert Einstein"
    ],
    "The term “quantum supremacy” was coined by Caltech physicist John Preskill."
  ),

  () => makeQuestion(
    "What is the basic idea behind quantum computers?",
    "Computing directly using atoms themselves",
    [
      "Computing using only classical electrical circuits",
      "Computing by making larger microchips",
      "Computing using mechanical gears"
    ],
    "Quantum computers compute using the quantum states of atoms, as suggested by Richard Feynman."
  ),

  () => makeQuestion(
    "Which scientist suggested the idea of using atoms themselves for computation?",
    "Richard Feynman",
    [
      "John Preskill",
      "Sundar Pichai",
      "Fritz Haber"
    ],
    "Richard Feynman suggested that computers could compute using atoms themselves."
  ),

  () => makeQuestion(
    "What is the basic unit of information used by a quantum computer?",
    "Qubit",
    [
      "Bit",
      "Byte",
      "Transistor"
    ],
    "Quantum computers use qubits, the quantum analogue of classical bits."
  ),

  () => makeQuestion(
    "What condition must atoms be in for quantum computation to work?",
    "Coherence",
    [
      "Ionization",
      "Superposition of classical bits",
      "Thermal equilibrium at room temperature"
    ],
    "Atoms must be in unison, or coherence, for quantum computation to function."
  ),

  () => makeQuestion(
    "How are atoms typically brought into coherence in quantum computers?",
    "By cooling them to near 0 K",
    [
      "By heating them to extremely high temperatures",
      "By exposing them to visible light only",
      "By increasing their pressure"
    ],
    "Quantum computers often achieve coherence by cooling atoms to temperatures near absolute zero."
  ),

  () => makeQuestion(
    "Which natural process is described as a quantum process that can maintain quantum effects at normal temperatures?",
    "Photosynthesis",
    [
      "Volcanic eruptions",
      "Nuclear fission",
      "Plate tectonics"
    ],
    "Photosynthesis is described as a quantum process that can operate at normal temperatures, unlike most engineered quantum systems."
  ),

  () => makeQuestion(
    "According to Moore’s Law, how often does computing power double?",
    "Every 18 months",
    [
      "Every 18 days",
      "Every 18 years",
      "Every 225 million years"
    ],
    "Moore’s Law states that computing power doubles approximately every 18 months."
  ),

  () => makeQuestion(
    "Why is Moore’s Law slowing down?",
    "Microchips have already been optimized close to their physical limits.",
    [
      "Quantum computers have made classical computers obsolete.",
      "There is no longer any demand for faster computing.",
      "Microchips are becoming too large to manufacture."
    ],
    "Moore’s Law is slowing because conventional microchips have already been optimized near their limits."
  ),

  () => makeQuestion(
    "What comparison did Sundar Pichai make about quantum computing?",
    "It is comparable to the Wright brothers’ first flight.",
    [
      "It is comparable to the invention of the printing press.",
      "It is comparable to the discovery of fire.",
      "It is comparable to the development of the automobile."
    ],
    "Sundar Pichai compared the current stage of quantum computing to the Wright brothers’ early flight."
  ),

  () => makeQuestion(
    "Which company was the first major quantum computing company to go public?",
    "IonQ",
    [
      "IBM",
      "Google",
      "ExxonMobil"
    ],
    "IonQ was the first major quantum computing company to become publicly traded."
  ),

  () => makeQuestion(
    "What is the purpose of the National Quantum Initiative Act?",
    "To fund quantum research",
    [
      "To regulate lithium-sulfur battery sales",
      "To replace classical computers with quantum computers immediately",
      "To fund the Haber-Bosch process"
    ],
    "The National Quantum Initiative Act provides funding for quantum research."
  ),

  () => makeQuestion(
    "What is computational chemistry in the context of quantum computing?",
    "Simulating chemical properties using quantum computers",
    [
      "Using classical computers to build physical batteries",
      "Using quantum computers only to encrypt data",
      "Using chemical reactions to cool atoms"
    ],
    "Computational chemistry uses quantum computers to simulate the properties and behavior of chemicals."
  ),

  () => makeQuestion(
    "What is the key bottleneck for solar energy?",
    "The battery",
    [
      "The solar panel",
      "The electrical grid",
      "The inverter"
    ],
    "The battery is the key bottleneck for solar energy."
  ),

  () => makeQuestion(
    "Which battery technology are utilities and car companies trying to improve?",
    "Lithium-sulfur batteries",
    [
      "Lead-acid batteries",
      "Nickel-cadmium batteries",
      "Alkaline batteries"
    ],
    "Utilities and car companies are working to increase the capacity and recharge speed of lithium-sulfur batteries."
  ),

  () => makeQuestion(
    "Which two battery characteristics are companies trying to improve in lithium-sulfur batteries?",
    "Capacity and recharge speed",
    [
      "Color and weight",
      "Voltage and temperature",
      "Cost and thickness"
    ],
    "Companies are trying to increase lithium-sulfur battery capacity and recharge speed."
  ),

  () => makeQuestion(
    "Which company uses IBM’s quantum computers to develop new chemicals for low-energy processing and carbon capture?",
    "ExxonMobil",
    [
      "IonQ",
      "Google",
      "Tesla"
    ],
    "ExxonMobil uses IBM’s computers to help create new chemicals for low-energy processing and carbon capture."
  ),

  () => makeQuestion(
    "What drove the Green Revolution?",
    "The Haber-Bosch process",
    [
      "The development of lithium-sulfur batteries",
      "The invention of quantum supremacy",
      "The National Quantum Initiative Act"
    ],
    "The Green Revolution was driven by the Haber-Bosch process, which enabled large-scale fertilizer production."
  ),

  () => makeQuestion(
    "Approximately what percentage of the world’s energy is used by the Haber-Bosch process?",
    "2%",
    [
      "10%",
      "25%",
      "50%"
    ],
    "The Haber-Bosch process accounts for approximately 2% of the world’s energy use."
  ),

  () => makeQuestion(
    "How might quantum computers affect the Haber-Bosch process?",
    "They could reduce the amount of energy it requires.",
    [
      "They could eliminate the need for nitrogen.",
      "They could make the process require more energy.",
      "They could replace fertilizer with solar panels."
    ],
    "Quantum computers could help make the Haber-Bosch process more efficient, reducing its energy use."
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
