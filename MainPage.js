var input = document.getElementById( 'aFile' );
var infoArea = document.getElementById( 'filename' );

function yo(el) {
    return document.getElementById(el);
}

// function upload() {
//     var file = yo("aFile").files[0];
//     // alert(file.name+" | "+file.size+" | "+file.type);
//     var formdata = new FormData();
//     formdata.append("aFile", file);
//     var ajax = new XMLHttpRequest();
//     ajax.upload.addEventListener("progress", progressHandler, false);
//     ajax.addEventListener("load", completeHandler, false);
//     ajax.addEventListener("error", errorHandler, false);
//     ajax.addEventListener("abort", abortHandler, false);
//     ajax.open("POST", "file_upload_parser.php");
//     ajax.send(formdata);
// }
//
// function completeHandler(event) {
//     yo("status").innerHTML = event.target.responseText;
//     yo("progressBar").value = 0;
// }
//
// function errorHandler(event) {
//     yo("status").innerHTML = "Upload Failed";
// }
//
// function abortHandler(event) {
//     yo("status").innerHTML = "Upload Aborted";
// }

// function showFileName(event) {
//     var input = event.srcElement;
//     var fileName = input.files[0].name;
//     infoArea.textContent = 'File name: ' + fileName;
// }

function init(){
    document.getElementById('aFile').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(event){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

function handleFileLoad(event){
    console.log(event);
    document.getElementById('fileContent').textContent = event.target.result;
}

function convert() {
    var input = document.getElementById('aFile');

    var text = "";
    // var text = "Year,January,February,March,April,May,June,July,August,September,October,November,December\n";
    var filename = "rename_this_please.csv";

    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function (progressEvent) {

        var lines = this.result.split('\n');

        console.log(String(lines[4]).substr(0,3));

        if(String(lines[0]).substr(0,3) === "# S" && String(lines[4]).substr(0, 3) !== "# f"){
            text = "Year,January,February,March,April,May,June,July,August,September,October,November,December\n";
        }
        else if(String(lines[0]).substr(0,3) === "# C"){
            text = "2000 + date,mean,2.5%,17%,50%,83%,97.5%\n";
        }

        for (var line = 0; line < lines.length; line++) {
            var thisLine = "";
            if (String(lines[line]).substr(0, 1) !== "#") {
                var words = lines[line].split(/\s+/);
                for (var wordIndex = 0; wordIndex < words.length; wordIndex++) {
                    console.log(words[wordIndex]);
                    // if(wordIndex === 0){
                    //     text += words[wordIndex];
                    // }
                    if (wordIndex !== words.length - 1) {
                        thisLine += words[wordIndex] + ",";
                    } else {
                        thisLine += words[wordIndex] + "\n";
                    }
                }
            }
            if(thisLine.substr(0,1) === ","){
                thisLine = thisLine.substr(1, thisLine.length - 1);
            }
            text += thisLine;
        }
        download(filename, text);
    };
    reader.readAsText(file);
}

function download(filename, text){

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

};

// function convert(){
//
//     var input = document.getElementById( 'aFile' );
//
//     var file = input.files[0];
//     var reader = new FileReader();
//
//     reader.onload = function(progressEvent){
//
//         var lines = this.result.split('\n');
//         var element = document.createElement('a');
//         // let text = "Year,January,February,March,April,May,June,July,August,September,October,November,December"
//
//
//         for(var line = 0; line < lines.length; line++){
//             if(String(lines[line]).substr(0,1) !== "#"){
//                 console.log(lines[line]);
//                 // console.log(String(line));
//             }
//         }
//     };
//     reader.readAsText(file);
// };