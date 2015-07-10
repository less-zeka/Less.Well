//TODO local / Prod 
//var webApiUri = "http://localhost:63251/api/Wells/";
var webApiUri = "http://elixir.webapi.cheese-maker.ch/api/wells";

// the map
var map;
// the list of wells will be cached here after retrieval
var wells = {};

var userLocationLatitude;
var userLocationLongitude;

// get all Employees on page load!
$(document).ready(function () {
    initializeMap();
    getUserPosition();

    $('#addWell').click(function () {

        // Do something here!
        alert('Merci, notiere mrs grad!');
        addWell();
    });
});

function initializeMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'));
    map.setZoom(13);      // This will trigger a zoom_changed on the map
    map.setCenter(new google.maps.LatLng(0, 0));
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
}

function showLocation(position) {
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    userLocationLatitude = position.coords.latitude;
    userLocationLongitude = position.coords.longitude;
    map.setCenter(latLng);
    getWellsData();

    var latlng = new google.maps.LatLng(userLocationLatitude, userLocationLongitude);
    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5
        },
        title: 'Dini Position'
    });
}

function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied!");
    } else if (err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function getUserPosition() {
    if (navigator.geolocation) {
        // timeout at 60000 milliseconds (20 seconds)
        var options = { timeout: 20000 };
        navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    } else {
        alert("Sorry, browser does not support geolocation!");
    }
}

function getWellsData() {
    var data = "lat=" + userLocationLatitude + "&lon=" + userLocationLongitude;
    jQuery.support.cors = true;
    $.ajax({
        url: webApiUri,
        type: 'GET',
        dataType: 'json',
        data: data,
        success: function(data) {
            wells = data;
            displayWells(data);
        },
        error: function(x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function displayWells(positions) {
    $.each(positions, function(index, well) {
        var latlng = new google.maps.LatLng(well.Latitude, well.Longitude);
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: well.Info
        });
    });


}

function addWell() {
    jQuery.support.cors = true;

    var data = {
        Longitude: userLocationLongitude,
        Latitude: userLocationLatitude,
        Info: 'Inserted from less'
    };

    $.ajax({
        url: webApiUri,
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function () {
            alert(getRandomThanks());
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

var randomThanks = ["Has scho notiert!", "Merci gau!", "Merci gäu!", "Super sach.", "Fröie mi scho mau ds probiere :-)"];

function getRandomThanks() {
    return randomThanks[Math.floor(Math.random() * randomThanks.length)];

}