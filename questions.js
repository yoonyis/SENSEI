export const questions = [
  {
    id: 1,
    topic: "stability",
    question:
      "For a continuous-time LTI system to be stable, where should its poles lie?",
    options: [
      "Right half of the s-plane",
      "Left half of the s-plane",
      "On the imaginary axis",
      "At the origin"
    ],
    answer: 1,
    diagnosis: {
      0: "concept",
      2: "concept",
      3: "memory"
    }
  },

  {
    id: 2,
    topic: "feedback",
    question:
      "What is the main effect of negative feedback on system sensitivity?",
    options: [
      "It increases sensitivity",
      "It reduces sensitivity",
      "It eliminates the transfer function",
      "It makes the system open-loop"
    ],
    answer: 1,
    diagnosis: {
      0: "concept",
      2: "memory",
      3: "concept"
    }
  },

  {
    id: 3,
    topic: "transfer-functions",
    question:
      "The transfer function of a system is defined as the ratio of output to input under which condition?",
    options: [
      "Zero initial conditions",
      "Maximum initial conditions",
      "Steady-state conditions only",
      "Non-zero initial conditions"
    ],
    answer: 0,
    diagnosis: {
      1: "memory",
      2: "concept",
      3: "memory"
    }
  },

  {
    id: 4,
    topic: "block-diagrams",
    question:
      "For two blocks connected in series, the equivalent transfer function is:",
    options: [
      "G1 + G2",
      "G1 - G2",
      "G1 × G2",
      "G1 / G2"
    ],
    answer: 2,
    diagnosis: {
      0: "concept",
      1: "concept",
      3: "application"
    }
  },

  {
    id: 5,
    topic: "time-response",
    question:
      "Which response occurs immediately after an input is applied to a control system?",
    options: [
      "Transient response",
      "Steady-state response",
      "Frequency response",
      "Random response"
    ],
    answer: 0,
    diagnosis: {
      1: "concept",
      2: "memory",
      3: "memory"
    }
  },

  {
    id: 6,
    topic: "frequency-response",
    question:
      "Which plot is commonly used to represent the frequency response of a control system?",
    options: [
      "Bode plot",
      "Root locus only",
      "Step response only",
      "Pole-zero table"
    ],
    answer: 0,
    diagnosis: {
      1: "memory",
      2: "memory",
      3: "concept"
    }
  }
];