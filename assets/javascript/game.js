$(document).ready(function () {
    // allows for the popover button in the top left to function. this is taken from bootstrap website
    $('[data-toggle="popover"]').popover({
        // title within the popover
        title: 'Make-up',
    });

    var makeupArr = ["Revlon", "Maybelline", "NARS", "Chanel", "Clarins", "Guerlain", "SHISEIDO", "Dior", "Sephora", "Givenchy", "MAC", "Lancome", "Covergirl"];


    function pullUpGif() {

        $("#makeup-img").empty();

        var makeup = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + makeup + "&api_key=RpbF7yK9jdJvEIcxqxFvfqB36r3852SI&limit10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < 10; i++) {
                var makeupDiv = $("<div>");

                var rating = response.data[i].rating;

                var pForGif = $("<p>").text("Rating: " + rating);

                // Displaying the rating
                makeupDiv.append(pForGif);

                var imgStillURL = response.data[i].images.fixed_height_still.url;
                var imgAnimateURL = response.data[i].images.fixed_height.url;

                // Creating an element to hold the image
                var image = $("<img>").attr("src", imgStillURL);
                image.attr("data-status", "still");
                image.attr("data-animate", imgAnimateURL);
                image.attr("data-still", imgStillURL);
                image.attr("id", "makeupGif");

                // Appending the image
                makeupDiv.append(image);

                // Putting the entire movie above the previous movies
                $("#makeup-img").prepend(makeupDiv);

                $("#makeupGif").on("click", function () {

                    var status = $(this).attr("data-status");
                    console.log(status);
            
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

    function renderMakeupButtons() {


        $("#makeup-img").empty();
        $("#makeup-btn").empty();


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

        // Adding movie from the textbox to our array
        makeupArr.push(makeupAdd);

        // Calling renderButtons which handles the processing of our movie array
        renderMakeupButtons();
    });



    $(document).on("click", ".makeup-btn", pullUpGif);

    renderMakeupButtons();



});