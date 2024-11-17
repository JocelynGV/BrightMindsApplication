$(document).ready(function () {
    const table = $('#cardsetTable').DataTable({
        // searching: false,  
        paging: true,
        info: true,
        lengthChange: false
    });

    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch('/cards');
        const data = await response.json();
        const json = data.data;
        console.log(json);

        const table = $('#cardsetTable').DataTable();

        // Clear existing rows before adding new ones
        table.clear();

        // Add new rows
        json.forEach(row => {
            table.row.add([row.question, row.answer]);
        });

        // Redraw the table
        table.draw();

    } catch (error) {
        console.log(error);
    }
}