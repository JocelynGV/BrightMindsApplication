$(document).ready( function () {
    $('#cardsetTable').DataTable();
    fetchData();
} );

async function fetchData() {
    try {
        const response = await fetch('/cards');
        const data = await response.json();
        const json = data.data;
        console.log(json);

        // add rows
        const tbody = $("#cardsetTable tbody");
        for (row of json) {
            // Create a new row
            const newRow = $('<tr></tr>');
            
            // Create two new columns (table data)
            const newColumn1 = $('<td></td>').text(row.question);
            const newColumn2 = $('<td></td>').text(row.answer);
            
            // Append the columns to the new row
            newRow.append(newColumn1);
            newRow.append(newColumn2);
            
            // Append the new row to the table body
            $('#cardsetTable tbody').append(newRow);
        }

    
    } catch (error) {
        console.log(error);
    }
}