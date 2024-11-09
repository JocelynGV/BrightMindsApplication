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
    } catch (error) {
        console.log(error);
    }
}