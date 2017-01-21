function init() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    alert('onDeviceReady')

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
    alert('gotFS-->' + fileSystem.name + '<--');
    fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    alert('gotFileEntry')
    fileEntry.file(gotFile, fail);
}

function gotFile(file) {
    alert('gotFile')
    readDataUrl(file);
    readAsText(file);
}

function readDataUrl(file) {
    alert('readDataUrl')
    var reader = new FileReader();
    reader.onloadend = function (evt) {
        console.log("Read as data URL");
        console.log(evt.target.result);
    };
    reader.readAsDataURL(file);
}

function readAsText(file) {
    alert('readAsText')
    var reader = new FileReader();
    reader.onloadend = function (evt) {
        console.log("Read as text");
        console.log(evt.target.result);
    };
    reader.readAsText(file);
}

function fail(evt) {
    alert(evt.target.error.code);
}

