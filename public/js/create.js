$(document).ready(function () {
    fetchData();
});

// Function to add a new row to the table
function addRow() {
    const table = document.getElementById('qa-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td><textarea name="questions[]" rows="2" cols="30" required></textarea></td>
        <td><textarea name="answers[]" rows="2" cols="30" required></textarea></td>
        <td><button type="button" class="remove-btn" onclick="removeRow(this)">Remove</button></td>
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

// function check() {
//     var result = confirm('Are you sure you want to leave this page?');

//     if (result == false) {
//         event.preventDefault();
//     }
// }

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

// $("#submit").click(function() {

//             var formTopic = $("#topic").val();
//             if (topicNames.includes(formTopic)) {
//                 console.log("error");
//                 alert("you already used this topic name");
//             }
// });

async function checkTopic() {
    var formTopic = $("#topic").val();
    if (topicNames.includes(formTopic)) {
        console.log("error");
        // alert("you already used this topic name");
        var result = confirm('You already used this topic name');
        // if (result == false) {
            event.preventDefault();
            // $("#topic").val("");
        // }
    } else {
        $('#saveModal').modal('show');
        // window.onclick = function() {
        //     $("#submit").prop("disabled", true);
        //     window.location.reload()
        // }
    }
}

function reload() {
    // Your reload function logic here
    window.location.reload(); // Example: Reloads the current page
}

// Attach the reload function to the modal's hidden event
$('#saveModal').on('hidden.bs.modal', reload);

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