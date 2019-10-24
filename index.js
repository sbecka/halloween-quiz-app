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

//Functions Below////////////////////////////////////////////////////////////

let questionNumber = 1;

function updateQuestionNumber() {
    //call this function or increase question number by 1 when Next button is clicked
    if (questionNumber < 10) {
        questionNumber ++;
        console.log(`Question number is ${questionNumber}`);
    };
};

let overallScore = 0;

function updateScore() {
    //increase by 1 for right answer
    if (overallScore < 10) {
        overallScore ++;
        console.log(`Score is ${overallScore}`);
    };
};

function generateQuestionNumberAndScore() {
    $("header").append(`
    <section class="question-number-and-score js-question-number-and-score">
        <h2 class="question-number js-question-number">Question: ${questionNumber}/10</h2>
        <h2 class="score js-score">Score: ${overallScore}/10</h2>
    </section>`);
};

let storeIndex = 0;

function updateStoreIndex() {
    
    if (storeIndex < STORE.length) {
        storeIndex ++;
        console.log(`Store index is ${storeIndex}`);
    }; 
};

function generateQuestionAndAnswersForm() {

    $("main").append(`
            <form id="js-question-page">
                <legend class="current-question js-current-question">${STORE[storeIndex].question}</legend>
                <fieldset>
                    <section class="container js-container" role="contentinfo">
                    </section>
                </fieldset>
                <button class="submit-button js-submit-button" type="submit" role="button">Submit</button>
            </form>`);
    
    for (let i = 0; i < STORE[storeIndex].answers.length; i++) {
        $(".js-container").append(`
            <div class="answers"> 
                <input type="radio" name="answer" id="answer${i+1}" value="answer${i+1}"required>
                <label for="answer${i+1}">${STORE[storeIndex].answers[i]}</label>
            </div>`);
    };

    submitAnswer();//allow the form to be submitted
};

function startQuiz() { 
    console.log('startQuiz ran');
    $('.js-start-button').on("click", function(){
        $('.js-start-page-content').hide();
        generateQuestionNumberAndScore();
        generateQuestionAndAnswersForm();
        
        
    });
};

function generateRightOrWrongAnswerPage() {
    
    let radioValue = $("input[name=answer]:checked").val();

    let userAnswer = $(`label[for=${radioValue}]`).text();

    let rightOrWrong = null;
    let commentOnAnswer = null;
    let pumpkinImage = null;
    let altText = null;

    if (userAnswer === STORE[storeIndex].rightAnswer) {

        rightOrWrong = 'Right Answer!';
        commentOnAnswer = 'Nice job!';
        pumpkinImage = 'happy-pumpkins.jpg';
        altText = 'Happy'
        updateScore(overallScore);
        $('.js-score').text(`Score: ${overallScore}/10`);

    } else {

        rightOrWrong = 'Wrong Answer!';
        commentOnAnswer = `The right answer is: ${STORE[storeIndex].rightAnswer}`;
        pumpkinImage = 'sadpumpkins.jpg';
        altText = 'Sad'
    };

    $('main').append(`
    <form id="js-right-or-wrong-page">
        <legend>${rightOrWrong}</legend>
        <img src="images/${pumpkinImage}" alt="${altText} Jack-o'-lanterns">
        <p class="comment js-comment">${commentOnAnswer}</p>
        <button type="button" class="next-button js-next-button" role="button">Next</button>
    </form>`);
};

function submitAnswer() {
    console.log(`submitAnswer ran`);
    $('#js-question-page').on("submit", (function(event) { //submit from form element
        event.preventDefault();
        $('#js-question-page').hide();
        generateRightOrWrongAnswerPage();
        nextQuestion();//make next button work on its form
    }));
};
    //we need to focus on the input being selected
    //should submit form's answer and generate a text 'right or wrong answer!' on screen
    //Right Answer: Updates score by 1 and displays happy image
    //Wrong Answer: Displays sad image and the right answer
function finalScorePage() {

    let commentOnScore = null;

    if (overallScore < 4) {
        commentOnScore = "Do you even know what happens on October 31st? Go get a costume, you're missing out on the sweet treats!";
    } else if (overallScore > 3 && overallScore < 8) {
        commentOnScore = "Not bad! You almost know everything spooky about Halloween. Don't be a scaredy cat...try to beat your score.";
    } else if (overallScore <= 10) {
        commentOnScore = "You're an expert alright! Have a bootiful and spooktacular Halloween!"
    };

    $('main').append(`
        <form id="final-score-page">
            <p class="user-final-score">Your Score is: ${overallScore}/10</p>
            <img src="images/ghost-behind-you.jpg" alt="Happy Image">
            <p class="final-comment">${commentOnScore}</p>
            <button class="restart-button js-restart-button" type="reset" role="button">Restart Quiz</button>
        </form>`);
};

function nextQuestion() {
    console.log('nextQuestion ran');
    $('#js-right-or-wrong-page').on("click", '.next-button', function() { //targeting submit from form

        if (questionNumber < 10) {
            updateQuestionNumber(questionNumber);
            $('.js-question-number').text(`Question: ${questionNumber}/10`);

            updateStoreIndex();
            $('#js-right-or-wrong-page').detach();
            $('#js-question-page').detach();
            generateQuestionAndAnswersForm();
        };

    });

    if (questionNumber === 10) {
        $('#js-right-or-wrong-page').on("click", '.next-button', function() {
            finalScorePage();
            $('#js-right-or-wrong-page').detach();
            $('#js-question-page').detach();
            restartQuiz();
        });
    };
    //should generate the next question with answers
    //updates question number and displays current score
    //after the last question #10, the final score should be generated with a comment based on the final score earned
};

function restartQuiz() {
    console.log('restartQuiz ran');
    $('#final-score-page').on("click", '.restart-button', function() {
        $('#final-score-page').detach();
        questionNumber = 1;
        overallScore = 0;
        storeIndex = 0;
        $('.js-question-number-and-score').detach();
        $('.js-start-page-content').show();
    });
    
    //should generate the start page
};


//calls and runs the function
function createHalloweenQuiz() {
    startQuiz();
};

$(createHalloweenQuiz);