/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {// Question 1
      question: 'How long do Sea Turtles live for?',
      answers: [
        '25 years',
        '50 years',
        '80 years',
        '100 years'
      ],
      correctAnswer: '100 years'
    },
    {// Question 2
      question: 'How does a Sea Turtle know which direction to go?',
      answers: [
        "It uses the Earth's magnetic field as a compass",
        'It guesses',
        'It follows the tides',
        'By looking at where the sun is in the sky'
      ],
      correctAnswer: "It uses the Earth's magnetic field as a compass"
    },
    {// Question 3
      question: 'How long can a Sea Turtle hold its breath underwater?',
      answers: [
        '1 hour',
        '3 hours',
        '4 hours',
        '5 hours'
      ],
      correctAnswer: '5 hours'
    },
    {// Question 4
      question: 'How long have Sea Turtles been on Earth?',
      answers: [
        'About 50,000 years',
        'About 100,000 years',
        'About 100 million years',
        'About 200 million years'
      ],
      correctAnswer: 'About 100 million years'
    },
    {// Question 5
      question: 'How fast can a Sea Turtle swim?',
      answers: [
        '100 miles per hour',
        '22 miles per hour',
        '12 miles per hour',
        '5 miles per hour'
      ],
      correctAnswer: '22 miles per hour'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  answerSubmit: false,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
 function startScreen() {
  return `
  <form>
    <button type="submit" class="start-button">Start</button>
  </form>
  `;
}





function questionScreen(questionObject) {
  //console.log(store.questions.length);
  //console.log(store.questionNumber) 
  if(store.questionNumber === store.questions.length - 1) {
    return `
      <h4 class="score-number">Score ${store.score} / ${store.questions.length}</h4>
      <h4 class="question-number">Question ${questionObject.index} / ${store.questions.length}</h4>
      <h3 class="question-question">${questionObject.question.question}</h3>
      <div class="popup-overlay">
        <div class="popup-content">
          <button class="finish">Finish</button>
        </div>
      </div>
      <form>
        <ol>
          ${quizAnswerDisplay(questionObject.question.answers)}
        </ol>
        <button type="submit" class="submit-answer">Submit</button>
      </form>
    `;
  }
  else {
    return `
    <h4 class="score-number">Score ${store.score} / ${store.questions.length}</h4>
    <h4 class="question-number">Question ${questionObject.index} / ${store.questions.length}</h4>
    <h3 class="question-question">${questionObject.question.question}</h3>
    <div class="popup-overlay">
      <div class="popup-content">
        <button class="continue">Continue</button>
      </div>
    </div>
    <form>
      <div class="center-answer">
        <ol>
          ${quizAnswerDisplay(questionObject.question.answers)}
        </ol>
      </div>
      <button type="submit" class="submit-answer">Submit</button>
    </form>
    `;
  } 
}




function quizAnswerDisplay(answers) {
  let answerArray = [];
  let indexArray =[];
  answers.forEach(answers => {
    answerArray.push(answers);
    indexArray.push(answers.indexOf(answers));
  });
  return answerArray.map(answers => answerDisplayString(answers)).join('');
}



function answerDisplayString(answers) {
  let questionNumber = store.questionNumber
  let name = store.questions[questionNumber].answers.indexOf(answers);
  //console.log(name)
  return `
      <li>
        <label for="answer${name}"><input type="radio" name="answer" id="answer${name}" value="${answers}"><span class="text-wrapper">${answers}</span></label>
      </li>
  `;
}


function scoreTracker() {
  return `
  <h1>Sea Turtle Quiz</h1>
  `;
}


function endScreen() {
  return `
  <h2 class="final">Final Score</h2>
  <h2 class="final-score">${store.score} / ${store.questions.length}</h2>
  <button type="submit" class="again">Try Again?</button>
  `;
} 


function endScreenTitle() {
  return `
  <h1>Sea Turtle Quiz
  `;
}


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz() {
  //console.log("renderQuiz running");
  if (store.quizStarted === false) {
    //console.log("false")
    if(store.questionNumber === store.questions.length) {
      const endScreenTitleRender = endScreenTitle();
      const endScreenRender = endScreen();
      $('main').html(endScreenRender);
      $('header').html(endScreenTitleRender)
    }
    else {
      //console.log(store.questionNumber)
      const startScreenRender = startScreen();
      $('main').html(startScreenRender); 
    } 
  }
    else if (store.quizStarted === true) {
     //console.log("true")
     //console.log(store.answerSubmit)
    if(store.answerSubmit === false) {
      //console.log(currentQuestion())
      const scoreRender = scoreTracker();
      const questionScreenRender = questionScreen(currentQuestion());
      $('main').html(questionScreenRender);
      $('header').html(scoreRender)
    }
  }
}


function startQuiz() {
  //change the store.quizStarted value to true
  //console.log('Start Quiz');
  store.quizStarted = true;
}

function currentQuestion(){
  //console.log("current question")
  let index = store.questionNumber;
  //console.log(index)
  let questionCurrent = store.questions[index];
  //console.log(questionCurrent)
  return {
    index: index +1,
    question: questionCurrent
  };
}



function nextQuestion() {
  if (store.questionNumber < store.questions.length) {
    store.questionNumber++;
    store.answerSubmit = false
  }
  else if(store.questionNumber === store.questions.length) {
    store.quizStarted = false;
  }
}



function correctAnswerVerify() {
  let radios = $('input:radio[name=answer]');
  let selectedAnswer = $('input[name="answer"]:checked').val();
  let questionNumber = store.questionNumber;
  let correctAnswer = store.questions[questionNumber].correctAnswer;
  //console.log(selectedAnswer);
  //console.log(radios);
  let correctResponse = 
    `<p>Correct</p>
    <p>Great job!</p>`;
  let incorrectResponse =
    `<p class="incorrect">Incorrect</p>
    <p class="incorrect-response">Correct answer is ${correctAnswer}</p>`
  if (radios.filter(':checked').length === 0) {
    alert('Please select an answer.');
    return;
  } 
  else {
    store.answerSubmit = true;
    if(selectedAnswer === correctAnswer){
      store.score += 1;
      $('div.popup-content').prepend(correctResponse)
    }
    else {
      $('div.popup-content').prepend(incorrectResponse)
    }
  }
}


function finishQuiz() {
  store.quizStarted = false;
  store.questionNumber++;
}


function restartQuiz() {
  store.quizStarted = false;
  store.questionNumber = 0;
  store.answerSubmit = false;
  store.score = 0;
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartButton() {
  
  $('main').on('click', '.start-button', (event) =>{
    event.preventDefault();
    console.log('clicked')
    startQuiz();
    renderQuiz();
  });
}



function handleSubmitAnswer() {
  $('main').on('click' , '.submit-answer', (event)=>{
    event.preventDefault();
    correctAnswerVerify();
    $('.popup-overlay, .popup-content').addClass('active')
    $('.submit-answer').addClass('hidden');
    renderQuiz();
  });
}



function handleNextQuestion() {
  $('main').on('click', '.continue', (event) => {
    event.preventDefault();
    $('.popup-overlay, .popup-content').removeClass('active')
    $('.submit-answer').removeClass('hidden');
    nextQuestion();
    renderQuiz();
  });
}



function handleFinish() {
  $('main').on('click', '.finish', (event) => {
    event.preventDefault();
    $('.popup-overlay, .popup-content').removeClass('active');
    finishQuiz();
    renderQuiz();
  });
}



function handleTryAgain() {
  $('main').on('click', '.again', (event) => {
    event.preventDefault();
    restartQuiz();
    renderQuiz();
  });
}


// LOAD FUNCTION

function runQuiz() {
  //console.log("runQuiz() is Running")
  renderQuiz();
  handleStartButton();
  handleSubmitAnswer();
  handleNextQuestion();
  handleFinish();
  handleTryAgain();
}

$(runQuiz);