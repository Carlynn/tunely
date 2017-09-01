/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */




$(document).ready(function() {
  console.log('app.js loaded!');

  // make a get request for all albums
  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: handleSuccess,
    error: handleError
  });


  $('#album_form').on("submit", function(e){
    e.preventDefault();
    // console.log("HELLO ");
    // var user_input = $('input[name=album_input]');
    var input = $(this).serialize();

    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: input
    })
    .then(function(newAlbum){
      console.log("data received");
      console.log(newAlbum);
      $('input').val("");
      renderAlbum(newAlbum);
    })
    .catch(function(err){
      console.log(err);
    });
  });

  $('#albums').on('click', '.add-song', function(e) {
      console.log('add-song clicked!');
      var id= $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
      console.log('id',id);
      // setting modal's data-album-id to be the album id
      $('#songModal').data('album-id', id);
      $(`#songModal`).modal();

  });

  $('#modal_save').on('click', function(e) {
      console.log('Modal save is clicked!');
      handleNewSongSubmit();
  });

});

function handleNewSongSubmit(){
  // retreat all data and store in var and clear out the
  // input fields
  var albumID = $('#songModal').data('album-id');
  var songName = $('#songName').val();
  var trackNum = $('#trackNumber').val();
  $('#songName').val("");
  $('#trackNumber').val("");
  $(`#songModal`).modal('hide');
  console.log("song name is " + songName );
  console.log("track number is " + trackNum );

  // Prepare ajax call using input from form
  $.ajax({
    method: 'POST',
    url: `/api/albums/${albumID}/songs`,
    data: {
      name: songName,
      trackN : trackNum
    } 
  })
  .then(function(theAddedAlbum){
    console.log("Retreated data from song submit is: "+ theAddedAlbum);
    // hide the original album and prepend the newly updated album by id
    $(`[data-album-id=${albumID}]`).hide();
    renderAlbum(theAddedAlbum);
    // renderAlbum(theAddedAlbum);
  })
  .catch(function(err){
    console.log(err);
  });

};

function handleSuccess (albums) {
    albums.forEach(function(album) {
      renderAlbum(album);
    });
};

function handleError(err){
  console.log('There has been an error: ', err);
}





// this function takes a single album and renders it to the page
function renderAlbum(album) {
  // console.log('rendering album:', album);


  var songs = album.songs;
  var display_songs = `<span>`;

  
  for(var i = 1; i < songs.length+1; i++){
    display_songs = display_songs + ` - (${i}) ` + songs[i-1].name ;
  }
  display_songs = display_songs + ` - </span>`;


  var newHTML = (`

  <div class="row album" data-album-id="${album._id}">

    <div class="col-md-10 col-md-offset-1">
      <div class="panel panel-default">
        <div class="panel-body">


        <!-- begin album internal row -->
          <div class='row'>
            <div class="col-md-3 col-xs-12 thumbnail album-art">
              <img src="/images/800x800.png" alt="album image">
            </div>

            <div class="col-md-9 col-xs-12">
              <ul class="list-group">
                <li class="list-group-item">
                  <h4 class='inline-header'>Album Name:</h4>
                  <span class='album-name'>${album.name}</span>
                </li>

                <li class="list-group-item">
                  <h4 class='inline-header'>Artist Name:</h4>
                  <span class='artist-name'>${album.artistName}</span>
                </li>

                <li class="list-group-item">
                  <h4 class='inline-header'>Released date:</h4>
                  <span class='album-releaseDate'>${album.releaseDate}</span>
                </li>

                <li class="list-group-item">
                  <h4 class='inline-header'>Genres:</h4>
                  <span class='album-releaseDate'>${album.genres}</span>
                </li>

                <li class="list-group-item">
                  <h4 class='inline-header'>Songs:</h4>
                  ${display_songs}
                </li>
              </ul>
            </div>
              

          </div>
          <!-- end of album internal row -->

          <div class='panel-footer'>
            <button class='btn btn-primary add-song'>Add Song</button>
          </div>

        </div>
      </div>
    </div>
  </div>`

  );
  $("#albums").prepend(newHTML);

};
