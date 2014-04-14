yodk.github.io
==============
This demo shows a basic implementation of uploading large data files via GoInstant.

Via the HTML5 Filereader API the base64 string is split into 32kb pieces (GoInstant's key size limit) and set individually. On key#get the pieces are reassembled on the client.

There's some extra resizing functions added, but mainly for style.
