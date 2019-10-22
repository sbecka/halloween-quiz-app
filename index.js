function startQuiz() {
    console.log('startQuiz ran');
}

function submitAnswer() {
    console.log('submitAnswer ran');
}

function nextQuestion() {
    console.log('nextQuestion ran');
}

function restartQuiz() {
    console.log('restartQuiz ran');
}


//calls and runs the functions
function createQuiz() {
    startQuiz();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}

$(createQuiz);