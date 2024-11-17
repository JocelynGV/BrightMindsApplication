var subject = "";

$(document).ready(function() {
    // Search functionality for filtering list items
    $('#searchInput').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $('#topic-list a').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

// filter topics by subject
    $(".subject-button").click(function() {
        subject = $(this).val().trim();
        console.log('Selected Subject: ', subject);  // Debugging line to confirm value
        fetchData();
    });
});

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
    // Clear the existing topic list
    $('#topic-list').empty();
    
    // Loop through the fetched topics and append them to the list
    for (const obj of jsonArray) {
        const name = obj.name;  // Assuming each topic has a 'name' property
        console.log('Topic Name: ', name);

        // Create a list item with a link
        const urlObj = $('<a>').text(name).attr("href", `/selectGame?topic=${encodeURIComponent(name)}`).addClass('list-group-item');
        $('#topic-list').append(urlObj);
    }

    // Show all items in the list (if hidden)
    $(".list-group-item").css("display", "block");

    // Update the header to display the current subject
    $("#topic-header").text(subject);
}   

// add event listener to navbar to display the create button
document.querySelector('my-navbar').addEventListener('toggle-switch-changed', (event) => {
    const button = document.querySelector('#create-button');
    if (event.detail.checked) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
  });