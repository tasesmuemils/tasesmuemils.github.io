/* JS QUIZ by EMILS BISENIEKS
10 questions */

//BUTTONS
const button = document.querySelector('#button1');
button.addEventListener('click', loadQuestion);

const button2 = document.querySelector('#button2');
button2.addEventListener('click', function () {
    document.querySelector('.answers').style.display = 'grid';
    document.querySelector('.counterSection').style.display = 'grid';
    document.getElementById('quizDescription').style.display = 'none';
    button2.style.display = 'none';
    loadQuestion();
});

//STORED VARIABLES
const question = document.getElementById('question');
const answerA = document.getElementById('answerA');
const answerB = document.getElementById('answerB');
const answerC = document.getElementById('answerC');
const answerD = document.getElementById('answerD');

const checkA = document.getElementById('check_A');
const checkB = document.getElementById('check_B');
const checkC = document.getElementById('check_C');
const checkD = document.getElementById('check_D');
const radios = [checkA, checkB, checkC, checkD];

const errorMessage = document.getElementById('warning');
const correctCount = document.getElementById('correct');
const incorrectCount = document.getElementById('incorrect');
const finalScore = document.getElementById('finalScore');

let eventClickCount = 0;
var correctCountValue = 0;
var incorrectCountValue = 0;
let i = 0;


//FUNCTION (take data from .JSON with AJAX methods)
function loadQuestion() {
    eventClickCount++;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'js/data.json', true);

    xhr.onload = function () {
        if (this.status == 200) {
            //Store string data from .json in array
            const dataArray = JSON.parse(this.responseText);

            //IF no answer is selected
            if ((eventClickCount > 1) && ((checkA.checked == false) && (checkB.checked == false) && (checkC.checked == false) && (checkD.checked == false))) {
                errorMessage.style.display = 'block';
                return;
            } else {
                errorMessage.style.display = 'none';
            }

            //Stored correct answer
            var correctAnswer = dataArray[i].correct;

            function answerCheck() {
                //loads first questions
                if (eventClickCount === 1) {
                    return;
                }

                //checks answers
                for (let k = 0; k < radios.length; k++) {
                    if ((radios[k].checked === true) && (radios[k].parentNode.textContent == correctAnswer)) {
                        correctCountValue++;
                        correctCount.textContent = correctCountValue;

                    } else if ((radios[k].checked === true) && (radios[k].parentNode.textContent != correctAnswer)) {
                        incorrectCountValue++;
                        incorrectCount.textContent = incorrectCountValue;
                    }
                }

                //after every answer submit, cleans radio buttons
                function uncheckAll() {
                    for (let z = 0; z < radios.length; z++) {
                        radios[z].checked = false;
                    }
                }
                uncheckAll();

            }

            function nextQuestion() {
                if (eventClickCount > 1) {
                    i++;
                }

                //when Quiz ends
                if (i == dataArray.length) {
                    document.querySelector('.answers').style.display = 'none';
                    document.querySelector('.counterSection').style.display = 'none';
                    question.style.display = 'none';
                    document.getElementById('finish').style.display = 'block';
                    finalScore.textContent = correctCountValue;
                    button.removeEventListener('click', loadQuestion);
                }
            }

            //loads quiz content
            function quizContent() {
                question.textContent = dataArray[i].question;
                answerA.textContent = dataArray[i].answer_A;
                answerB.textContent = dataArray[i].answer_B;
                answerC.textContent = dataArray[i].answer_C;
                answerD.textContent = dataArray[i].answer_D;

            }


            answerCheck();

            nextQuestion();

            quizContent();

        }
    }
    xhr.send();
}
