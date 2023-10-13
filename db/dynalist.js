const triviaQuiz = {
  type: "trivia",
  id: 442423542542,
  title: "",
  slug: "",
  img: "",
  excerpt: "",
  description: "",
  date: new Date(),
  score: 0,

  // settings
  options: {
    randomizeQuestions: true,
    randomizeAnswers: true,
    timeToComplete: 0,
  },

  // Trivia
  questions: [
    {
      title: "",
      img: "",
      answerWithImages: false,

      answers: [
        {
          title: "",
          img: "",
          correct: false,
        },
      ],
    },
  ],

  // results
  results: [
    {
      min: 0,
      max: 100,
      title: "",
      img: "",
      description: "",
    },
  ],
};

const personalityQuiz = {
  type: "personality",
  id: 442423542542,
  title: "",
  slug: "",
  img: "",
  excerpt: "",
  description: "",
  date: new Date(),

  //   settings
  options: {
    randomizeQuestions: true,
    randomizeAnswers: true,
    timeToComplete: 0,
  },

  // Trivia
  questions: [
    {
      title: "",
      img: "",
      answerWithImages: false,

      answers: [
        {
          title: "",
          img: "",
          correct: false,
        },
      ],
    },
  ],
};

function debounce(fn, delay) {
  let timer = setTimeout(fn, delay);
}

// set delay to 1 second then call the input value
function inputDebounce(handlerFunc, delay = 1000) {
  let timeoutID;

  if (timer) {
    console.log("timer is defined");
  }

  return () => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      handlerFunc();
    }, delay);
  };
}
