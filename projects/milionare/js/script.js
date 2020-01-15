// Who Wants to Be a Millionaire?
// Created by Emils Bisenieks 2020


//Stored HTML elements
const logo = document.getElementById("logo");
const startGameButton = document.getElementById("start-btn");
const controlsContainer = document.getElementById("controls-wrapper");
const nextButton = document.getElementById("next-btn");
const rulesButton = document.getElementById("rules-btn");
const repeatButton = document.getElementById("repeat-btn");
const gameRules = document.getElementById("rules");
const resultTable = document.getElementById("result-table");
const resultTableItems = document.querySelectorAll(".table-item");
const questionsContainer = document.getElementById("question-container");
const helpOptions = document.getElementById("help-options");
const twoOptions = document.getElementById("two-options");
const callFriend = document.getElementById("call-friend");
const googleIt = document.getElementById("google-it");
const questionType = document.getElementById("question-type");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const childQuestion = document.getElementById("child-question");
let shuffledQuestions, currentQuestionIndex;



//fetch data from .json file
let questions = [];
fetch("js/questions.json").then(response => response.json()).then(data => {
    for (let i = 0; i < data.length; i++) {
        questions.push(data[i]);
    }
});




// Sound effects
const after6QuestionSound = new Audio("sound/question_after_6_theme.mp3");
const after1QuestionSound = new Audio("sound/question_after_1_theme.mp3");
const correctAnswerSound = new Audio("sound/correct_answer.mp3");
const wrongAnswerSound = new Audio("sound/wrong_answer.mp3");
const finalAnswerSound = new Audio("sound/final_answer.mp3");
const letsPlaySound = new Audio("sound/lets_play.mp3");
const phoneAFriendSound = new Audio("sound/phone_a_friend.mp3");
const twoOptionsSound = new Audio("sound/50_50_sound.mp3");



letsPlaySound.play();
after1QuestionSound.play();

//Pause background sound
function pauseQuestionSounds() {
    after1QuestionSound.pause();
    after6QuestionSound.pause();
}

//Shows rules screen
function rulesScreen() {
    logo.classList.add("hide");
    document.getElementById("container-id").classList.add("container-rules");
    gameRules.classList.remove("hide");
    rulesButton.classList.add("hide");
    startGameButton.classList.remove("hide");
}

//Event listeners for buttons
rulesButton.addEventListener("click", rulesScreen);

repeatButton.addEventListener("click", () => {
    rulesScreen();
    questionsContainer.classList.add("hide");
    repeatButton.classList.add("hide");
});

startGameButton.addEventListener("click", showTable);
nextButton.addEventListener("click", () => {
    resultTable.classList.remove("hide");
    questionsContainer.classList.add("hide");
    nextButton.classList.add("hide");
    controlsContainer.classList.add("hide");
})


twoOptions.addEventListener("click", twoOptionsCheck);
callFriend.addEventListener("click", callTimer);
googleIt.addEventListener("click", callTimer);



//function to show question table
function showTable() {
    letsPlaySound.play();
    after1QuestionSound.pause();
    gameRules.classList.add("hide");
    startGameButton.classList.add("hide");
    controlsContainer.classList.add("hide");
    resultTable.classList.remove("hide");
    Array.from(resultTableItems)
        .forEach(row => {
            if (row.classList.contains("current-question")) {
                row.style.cursor = "pointer";
                row.style.fontWeight = "100";
                row.addEventListener("click", startGame);
            }
        });
}

//Opnes question window
function startGame(e) {
    resultTable.classList.add("hide");
    questionsContainer.classList.remove("hide");
    startGameButton.classList.add("hide");
    const chooseSection = e.target.parentNode;
    console.log(e.target.parentNode);
    chooseSection.classList.remove("current-question");
    chooseSection.style.cursor = "auto";
    chooseSection.removeEventListener("click", startGame);
    chooseSection.style
    const questionSectionArray = [];

    for (let i = 0; i < questions.length; i++) {
        if (chooseSection.firstElementChild.textContent == questions[i].section) {
            questionSectionArray.push(questions[i]);
        }
    };

    shuffledQuestions = questionSectionArray.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;

    if (shuffledQuestions === undefined || shuffledQuestions.length == 0) {
        controlsContainer.classList.remove("hide");
        nextButton.classList.remove("hide");
        questionType.classList.add("hide");
        nextButton.textContent = "Uz sākumu";
        nextButton.addEventListener("click", () => {
            document.location.reload(true);
        })
        questionElement.textContent = "Vairāk jautājumu šajā līmenī nav!";
        helpOptions.classList.add("hide");
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
        return;
    }

    setNextQuestion();
}

