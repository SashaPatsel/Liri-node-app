require("dotenv").config();
var keys = require("./keys.js");

//Twitter
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

//Spotify
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);


//Omdb
var request = require('request');

//do-what it says
var fs = require("fs");

var command = process.argv[2];

if (command === "my-tweets") {

    client.get('statuses/user_timeline', function(error, tweets, response) {
        if (error) throw error;
        console.log("\nMy latest tweets:")
        // console.log(tweets[0])
        for (var i = 1; i < 22; i++) {
            if (tweets[i]){
            console.log("\nTweet " + i + ", created at" + tweets[i].created_at + ": " + tweets[i].text);
            }
        }

    });
}

function songInfo(song) {
if (command === "spotify-this-song") {
    var song = "";
    var nodeArgs = process.argv;
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {

            song = song + "+" + nodeArgs[i];

        } else {

            song += nodeArgs[i];

        }
    }

    spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }


        //Artist(s)
        console.log("Here are some possible artists: " + data.tracks.items[0].artists[0].name);
        // The song's name
        console.log("Song Name: " + data.tracks.items[0].name);
        // A preview link of the song from Spotify
        console.log("Here's a link to the song: " + data.tracks.items[0].album.href);
        // The album that the song is from
        console.log("Your song is from the " + data.tracks.items[0].album.name + " album");
    });

}
}
songInfo()

if (command === "movie-this") {
    var movie = "";
    var nodeArgs = process.argv;
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {

            movie = movie + "+" + nodeArgs[i];

        } else {

            movie += nodeArgs[i];

        }
    } 
    request('https://www.omdbapi.com/?apikey=trilogy&t=' + movie, function(error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // * Title of the movie.
        console.log("Title: " + JSON.parse(body).Title)
        // * Year the movie came out.
        console.log("Year Released: " + JSON.parse(body).Year)
        // * IMDB Rating of the movie.
        console.log("Rating: " + JSON.parse(body).Rated)
        // * Rotten Tomatoes Rating of the movie.
        console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value)
        // * Country where the movie was produced.
        console.log("Country of Origin: " + JSON.parse(body).Country)
        // * Language of the movie.
        console.log("Language: " + JSON.parse(body).Language)
        // * Plot of the movie.
        console.log("Plot: " + JSON.parse(body).Plot)
        // * Actors in the movie.
        console.log("Actors: " + JSON.parse(body).Actors)
    });
}

if (command === "do-what-it-says") {

fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

  var dataArr = data.split(",");


    spotify.search({ type: 'track', query: dataArr[1], limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }


        //Artist(s)
        console.log("Here are some possible artists: " + data.tracks.items[0].artists[0].name);
        // The song's name
        console.log("Song Name: " + data.tracks.items[0].name);
        // A preview link of the song from Spotify
        console.log("Here's a link to the song: " + data.tracks.items[0].album.href);
        // The album that the song is from
        console.log("Your song is from the " + data.tracks.items[0].album.name + " album");
    });

});
}

//appendFileSync