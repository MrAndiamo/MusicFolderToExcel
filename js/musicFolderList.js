function getMusicFolderOutput(csv = false) {

    var musicCSV = [];
    var filterFileTypes = ['jpg', 'jpeg', 'png', 'txt'];

    var table = "<table id='musicTable'><tr>";
    var table = table + "<td class='headerTitle'>Artist</td>";
    var table = table + "<td class='headerTitle'>Album</td>";
    var table = table + "<td class='headerTitle'>Song</td>";
    var table = table + "<td class='headerTitle'>Filename</td></tr>";


    let i = document.querySelector('input').addEventListener('change', (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            // Split folder into Artist/Album/Song
            var fullFolder = e.target.files[i].webkitRelativePath.split('/');
            var artist = fullFolder[1];
            var album = fullFolder[2];

            var song = fullFolder[3];
            var ext = song.substr(song.length - 3);
            if (filterFileTypes.indexOf(ext) === -1) {

                // keep song full filename
                var songFileName = song;
                // Remove extention from filename-string

                table = table + "<tr><td class='artist'>" + artist + "</td>";
                table = table + "<td class='album'>" + album + "</td>";

                // Remove everything between (*) from string (name-fix)
                song = song.substr(0, song.length - 4);
                song = song.replace(/ *\([^)]*\) */g, "");
                table = table + "<td class='song'>" + song + "</td>";
                table = table + "<td class='songfilename'>" + songFileName + "</td>";

            }
        }

        table = table + "</tr></table>";

        var downloadButton = document.querySelector('#fileinputs');
        downloadButton.classList.add('fileinputsHidden');


        var downloadButton = document.querySelector('#downloadButton');
        downloadButton.classList.remove('downloadButtonHidden');


        // Show table in overview div
        var musicFolderContainer = document.querySelector('#musicFolderContainer');
        musicFolderContainer.innerHTML = table;



    })



}


var downloadButton = document.getElementById('downloadButton');
if (downloadButton) {
    downloadButton.addEventListener('click', function(event) {

        ;
        buildExcel();
    }, false);
}



function buildExcel(musicFolderData) {

    var musicTable = document.querySelector('#musicTable').outerHTML;
    var hiddenElement = document.createElement('a');
    // var tableHTMLUrl = 'data:application/vnd.ms.excel';
    hiddenElement.href = 'data:application/vnd.ms.excel;charset:=utf-8,' + encodeURI(musicTable);
    hiddenElement.target = '_blank';

    //provide the name for the CSV file to be downloaded  
    hiddenElement.download = 'MusicList.xls';
    hiddenElement.click();


}


getMusicFolderOutput();