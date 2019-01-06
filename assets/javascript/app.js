$(document).ready(function() {
    // EMPTY ARRAY - WILL HOLD SHOW INFORMATION //
    var topics = [];
    
    // FUNCTION FOR API CALL TO GIPHY //
    function tvShow() {
    
        // JQUERY CALL TO SEARCH FOR DATA //
        var action = $(this).data("search");
        // console.log(action);
    
        // API LINK AND KEY //
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=cCS8uCoa6G6CH8luCcIgyAMBPeDBkSMy&limit=10";
    
        // console.log(queryURL);
    
        // AJAX CALL //
        $.ajax({
              url: queryURL,
              method: "GET"
            })
            // FUNCTION TO CALL INFO //
            .done(function(response) {
                var giphy = response.data;
                // console.log(giphy);
                for (var i = 0; i < giphy.length; i++) {
                
                // DIV WHERE GIFS ARE PLACED //
                var showDiv = $("<div class='col-md-4'>");
                
                // VARIABLES FOR RATING - ANIMATED - STATIC //
                var rating = giphy[i].rating;
                var animatedState = giphy[i].images.fixed_height.url;
                var staticState = giphy[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                showImage.attr("src", staticState);
                showImage.addClass("tvShowGif");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticState);
                showImage.attr("data-animate", animatedState);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#gifArea").prepend(showDiv);
    
            }
        });
    }
        // CLICK EVENT PULLS SEARCH INFORMATION AND PUSHES INFO TO TOPICS ARRAY AND DISPLAYS BUTTON
        $("#addShow").on("click", function(event) {
            event.preventDefault();
            var newShow = $("#showInput").val().trim();
            topics.push(newShow);
            console.log(topics);
            $("#showInput").val('');
            displayButtons();
          });
    
        //   
      //Function iterates through topics array to display button with array values in "myButtons" section of HTML
        function displayButtons() {
        $("#newButton").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "show");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#newButton").append(a);
        }
      }
    
    
      displayButtons();
    
    // CLICK EVENT - RETURN TV SHOW FUNCTION //
    $(document).on("click", "#show", tvShow);
    
    // CLICK EVENT FUNCTION WILL DISPLAY PAUSED GIF //
    $(document).on("click", ".tvShowGif", pausePlayGifs);
    
    // FUNCTION TO PLAY AND PAUSE GIF //
    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } 
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }

    // SLIDEDOWN FUNCTION - JUMBROTRON - SEARCH FORM
    $(function() {
        $("h6").hide();
        $("h6").slideDown(2000);   
        $("#showSearch").hide();
        $("#showSearch").slideDown(2000);
        $("#showInput").css("background-color", "#B5F1F1");
    });
});
