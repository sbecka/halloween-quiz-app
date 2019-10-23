"use strict";

const STORE = [
    //1/10
    {
        question: "Halloween is believed to originate in which country?",
        answers: ["Germany", "England", "Ireland", "Norway"],
        rightAnswer: "Ireland"  
    },
    //2/10
    {
        question: "Halloween is also known as which of the following?",
        answers: ["Hallows’ Evening", "All Hallows’ Eve", "All Saints’ Eve", "All of the above"],
        rightAnswer: "All of the above"
    },
    //3/10
    {
        question: "What do you call a group of witches?",
        answers: ["A spell", "A yule", "A coven", "A wicca"],
        rightAnswer: "A coven"
    },
    //4/10
    {
        question: "The first jack-o’-lanterns were carved out of which food before pumpkins?",
        answers: ["Watermelons", "Turnips", "Onions", "Apples"],
        rightAnswer: "Turnips"
    },
    //5/10
    {
        question: "How much candy corn is produced each year?",
        answers: ["26 million pounds", "29 million pounds", "35 million pounds", "43 million pounds"],
        rightAnswer: "35 million pounds"
    },
    //6/10
    {
        question: "In what year will a full moon happen on Halloween night?",
        answers: ["2019", "2020", "2021", "2022"],
        rightAnswer: "2020"
    },
    //7/10
    {
        question: "What does it mean when you see a black cat crosses your path?",
        answers: ["You will receive good fortune.", "You will turn into a witch.", "You will have bad luck.", "You will adopt a cat soon."],
        rightAnswer: "You will have bad luck."
    },
    //8/10
    {
        question: "What does it mean when you see a spider on Halloween?",
        answers: ["The spirit of a loved one is watching over you.", "It is a spirit trying to give you magic powers.", "You will have bad luck with vampires.", "It wants to turn you into spiderman."],
        rightAnswer: "The spirit of a loved one is watching over you."
    },
    //9/10
    {
        question: "What do the orange and black colors symbolize?",
        answers: ["Pumpkins and Night", "Sunset and Midnight", "Harvest and Death", "Light and Darkness"],
        rightAnswer: "Harvest and Death"
    },
    //10/10
    {
        question: " What is thought to be the purpose of wearing costumes?",
        answers: ["Helps you gain magic powers when eating candy", "Walking in someone else’s shoes for a night", "Being able to connect with loved ones in the afterlife", "Protection from evil spirits that come out at night"],
        rightAnswer: "Protection from evil spirits that come out at night"
    },    
];
//Functions Below

let questionNumber = 1;

function updateQuestionNumber() {
    //call this function or increase question number by 1 when Next button is clicked
    questionNumber += 1;
    console.log(questionNumber);
};

let overallScore = 0;

function updateScore() {
    //increase by 1 for right answer
    overallScore += 1;
    console.log(overallScore);
};

function generateQuestionNumberAndScore() {
    $("header").append(`
    <section class="question-number-and-score">
        <h2 class="question-number js-question-number">Question: ${questionNumber}/10</h2>
        <h2 class="score js-score">Score: ${overallScore}/10</h2>
    </section>`);
};

let currentObject = STORE[0];

function generateQuestionAndAnswersForm() {

    let currentQuestion = currentObject.question;

    $("main").append(`
            <form id="js-question-page">
                <legend class="current-question js-current-question">${currentQuestion}</legend>
                <fieldset>
                    <section class="container js-container" role="contentinfo">
                    </section>
                </fieldset>
                <button class="submit-button js-submit-button" type="submit" role="button">Submit</button>
            </form>`);
    
    for (let i = 0; i < currentObject.answers.length; i++) {
        $(".js-container").append(`
            <div class="answers"> 
                <input type="radio" name="answer" id="answer${i+1}" value="answer${i+1}"required>
                <label for="answer${i+1}">${currentObject.answers[i]}</label>
            </div>`);
    };
};

function startQuiz() {
    console.log('startQuiz ran');
    $('.js-start-button').on("click", function(){
        $('.js-start-page-content').hide();
        generateQuestionNumberAndScore();
        generateQuestionAndAnswersForm(currentObject);
    });
};

function generateRightOrWrongAnswerPage() {
    
    let radioValue = $("input[name=answer]:checked").val();

    let userAnswer = $(`label[for=${radioValue}]`).text();

    let rightOrWrong = null;
    let commentOnAnswer = null;
    let pumpkinImage = null;
    let altText = null;

    if (userAnswer === currentObject.rightAnswer) {

        rightOrWrong = 'Right Answer!';
        commentOnAnswer = 'Nice job!';
        pumpkinImage = 'happy-pumpkins.jpg';
        altText = 'Happy'
        updateScore(overallScore);
        $('.js-score').text(`Score: ${overallScore}/10`);

    } else {

        rightOrWrong = 'Wrong Answer!';
        commentOnAnswer = `The right answer is: ${currentObject.rightAnswer}.`;
        pumpkinImage = 'sadpumpkins.jpg';
        altText = 'Sad'
    };

    $('main').append(`
    <form class="right-or-wrong-page">
        <legend>${rightOrWrong}</legend>
        <img src="images/${pumpkinImage}" alt="${altText} Jack-o'-lanterns">
        <p class="comment js-comment">${commentOnAnswer}</p>
        <button type="button" class="next-button js-next-button" role="button">Next</button>
    </form>`);
};

function submitAnswer() {
    console.log(`submitAnswer ran`);
    $('main').submit(function(event) {
        event.preventDefault();
        $('#js-question-page').hide();
        generateRightOrWrongAnswerPage();
    });
};
    //we need to focus on the input being selected
    //should submit form's answer and generate a text 'right or wrong answer!' on screen
    //Right Answer: Updates score by 1 and displays happy image
    //Wrong Answer: Displays sad image and the right answer
function nextQuestion() {
    console.log('nextQuestion ran');
    //should generate the next question with answers
    //updates question number and displays current score
    //after the last question #10, the final score should be generated with a comment based on the final score earned
};

function restartQuiz() {
    console.log('restartQuiz ran');
    //should generate the start page
};


//calls and runs the functions
function createHalloweenQuiz() {
    startQuiz();
    submitAnswer();
    nextQuestion();
    restartQuiz();
};

$(createHalloweenQuiz);