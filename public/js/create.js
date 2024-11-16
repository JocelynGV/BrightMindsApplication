$(document).ready(function () {
    fetchData();
});

// Function to add a new row to the table
function addRow() {
    const table = document.getElementById('qa-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td><textarea name="questions[]" rows="2" cols="30" required placeholder="Type your question here"></textarea></td>
        <td><textarea name="answers[]" rows="2" cols="30" required placeholder="Type the answer here"></textarea></td>
        <td><button type="button" class="remove-btn" onclick="removeRow(this)">❌ Remove</button></td>
    `;
}

// Function to remove a row from the table
function removeRow(button) {
    const table = document.getElementById('qa-table').getElementsByTagName('tbody')[0];
    const rowCount = table.rows.length;

    // Check if there is only one row left
    if (rowCount === 1) {
        $('#warningModal').modal('show');
        return;
    }

    // Remove the selected row
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Function to preview flashcards (you could replace this with real preview functionality)
function previewFlashcards() {
    alert("Previewing flashcards...");
}

function check() {
    var result = confirm('Are you sure you want to leave this page?');

    if (result == false) {
        event.preventDefault();
    }
}

// get list of topic names from database so we can use it to prevent the user from creating a card set with a preexisting topic name
var topicNames = [];
async function fetchData() {
    try {
        const response = await fetch('/topics');
        const data = await response.json();
        const json = data.data;
        console.log(json);

        for (obj of json) {
            console.log(obj);
            topicNames.push(obj.name);
        }

        console.log(topicNames);

    } catch (error) {
        console.log(error);
    }
}

async function checkTopic() {
    var formTopic = $("#topic").val();
    // where we check for unique topic names
    if (topicNames.includes(formTopic)) {
        console.log("error");
        // alert("you already used this topic name");
        var result = confirm('You already used this topic name');
        // if (result == false) {
            event.preventDefault();
            // $("#topic").val("");
        // }
    } else {
        // save options to modal that allow the user to not click out of the modal
        $('#saveModal').modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        })
        // then show modal
        $('#saveModal').modal('show');
    }
}

// function disableSaveButton() {
//     var saveButton = document.getElementById("submit");
//     saveButton.disabled;
// }

// document.getElementById("createForm").addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent default form submission

//     // Create a JSON object from form data
//     const formData = new FormData(this); // Collects all form input data
//     console.log(formData);
//     const formJSON = Object.fromEntries(formData.entries()); // Converts FormData to JSON-friendly format
//     console.log(formJSON);

//     try {
//         const response = await fetch("/create", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formJSON) // Send JSON string
//         });

//         const result = await response.json(); // Parse JSON response

//         if (response.ok && result.success) {
//             $('#saveModal').modal('show');
//         } else {
//             $('#errorModal').modal('show');
//         }
//     } catch (error) {
//         // Handle network errors or other unexpected issues
//         console.error("Error:", error);

//     }
// });