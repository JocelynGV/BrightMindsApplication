$(document).ready(function() {
    // Add function to whichever button has been clicked
    // $('.answer-option').click(function() {
    //     var answerText = $(this).find('.answer-text').text();
    //     alert(answerText);
    // });


    fetchData();
});

// fetch('/cards')
//     .then(response => response.json())
//     .then(users => console.log(users));

var count = 0;
async function fetchData() {
    try {
         // shuffle array of json Objects
        shuffle(jsonArray);

        // Get all possible answers from array of objects
        var ansArray = [];
        for (var obj of jsonArray) {
            ansArray.push(obj.answer);
        }

        console.log(ansArray);

        // set progress bar and progress number to 0
        // $("#progress-red").attr("style", `width: ${encodeURIComponent(topic)}%`);
        // $("#progress-green").attr("style", `width: ${encodeURIComponent(topic)}%`);


        $("#complete-questions").text(count + 1);
        $("#total-questions").text(jsonArray.length);

        displayQuestion(jsonArray[count], ansArray);

        var widthPercent = (1 / jsonArray.length) * 100;
        var redWidth = 0, greenWidth = 0;
        $('.answer-option').click(function() {
            var answerText = $(this).find('.answer-text').text();
            
            // handle correct and incorrect answers
            if (jsonArray[count].answer == answerText) {
                greenWidth += widthPercent;
                $("#progress-green").attr("style", `width: ${encodeURIComponent(greenWidth)}%`);
            } else {
                redWidth += widthPercent;
                $("#progress-red").attr("style", `width: ${encodeURIComponent(redWidth)}%`);
            }

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

                    endgameButtons();
                },400);
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
    $(".answer-text").each(function(index) {
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

  function endgameButtons() {
        let btn1 = $('<a>').text('Play Again!').addClass('btn btn-primary').attr("href", "/matching");
        let btn2 = $('<a>').text('Flashcards').addClass('btn btn-success').attr("href", "/flashcards");
        let btn3 = $('<a>').text('Home').addClass('btn btn-warning').attr("href", "/homepage");

        $('#endgame-button-container').append(btn1, btn2, btn3);
  }