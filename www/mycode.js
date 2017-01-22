function init() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    alert('onDeviceReady')

  window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
    alert('file system open: ' + dirEntry.name);
    var isAppend = true;
    createFile(dirEntry, "fileToAppend.txt", isAppend);
  }, fail);

}

function createFile(dirEntry, fileName, isAppend) {
    // Creates a new file or returns the file if it already exists. 
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
 
        writeFile(fileEntry, null, isAppend);
 
    }, fail);
 
}

function writeFile(fileEntry, dataObj, isAppend) {
    // Create a FileWriter object for our FileEntry (log.txt). 
    fileEntry.createWriter(function (fileWriter) {
 
        fileWriter.onwriteend = function() {
            alert.log("Successful file read...");
            readFile(fileEntry);
        };
 
        fileWriter.onerror = function (e) {
            alert.log("Failed file read: " + e.toString());
        };
 
        // If we are appending data to file, go to the end of the file. 
        if (isAppend) {
            try {
                fileWriter.seek(fileWriter.length);
            }
            catch (e) {
                alert("file doesn't exist!");
            }
        }
        fileWriter.write(dataObj);
    });
}

function fail(evt) {
    alert(evt.target.error.code);
}