//Resets default question form and shows real question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//Shows question
function showQuestion(question) {

    after1QuestionSound.currentTime = 0;
    after6QuestionSound.currentTime = 0;

    if (question.section <= 5 || question.section == 16) {
        after1QuestionSound.play();
    } else {
        after6QuestionSound.play();
    }

    question.section = -1;
    questionType.textContent = question.price;
    helpOptions.classList.remove("hide");
    controlsContainer.classList.remove("hide");
    questionType.innerText = question.price;
    questionElement.innerText = question.question;

    //Ads A,B,C,D before questions
    for (let i = 0; i < question.answers.length; i++) {
        if (i == 0) {
            const extraText = question.answers[i].text;
            question.answers[i].text = "A: " + extraText;
        } else if (i == 1) {
            const extraText = question.answers[i].text;
            question.answers[i].text = "B: " + extraText;
        } else if (i == 2) {
            const extraText = question.answers[i].text;
            question.answers[i].text = "C: " + extraText;
        } else if (i == 3) {
            const extraText = question.answers[i].text;
            question.answers[i].text = "D: " + extraText;
        }
    }

    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = answer.text;
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

//50:50 options
function twoOptionsCheck() {
    twoOptionsSound.play();
    const answersArray = Array.from(answerButtonsElement.childNodes);
    const items3Array = [];
    for (let i = 0; i < answersArray.length; i++) {
        if (answersArray[i].dataset.correct !== "true") {
            answersArray[i].classList.add("hide");
            items3Array.push(answersArray[i]);
        }
    }
    const randomWrongAnswers = items3Array.sort(() => Math.random() - 0.5);
    randomWrongAnswer = randomWrongAnswers[0];
    randomWrongAnswer.classList.remove("hide");
    twoOptions.classList.add("hide");

}

//Timer for google option and call friend option
function callTimer(e) {
    e.target.removeEventListener("click", callTimer);
    let timeLeft = 30;
    const timerWrapper = document.createElement("div");
    timerWrapper.classList.add("timer-wrapper");
    const timer = document.createElement("h2");
    timer.textContent = timeLeft;
    const timerButtonWrapper = document.createElement("div");
    timerButtonWrapper.classList.add("timer-button-wrapper");
    const startTimer = document.createElement("button");
    const hideTimer = document.createElement("button");
    startTimer.classList.add("btn");
    hideTimer.classList.add("btn");
    startTimer.addEventListener("click", () => {
        phoneAFriendSound.currentTime = 0;
        phoneAFriendSound.play();
        pauseQuestionSounds();

        const timerId = setInterval(countdown, 1000);

        function countdown() {
            if (timeLeft == 0) {
                clearTimeout(timerId);
                timerWrapper.classList.add("hide");
                e.target.classList.add("hide");
                e.target.classList.add("hide");
            } else {
                timer.textContent = timeLeft - 1;
                timeLeft--;
            }
        }
    })

    hideTimer.addEventListener("click", () => {
        e.target.addEventListener("click", callTimer);
        timerWrapper.classList.add("hide");
        phoneAFriendSound.pause();
    })

    startTimer.textContent = "Sākt!";
    hideTimer.textContent = "Atlikt!";
    timerWrapper.appendChild(timer);
    timerButtonWrapper.appendChild(startTimer);
    timerButtonWrapper.appendChild(hideTimer);
    timerWrapper.appendChild(timerButtonWrapper);

    questionsContainer.insertBefore(timerWrapper, questionsContainer.firstElementChild);
}

//resets answers
function resetState() {
    nextButton.textContent = "Nākošais jautājums";
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

//select answer
function selectAnswer(e) {
    const selectedButton = e.target;
    setStatusClass(selectedButton, selectedButton.dataset.correct);
    Array.from(selectedButton.parentNode.childNodes).forEach(button => {
        button.style.cursor = "auto";
        button.removeEventListener("click", selectAnswer);
    })
    
    console.log(selectedButton.parentNode.childNodes);
}

//checks if answer is correct or incorrect
function setStatusClass(element, correct) {
    finalAnswerSound.play();
    element.classList.add("final-answer");
    pauseQuestionSounds();
    setTimeout(() => {
        controlsContainer.classList.remove("hide");
        if (correct) {
            element.classList.remove("final-answer");
            element.classList.add("correct");
            const resultTableItemsArray = Array.from(resultTableItems);
            for (let i = 0; i < resultTableItemsArray.length; i++) {
                if (questionType.textContent == "1000000 EUR") {
                    controlsContainer.classList.add("hide");
                    setTimeout(() => {
                        logo.classList.remove("hide");
                        document.getElementById("winner-text").classList.remove("hide");
                        questionsContainer.classList.add("hide");
                        nextButton.classList.add("hide");
                        controlsContainer.classList.add("hide");
                    }, 3000);
                } else if (questionType.textContent == resultTableItemsArray[i].lastElementChild.textContent) {
                    const nextTableItem = resultTableItemsArray[i].previousElementSibling;
                    nextTableItem.classList.add("current-question");
                    nextTableItem.style.cursor = "pointer";
                    nextTableItem.addEventListener("click", startGame);  
                }
            }
            nextButton.classList.remove("hide");
            correctAnswerSound.play();
        } else {
            element.classList.remove("final-answer");
            element.classList.add("wrong");
            wrongAnswerSound.play();
            Array.from(answerButtonsElement.children).forEach(button => {
                if (button.dataset.correct) {
                    button.classList.add("correct");
                    repeatButton.classList.remove("hide");
                    resultTableItems[14].classList.add("current-question");
                    resultTableItems[14].style.cursor = "pointer";
                    resultTableItems[14].addEventListener("click", startGame);
                }
            })
        }
    }, 3000);
    element.removeEventListener("click", selectAnswer);
}