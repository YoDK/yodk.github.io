yodk.github.io
==============
This demo shows a basic implementation of uploading large data files via GoInstant.

Via the HTML5 Filereader API base64 strings are split into 32kb pieces (GoInstant's key size limit) and uploaded (key#set) individually. Pieces are then reassembled on the client during key#get.

There's some extra resizing functions added, but mainly for style.

See the demo here: http://yodk.github.io/
