/************
 * DATABASE *
 ************/

/* hard-coded data */

var db = require("../models");


// GET /api/albums
function index(req, res) {
  // send back all albums as JSON
  // $.ajax({
  //   method: 'GET',
  //   url: '/api/albums',
  //   success: displayAll,
  //   // error: handleError
  // });

  //
  db.Album.find({}, function(err, albums){

    res.json(albums);
  })
}

// POST /api/albums
function create(req, res) {
  // create an album based on request body and send it back as JSON

  var genresList = req.body.genres.split(",");
  // console.log(genresList);
  var album = new db.Album({
    name: req.body.name,
    artistName: req.body.artistName,
    releaseDate: req.body.releaseDate,
    genres: genresList,
  });

  album.save(function(err, newAlbum){
    if(err) {return console.log(err)}
    console.log("new form has added");
    // res.send(newAlbum);
    res.json(newAlbum);
  });
  // console.log(req.name);

  // console.log(req.body.name + "@@@@" + req.body.artistName);


}

// GET /api/albums/:albumId
function show(req, res) {
  // find one album by id and send it back as JSON
}

// DELETE /api/albums/:albumId
function destroy(req, res) {
  // find one album by id, delete it, and send it back as JSON
}

// PUT or PATCH /api/albums/:albumId
function update(req, res) {
  // find one album by id, update it based on request body,
  // and send it back as JSON
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
