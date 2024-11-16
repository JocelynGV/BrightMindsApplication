$(document).ready(function () {
    fetchData();

    
     // if the user clicks on the play again button, restart flashcard game
     playAgainButtonisClicked();
});

// Declare and Initalize variables
let currentIndex = 0;
let jsonArray = [];
let topic = "";

// Declare and Initialize variables for confetti animinations
const canvas = document.querySelector('#confetti');
const jsConfetti = new JSConfetti()

async function fetchData() {
    try {

        // Get request to the /card endpoint from the server
        const response = await fetch('/cards');
        console.log(response);

        // Parse Json response
        const data = await response.json();
        console.log(data);

        // Assign the fetched data to jsonArray
        jsonArray = data.data;

        // Get and set topic from jsonArray
        topic = data.topic;
        $('#topic').text(topic);

        shuffle(jsonArray);

        // Display the first flashcard initially
        updateFlashcard(currentIndex);

        // Update Progress
        updateProgressBar()

        // Attach click event handlers for the Previous and Next buttons
        $('#previousButton').click(showPrevious);
        $('#nextButton').click(showNext);
    } catch (error) {
        console.log(error);
    }
}

function updateFlashcard(index) {
    // Get the question and answer from the jsonArray
    const question = jsonArray[index]?.question || "No question available";
    const answer = jsonArray[index]?.answer || "No answer available";

    // Update the question and answer elements
    $("#question").text(question);
    $("#answer").text(answer);
}

function showPrevious() {
    // Decrease the current index if its greater than 0 
    if (currentIndex > 0) {
        currentIndex--;
        updateFlashcard(currentIndex);
        updateProgressBar()
    } else {
        // if the user tries to go back from the first flashcard
        console.log("Already at the first flashcard.");
    }
}

function showNext() {
    // Increase the current index if its less than the last index of jsonArray
    if (currentIndex < jsonArray.length - 1) {
        currentIndex++;
        updateFlashcard(currentIndex);
        updateProgressBar();
    } else {
        // if the user tries to go beyond the last flashcard, display congratulation pop
        console.log("Already at the last flashcard.");
        $('#congratulationsModal').modal('show');
        playConfetti();
        jsConfetti.addConfetti();
    }
}

function updateProgressBar() {
    const totalCards = jsonArray.length;
    const progress = ((currentIndex + 1) / totalCards) * 100;

    // Update the progress bar width and text
    $("#dynamic").css("width", progress + "%").attr("aria-valuenow", progress).text(Math.round(progress) + "% Complete");
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function playAudio(url) {
    new Audio(url).play();
}

function playConfetti() {
    const url = '/audio/confetti.mp3'
    new Audio(url).play();
}

function playAgainButtonisClicked() {
    // if play Again button is clicked Restart the flashcards
    $('#playAgainButton').click(function () {
        currentIndex = 0;
        updateFlashcard(currentIndex);
        shuffle(jsonArray);
        updateProgressBar();
        $('#congratulationsModal').modal('hide');
    });
}
