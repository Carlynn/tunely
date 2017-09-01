// albumsSongsController.js
var db = require("../models");

function create(req, res) {
	console.log("in create function id is"+ req.params.id);
	console.log(req.body.name);
	console.log(req.body.trackN);
	console.log(" ");
	/*
	In your new method, create the 
	new song with the data from the request,
	 and add it to the proper album.

	Save your changes to the database,
	 and respond to the client with JSO
	*/
	var song = new db.Song({
		name: req.body.name,
		trackNumber: req.body.trackN
	});

	// find the album based on input id and insert the
	// filled out songs/track# to to that album
	song.save(function(err, newSong){
		if(err) {return console.log(err)}
			console.log("saved song: "+newSong);
		db.Album.findById(req.params.id, function(err, album){
			console.log("found album: "+album);
			album.songs.push(newSong);
			console.log("added new album: " + album);
			album.save(function(err, savedAlbum){
				res.redirect(`/api/albums/${req.params.id}`);
			});

		});
	})



};

module.exports = {
	create: create
}