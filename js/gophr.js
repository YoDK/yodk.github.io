document.addEventListener("DOMContentLoaded", function () {
  var chunks;
  var humptyDumpty = [];
  var fileLength;
  
  // The connection url is provided to you by viewing the application from the
  // GoInstant dashboard. This url tells GoInstant where your application and
  // account are located in order to connect.
  var url = 'https://goinstant.net/YoDK/GoPhr';

  goinstant.connect(url, function (err, connection, lobby) {

    if (err) {
      // Could not connect to GoInstant
      throw err;
    }

    // Create the room instance in the window
    window.lobby = lobby;

    var options = {
      local: true, // listen to local events
    };

    // Get last uploaded image
    getLastUpload();

    // Get latest uploaded image
    getLatestUpload();

    function getLastUpload() {
      imgWidth = lobby.key('imgWidth');
      imgWidth.get(function(err, value) {
        elementWidth = value;
      });

      fileSize = lobby.key('fileSize');
      fileSize.get(function(err, value) {
        fileLength = value;
      });

      b64Splits = lobby.key('b64Splits');
      b64Splits.get(function(err, value) {
        chunks = value;

        getB64Keys();

      });
    }

    function getLatestUpload() {
      imgWidth = lobby.key('imgWidth');
      imgWidth.on('set', options, function(err, value) {
        elementWidth = value.value;
      });

      fileSize = lobby.key('fileSize');
      fileSize.on('set', options, function(err, value) {
        fileLength = value.value;
      });

      b64Splits = lobby.key('b64Splits');
      b64Splits.on('set', options, function(err, value) {
        chunks = value.value;
      });

      channel = lobby.channel('/a/channel');
      channel.on('message', options, function(msg) {
        // received message to start key#get
        getB64Keys();

      });
    }

    // recompile the DataUrl
    function getB64Keys() {
      for (var i = 0; i < chunks; i++) {
        myNewB64Key = lobby.key('myNewB64Key' + i);
      
        myNewB64Key.get(function(err, value) {
          humptyDumpty += value;

          if (humptyDumpty.length === fileLength) {
            createNewImage();
          }
        });
      }
    }

    // render the DataUrl
    function createNewImage() {
      var element = 'img';
      date = Date.now();

      var renderDiv = document.createElement('div');
      renderDiv.id = 'renderDiv' + date;
      renderDiv.className = 'dtrim';
      document.getElementById('uploadImage').appendChild(renderDiv);

      // add some CSS
      var renderElement = document.createElement(element);
      renderElement.id = element + date;
      renderElement.src = humptyDumpty;
      renderElement.className = 'itrim';
      document.getElementById('renderDiv' + date).appendChild(renderElement);

      // reset humptyDumpty when complete
      humptyDumpty = [];
    }
  });
});
      