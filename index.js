let youtubePlaylist = require('youtube-playlist');
let fs = require('fs')
let ytdl = require('ytdl-core');

var url = 'your playlist youtube';

var foldeDownload = __dirname + '\\downloads\\';

youtubePlaylist(url, ['id', 'name', 'url']).then(res => {
    var data = res.data.playlist;

    for (var prop in data) {

        var filename = data[prop].name;
        filename = filename.replace(/[ÀÁÂÃÄÅ]/g, "A");
        filename = filename.replace(/[àáâãäå]/g, "a");
        filename = filename.replace(/[ÈÉÊË]/g, "E");
        filename = filename.replace(/[^a-z0-9]/gi, '');

        ytdl(data[prop].url)
            .pipe(fs.createWriteStream(foldeDownload + filename + '.mp4'));
    }
});