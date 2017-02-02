var isStopButtonPushed = false;
var watchID;
var timerID;


function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", onDeviceReady, false);
    //setInterval(function(){ alert("Hello, Jay"); }, 3000);
}


function onDeviceReady() {
    window.alert("In onDeviceReady");
    document.getElementById("tbLongitude").value = 100
} 


function msg() {
    //window.alert("button pushed");
   
    /*
    watchID = navigator.geolocation.watchPosition(geolocationSuccess,
                                                 geolocationError,
                                                  {mximumAge: 3600000,
                                                   timeout: 3000,
                                                   enableHighAccruacy:true}); 
    */
     timerID = setInterval(function(){jayGetPosition()}, 30000);
}


function jayGetPosition() {
    
    navigator.geolocation.getCurrentPosition(geolocationSuccess,
                                                 geolocationError,
                                                  {mximumAge: 3600000,
                                                   timeout: 25000,
                                                   enableHighAccruacy:true});  
}


// onSuccess Callback 
// This method accepts a Position object, which contains the 
// current GPS coordinates 
// 
var geolocationSuccess = function(position) {
    /*
    window.alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    */
     document.getElementById("tbLongitude").value = position.coords.longitude;
     document.getElementById("tbLatitude").value = position.coords.latitude;
    window.alert('got a new position');
};
 
// onError Callback receives a PositionError object 
// 
function geolocationError(error) {
    window.alert('code: ' + error.code); 
}


/*
function stop_button_pushed() {
    isStopButtonPushed = true;
    navigator.geolocation.clearWatch(watchID);
}
*/  

