"use strict";
//Store Questions and Answers
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

///////////////////Functions Below////////////////////////////////////////////////////////////

let questionNumber = 1;

function updateQuestionNumber() {
    //call this function or increase question number by 1 when Next button is clicked
    if (questionNumber < 10) {
        questionNumber ++;
        //It works! console.log(`Question number is ${questionNumber}`);
    };
};

let overallScore = 0;

function updateScore() {
    //increase by 1 for right answer
    if (overallScore < 10) {
        overallScore ++;
        //It works! console.log(`Score is ${overallScore}`);
    };
};

function generateQuestionNumberAndScore() {
    //create question number and score counter on page
    $("header").append(`
    <section class="question-number-and-score js-question-number-and-score" role="banner">
        <h2 class="question-number js-question-number">Question: ${questionNumber}/10</h2>
        <h2 class="score js-score">Score: ${overallScore}/10</h2>
    </section>`);
};

let storeIndex = 0;

function updateStoreIndex() {
    //go through the STORE array everytime this function is called
    if (storeIndex < STORE.length) {
        storeIndex ++;
        //It works! console.log(`Store index is ${storeIndex}`);
    }; 
};

function generateQuestionAndAnswersForm() {
    //create form for questions and answers
    $("main").append(`
            <form id="js-question-page" role="form">
                <legend class="current-question js-current-question">${STORE[storeIndex].question}</legend>
                <hr class="horizontal-top">
                <fieldset>
                    <section class="container js-container" role="region">
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
    //working console.log('startQuiz ran');
    $('.js-start-button').on("click", function(){
        $('.js-start-page-content').hide();
        generateQuestionNumberAndScore();
        generateQuestionAndAnswersForm();
    });
};

function generateRightOrWrongAnswerPage() {
    //create right or wrong answer page based on user's answer
    //find value of raido and get it's label's text to compare to right answer in array
    let radioValue = $("input[name=answer]:checked").val();

    let userAnswer = $(`label[for=${radioValue}]`).text();

    let rightOrWrong = null;
    let commentOnAnswer = null;
    let pumpkinImage = null;
    let altText = null;

    if (userAnswer === STORE[storeIndex].rightAnswer) {
        //right answer
        rightOrWrong = 'Right Answer!';
        commentOnAnswer = "Nice job! You're bootiful!";
        pumpkinImage = 'happy-pumpkins.jpg';
        altText = 'Happy'
        updateScore(overallScore);
        $('.js-score').text(`Score: ${overallScore}/10`);

    } else {
        //wrong answer
        rightOrWrong = 'Wrong Answer!';
        commentOnAnswer = `The right answer is:<br>${STORE[storeIndex].rightAnswer}`;
        pumpkinImage = 'sadpumpkins.jpg';
        altText = 'Sad'
    };

    $('main').append(`
    <form id="js-right-or-wrong-page">
        <legend>${rightOrWrong}</legend>
        <img class="jack-o-lantern-pictures" src="images/${pumpkinImage}" alt="Two ${altText} Jack-o'-lantern Pumpkins" role="img">
        <p class="comment js-comment">${commentOnAnswer}</p>
        <button type="button" class="next-button js-next-button" role="button">Next</button>
    </form>`);
};

function submitAnswer() {
    // working console.log(`submitAnswer ran`);
    //we need to focus on the input being selected
    //should submit form's answer and generate a text 'right or wrong answer!' on screen
    //Right Answer: Updates score by 1 and displays happy image
    //Wrong Answer: Displays sad image and the right answer
    $('#js-question-page').on("submit", (function(event) { //submit from form element
        event.preventDefault();
        $('#js-question-page').hide();
        generateRightOrWrongAnswerPage();
        nextQuestion();//make 'next' button work on its form
    }));
};

function finalScorePage() {
    //create final score and resulting message page
    let commentOnScore = null;
    let finalImage = null;
    let imageAltText = null;

    if (overallScore < 4) { //Bad Score (0-3)
        commentOnScore = "Do you even know what happens on October 31st? Go get a costume, you're missing out on the sweet treats!";
        finalImage = "pumpkin-misty.jpg";
        imageAltText = "A cat about to lick an unhappy jack-o'-lantern and has a dialogue box above it asking, 'Can I eat this?'.";
    } else if (overallScore > 3 && overallScore < 8) { //Good Score (4-7)
        commentOnScore = "Not bad! You almost know everything spooky about Halloween.<br>Don't be a scaredy cat . . . <br>try to beat your score.";
        finalImage = "ghost-behind-you.jpg";
        imageAltText = "A close up of a gray cat's eyes and head with a small cartoon ghost in the background."
    } else if (overallScore <= 10) { //Great Score (8-10)
        commentOnScore = "You're an expert alright!<br>Have a bootiful and spooktacular Halloween!"
        finalImage = "pumpkin-carving.jpg";
        imageAltText = "A close-up view of a lighted up pumpkin in the dark with a cat sitting on a tree branch carved into the pumpkin."
    };

    $('main').append(`
        <form id="final-score-page" role="form">
            <p class="user-final-score">Your Score is: ${overallScore}/10</p>
            <img class="final-picture" src="images/${finalImage}" alt="${imageAltText}" role="img">
            <p class="final-comment">${commentOnScore}</p>
            <button class="restart-button js-restart-button" type="reset" role="button">Restart Quiz</button>
        </form>`);
};

function nextQuestion() {
    // working console.log('nextQuestion ran');
    //should generate the next question with answers
    //updates question number and displays current score
    //after the last question #10, the final score should be generated with a comment based on the final score earned

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
};

function restartQuiz() {
    //working console.log('restartQuiz ran');
    //should generate the start page
    $('#final-score-page').on("click", '.restart-button', function() {
        $('#final-score-page').detach();
        questionNumber = 1;
        overallScore = 0;
        storeIndex = 0;
        $('.js-question-number-and-score').detach();
        $('.js-start-page-content').show();
    });
};

//calls and runs the function startQuiz
function createHalloweenQuiz() {
    startQuiz();
};

$(createHalloweenQuiz);