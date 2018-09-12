// $(document).ready(... This is jQuery function that runs when the page is loaded.
// Do you want to load when the page is ready or when some button is clicked?
// Are you waiting for an input from the user???

$("form").submit(function (event) { // grab the form 
    event.preventDefault(); // prevent page reload 
    var input = $("input").val(); // grab the value from search. set the variable to input in order to reference it later 
    $.ajax({
        url: `http://itunes.apple.com/search?term=${input}`, // tick mark is template string 
        dataType: 'JSONP'
    })
        .done(function (data) {
            var songs = []
            console.log(data);
            // add code for when response from apple comes back.
            // .length = how many items are in the arrays
            for (var i = 0; i < data.results.length; i++) {
                // verifying we only want songs
                // Add a div in order to add paddings for the cards 
                // adding amplitude play to the button 
                if (data.results[i].trackName) {
                    $('#songs').append(` 
                    <div class="col-4 padded" > 
                        <div class="card" >
                            <img class="card-img-top" src="${data.results[i].artworkUrl100}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${data.results[i].trackName}</h5>
                                <p class="card-text">${data.results[i].collectionName}</p>
                                <a href="#" class="amplitude-play-pause amplitude-paused btn btn-primary" amplitude-song-index="${i}">Play</a>
                            </div>
                        </div>
                    </div>`);
                    songs.push({
                        "name": data.results[i].trackName,
                        "artist": data.results[i].artistName,
                        "album": data.results[i].collectionName,
                        "url": data.results[i].previewUrl,
                        "cover_art_url": data.results[i].artworkUrl100
                    })
                }
            }
            Amplitude.init({
                "songs": songs
            })
            $(".amplitude-play-pause").click(function () {
                alert("blablabla");
            })
        })

        // when there's connection issue (fail to load)
        .fail(function (data) {
            console.log(data);
            $('#songs').append(data.status);
        })
});// End of on ready part





