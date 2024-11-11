$(document).ready(function() {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch('/cards');
        console.log(response);

        const data = await response.json();
        console.log(data);

        const jsonArray = data.data;
        console.log(data.data);

        // when card flips to back, display answer
    $('.card-flip').click(function() {
        var answerText = $(this).find('.card-answer').text();
    });

        // jsonArray[0].question;
        console.log(jsonArray[0]);
        console.log(jsonArray[0].question);

        $("#question").text(jsonArray[0].question);
        $("#answer").text(jsonArray[0].answer);
    } catch (error) {
        console.log(error);
    }
}