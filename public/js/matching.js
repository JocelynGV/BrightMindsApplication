// Declare and Initialize variables for confetti animinations
const canvas = document.querySelector('#confetti');
const jsConfetti = new JSConfetti();

$(document).ready(function () {
    // Add function to whichever button has been clicked
    // $('.answer-option').click(function() {
    //     var answerText = $(this).find('.answer-text').text();
    //     alert(answerText);
    // });

    fetchData();
});

var count = 0;
var correctCount = 0;
async function fetchData() {
    try {
        const response = await fetch('/cards');
        console.log(response);

        const data = await response.json();
        console.log(data);

        const jsonArray = data.data;
        console.log(data.data);

        // set matching topic
        $("#matching-topic").text(data.topic);

        // shuffle array of json Objects
        shuffle(jsonArray);

        // Get all possible answers from array of objects
        var ansArray = [];
        for (var obj of jsonArray) {
            ansArray.push(obj.answer);
        }

        console.log(ansArray);

        // set progress number to 0
        $("#complete-questions").text(count);
        $("#total-questions").text(jsonArray.length);

        displayQuestion(jsonArray[count], ansArray);

        // calculate width for progress bar
        var widthPercent = (1 / jsonArray.length) * 100;
        var redWidth = 0, greenWidth = 0;

        // onClick function for when an answer is selected
        $('.answer-option').click(function () {
            var answerText = $(this).find('.answer-text').text();

            // handle correct and incorrect answers
            if (jsonArray[count].answer == answerText) {
                // play correct audio 
                var audio = new Audio("../assets/correct.mp3");
                audio.play();

                // increase progress bar
                greenWidth += widthPercent;
                $("#progress-green").attr("style", `width: ${encodeURIComponent(greenWidth)}%`);

                // add overlay
                $("#overlay").css("display", "block");
                $("#overlay").css("background-color", "rgba(0, 255, 0, 0.5)");

                // increase correct count
                correctCount++;
            } else {
                // play incorrect audio 
                var audio = new Audio("../assets/incorrect.mp3");
                audio.play();

                // increase progress bar
                redWidth += widthPercent;
                $("#progress-red").attr("style", `width: ${encodeURIComponent(redWidth)}%`);

                // add overlay
                $("#overlay").css("display", "block");
                $("#overlay").css("background-color", "rgba(255, 0, 0, 0.5)");
            }

            playEndingAnimation();

            // increment count if there is another question
            // + 1 because we need to check if the next value will be in the array
            if (count + 1 < jsonArray.length) {
                console.log(jsonArray[count]);
                count++;
                // I added a delay before we change the question so the audio can finish before the new question is displayed and the animation starts
                setTimeout(() => {
                    displayQuestion(jsonArray[count], ansArray);
                    $("#complete-questions").text(count);
                }, 400);

                // after new question is displayed remove overlay
                setTimeout(() => {
                    $("#overlay").css("display", "none");
                }, 300);
            } else {
                // handle the end of the game
                setTimeout(() => {
                    // increment count
                    $("#complete-questions").text(count + 1);
                    // remove overlay
                    $("#overlay").css("display", "none");
                    // play animation to move answer options off screen
                    playFallAnimation();

                    var percentCorrect = correctCount / (count + 1) * 100;
                    endgameButtons(percentCorrect);
                    playConfetti(); // play confetti sounds
                    jsConfetti.addConfetti(); // display confetti visuals
                }, 400);
                // $("#overlay").css("background-color", "rgba(135, 206, 235, 0.5)");
            }
        });

    } catch (error) {
        console.log(error);
    }
}

//function to display question and answer options
function displayQuestion(questionObj, ansArray) {
    $("#question").text(questionObj.question);

    // create copy so we can dynamically remove options
    var ansArrayCopy = Array.from(ansArray);

    // make new array with answer options
    var ansOptionsArr = [];
    // first push correct answer
    ansOptionsArr.push(questionObj.answer);
    //now delete the correct option from the answer array
    ansArrayCopy = ansArrayCopy.filter(item => item !== questionObj.answer);
    console.log(ansArrayCopy);
    // ig now I will add 3 random elements to the array, idk. I could also use the copy array and populate the options with 3 of those values but idrk what Im doing so this is what we got. If it works we are just just gonna have to deal
    for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * ansArrayCopy.length);
        ansOptionsArr.push(ansArrayCopy[randomIndex]);
        ansArrayCopy.splice(randomIndex, 1);
    }
    // shuffle answer options array. Im making this up as I go along
    shuffle(ansOptionsArr);

    // now populate answer options in html
    $(".answer-text").each(function (index) {
        $(this).text(ansOptionsArr[index]);
    });

    // plays apple animation from animations.js. It is importnat to note that the animations.js file is called before this js file is called in the html pages
    // also I added a delay so the audio can finish before the animation starts
    setTimeout(() => {
        playAnswerAnimation();
    }, 75);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function endgameButtons(percentCorrect) {
    // randomly generate encouraging messages to display at the end screen
    var randomAffirmations = ["Good Job!", "Great job!", "Yay!!", "Hurray!", "Wow!!"];
    var encouragingAffirmations = ["Good try!", "Try again!"];

    if (percentCorrect > 50) {
        let randomIndex = Math.floor(Math.random() * randomAffirmations.length);
        $("#question").html(randomAffirmations[randomIndex] + " You got <span style = 'color: green'>" + percentCorrect + "%</span>");
    } else {
        let randomIndex = Math.floor(Math.random() * encouragingAffirmations.length);
        $("#question").html(encouragingAffirmations[randomIndex] + " You got <span style = 'color: red'>" + percentCorrect + "%</span>");
    }

    // Create html buttons
    let btn1 = $('<a>').text('Play Again!').addClass('btn btn-primary').attr("href", "/matching");
    let btn2 = $('<a>').text('Flashcards').addClass('btn btn-success').attr("href", "/flashcards");
    let btn3 = $('<a>').text('Home').addClass('btn btn-warning').attr("href", "/homepage");

    $('#endgame-button-container').append(btn1, btn2, btn3);
}

function playConfetti() {
    const url = '/audio/confetti.mp3'
    new Audio(url).play();
}