$(document).ready(function() {
    $('.answer-option').click(function() {
        var answerText = $(this).find('.answer-text').text();
        alert(answerText);
    });


    fetchData();
});

// fetch('/cards')
//     .then(response => response.json())
//     .then(users => console.log(users));


async function fetchData() {
    try {
        const response = await fetch('/cards');
        console.log(response);

        const data = await response.json();
        console.log(data);

        const jsonArray = data.data;
        console.log(data.data);

        for (const key in jsonArray) {

        }

        // jsonArray[0].question;
        console.log(jsonArray[0]);
        console.log(jsonArray[0].question);

        $("#question").text(jsonArray[0].question);
        
    } catch (error) {
        console.log(error);
    }
}