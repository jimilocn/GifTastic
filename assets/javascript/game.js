$(document).ready(function () {
    // allows for the popover button in the top left to function. this is taken from bootstrap website
    $('[data-toggle="popover"]').popover({
        // title within the popover
        title: 'Make-up',
    });

    // array of different words that will be looked up on giphy to generate the pictures
    var makeupArr = ["Revlon", "Maybelline", "NARS", "Chanel", "Clarins", "Guerlain", "SHISEIDO", "Dior", "Givenchy", "MAC", "Lancome", "Covergirl"];

    // function to pull up the gifs from giphy
    function pullUpGif() {
        console.log((this));

        // clear the div box inside the HTML that holds the pictures
        $("#makeup-img").empty();
        // var that pulls forth the attribute "data-name" which is assigned to each button when they are dynamically generated
        var makeup = $(this).attr("data-name");
        // the api website used to pull up the gifs from Giphy
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + makeup + "&api_key=RpbF7yK9jdJvEIcxqxFvfqB36r3852SI&limit=10"

        // ajax function to pull up images from giphy
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // for loop that creates the 10 gif images
            for (var i = 0; i < 10; i++) {
                // dynamically creating a new div for each gif
                var makeupDiv = $("<div>");
                // pulling forth the rating of each gif from the API
                var rating = response.data[i].rating;
                // dynamically creating a new p tag to display the rating for each gif
                var pForGif = $("<p>").text("Rating: " + rating);
                // attaching teh p tag to the dynamically generated div from above
                makeupDiv.append(pForGif);
                // getting the URL of the still gif from the API
                var imgStillURL = response.data[i].images.fixed_height_still.url;
                // getting the animated gif from the API
                var imgAnimateURL = response.data[i].images.fixed_height.url;
                // creating a img that is still based on the information in the API
                var image = $("<img>").attr("src", imgStillURL);
                // setting this status as "still" to inform the code if it is animated yet or not
                image.attr("data-status", "still");
                // used to change the source of the image on click to make it animated
                image.attr("data-animate", imgAnimateURL);
                // used to stop the animate by changing the source on click
                image.attr("data-still", imgStillURL);
                // id tag for styling and onclick function
                image.attr("id", "makeupGif");
                // put all the images in the empty div from above
                makeupDiv.prepend(image);
                // place the newly generated div inside the html div
                $("#makeup-img").prepend(makeupDiv);

                // on click function for the animation of the gifs
                $("#makeupGif").on("click", function () {
                    // setting the status of each gif when on click
                    var status = $(this).attr("data-status");
                    // console.log(status);
                    // if the image is still, then change the src to animated and change the status to animate or else do the opposite
                    if (status === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-status", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-status", "still");
                    }
                });
            }
        });
    };


    // this is display the buttons at the top of the screen based on th array
    function renderMakeupButtons() {

        // clean out the gifs and previously set buttons
        $("#makeup-img").empty();
        $("#makeup-btn").empty();

// for loop generate a button for each item in the array, adding a class for styling, and adding a data-name for recall to search the giphy API
        for (var i = 0; i < makeupArr.length; i++) {
            var btn = $("<button>");
            btn.addClass("makeup-btn");
            btn.attr("data-name", makeupArr[i]);
            btn.text(makeupArr[i]);
            $("#makeup-btn").append(btn);

        }
    };



    $("#add-makeup").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var makeupAdd = $("#makeup-input").val().trim();

        // Adding item from the array
        makeupArr.push(makeupAdd);

        // Calling renderButtons which handles the processing of our makeup array
        renderMakeupButtons();
    });


    renderMakeupButtons();

    // on click for the makeup buttons, the ajax will be run to pull up the images from the giphy API
    $(document).on("click", ".makeup-btn", pullUpGif);





});