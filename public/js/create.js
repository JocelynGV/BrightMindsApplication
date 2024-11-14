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

    function check() {
        var result = confirm('Are you sure you want to leave this page?');

        if (result == false) {
            event.preventDefault();
        }
    }

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

    fetchData();

    // $("#submit").click(function() {

    //             var formTopic = $("#topic").val();
    //             if (topicNames.includes(formTopic)) {
    //                 console.log("error");
    //                 alert("you already used this topic name");
    //             }
    // });

    function checkTopic() {
        var formTopic = $("#topic").val();
        if (topicNames.includes(formTopic)) {
            console.log("error");
            // alert("you already used this topic name");
            var result = confirm('You already used this topic name');
            if (result == false) {
                event.preventDefault();
            }
        }


    }