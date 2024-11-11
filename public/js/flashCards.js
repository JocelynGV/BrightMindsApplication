$(document).ready(function() {
    fetchData();
});

// Declare and Initalize variables
let currentIndex = 0;
let jsonArray = [];

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

        // Display the first flashcard initially
        updateFlashcard(currentIndex);

        // Attach click event handlers for the Previous and Next buttons
        $('#previousButton').click(showPrevious);
        $('#nextButton').click(showNext);
    } catch (error) {
        console.log(error);
    }
}

 // Function to update the flashcard content based on the current index
 function updateFlashcard(index) {
    // Get the question and answer from the jsonArray
    const question = jsonArray[index]?.question || "No question available";
    const answer = jsonArray[index]?.answer || "No answer available";

    // Update the question and answer elements
    $("#question").text(question);
    $("#answer").text(answer);
}

// Function to handle the Previous button click
function showPrevious() {
    // Decrease the current index if its greater than 0 
    if (currentIndex > 0) {
        currentIndex--;
        updateFlashcard(currentIndex);
    } else {
        // if the user tries to go back from the first flashcard
        console.log("Already at the first flashcard.");
    }
}

// Function to handle the Next button click
function showNext() {
    // Increase the current index if its less than the last index of jsonArray
    if (currentIndex < jsonArray.length - 1) {
        currentIndex++;
        updateFlashcard(currentIndex);
    } else {
        // if the user tries to go beyond the last flashcard
        console.log("Already at the last flashcard.");
    }
}