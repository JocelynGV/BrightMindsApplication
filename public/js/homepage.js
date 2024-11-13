var subject = "";

// filter topics by subject
$(".subject-button").click(function() {
    // console.log("hello");
    subject = $(this).val().trim();
    fetchData();
})

async function fetchData() {
    try {
        console.log(subject);
        const response = await fetch(`/topics/${encodeURIComponent(subject)}`);
        const data = await response.json();
        const jsonArray = data.data;
        console.log(jsonArray);

        populateTopicNames(jsonArray);

    } catch (err) {
        console.log(err);
    }
};

function populateTopicNames(jsonArray) {
    $('#topic-list').empty();
    
    for (obj of jsonArray) {
        var name = obj.name;
        console.log(name);
        // let listObj = $('<a>').text(name).addClass('list-group-item').attr("href", `/selectGame/${encodeURIComponent(name)}`);
        let urlObj = $('<a>').text(name).attr("href", `/selectGame?topic=${encodeURIComponent(name)}`).addClass('list-group-item');
        let listObj = $('<li>').addClass('list-group-item');
        
        // listObj.append(urlObj);
        // urlObj.append(listObj);
        
        $('#topic-list').append(urlObj);
    }

    // display all items in list
    $(".list-group-item").css("display", "block");

    // display subject name
    $("#topic-header").text("\n" + subject + "\n");
}