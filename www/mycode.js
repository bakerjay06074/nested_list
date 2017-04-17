var fileEntry;
var flt_a = 1.3;
var flt_b = 5.7;
var csv_line = flt_a.toString() + "," + flt_b.toString() + "\n";

function init() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  alert('onDeviceReady');
  openFileSystem();
}

function openFileSystem() {
  window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
    alert('file system open: ' + dirEntry.name);
    var isAppend = true;
    createFile(dirEntry, "fileToAppend.txt", isAppend);
  }, fail);
}

function createFile(dirEntry, fileName, isAppend) {
    // Creates a new file or returns the file if it already exists. 
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
 
      writeFile(fileEntry, csv_line, isAppend);
      alert("file entry is created");
 
    }, fail);
 
}

function writeFile(fileEntry, dataObj, isAppend) {
    // Create a FileWriter object for our FileEntry (log.txt). 
    fileEntry.createWriter(function (fileWriter) {
 
        fileWriter.onwriteend = function() {
            alert("Successful file read...");
            readFile(fileEntry);
        };
 
        fileWriter.onerror = function (e) {
            alert("Failed file read: " + e.toString());
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
      
        if (!dataObj) {
            dataObj = new Blob([flt_a, flt_b], { type: 'text/plain' });
        }
      
        fileWriter.write(dataObj);
    });
}

function readFile(fileEntry) {
 
    fileEntry.file(function (file) {
        var reader = new FileReader();
 
        reader.onloadend = function() {
            alert("Successful file read: " + this.result);
            //displayFileData(fileEntry.fullPath + ": " + this.result);
			
			//this code is okay--assigns a string containing the file text to file_text
			var file_text = this.result;
			
			index_of_search_result = file_text.search("7");
			alert("index of 7 is " + index_of_search_result);
			
        };
 
        reader.readAsText(file);
 
    }, fail);
}
function fail(evt) {
    alert(evt.target.error.code);
}

