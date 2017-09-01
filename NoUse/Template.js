
  // Template
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