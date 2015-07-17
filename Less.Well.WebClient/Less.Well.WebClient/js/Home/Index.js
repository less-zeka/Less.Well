//TODO local / Prod 
//var webApiUri = "http://localhost:63251/api/Wells/";
var webApiUri = "http://elixir.webapi.cheese-maker.ch/api/wells";

// the map
var map;
// the list of wells will be cached here after retrieval
var wells = {};

var userLocationLatitude;
var userLocationLongitude;

var userLocation;
var google;

// get all Employees on page load!
$(document).ready(function() {
    //initializeMap();
    //getUserPosition();
    initLocationProcedure();

    $('#addWell').click(function() {
        $('#addWell').toggle();
        focusOnUser();
        $('#addWellConfirmation').toggle();
    });

    $('#addWellConfirmation').click(function() {
        alert('Merci, notiere mrs grad!');
        addWell();
    });
});

function initLocationProcedure() {
    map = new google.maps.Map(document.getElementById('map-canvas'));
    map.setZoom(15); // This will trigger a zoom_changed on the map
    map.setCenter(new google.maps.LatLng(0, 0));
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);


    if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(displayAndWatch, locError, {
        //    enableHighAccuracy: true,
        //    timeout: 60000,
        //    maximumAge: 0
        //});
        var watchID = navigator.geolocation.watchPosition(function(position) {
            displayAndWatch(position.coords.latitude, position.coords.longitude);
        });
    } else {
        alert("Dis grät wott mr dini GPS-Koordinate nid säge. Chasch das äch ischteue?");
    }
}

function locError(error) {
    // the current position could not be located
    alert("Dis grät wott mr dini GPS-Koordinate nid säge. Chasch das äch ischteue?");
}

function displayAndWatch(lat, lon) {
    userLocationLatitude = lat;
    userLocationLongitude = lon;
    getWellsData();
    // set current position
    setUserLocation();
    // watch position
    watchCurrentPosition();
}

var marker; 
function setUserLocation() {
    // marker for userLocation
    marker = userLocation = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(userLocationLatitude, userLocationLongitude),
        title: "You are here",
        icon: "../Content/Images/blueMarker.png",
        draggable: true
    });
    // scroll to userLocation
    map.panTo(new google.maps.LatLng(userLocationLatitude, userLocationLongitude));

    google.maps.event.addListener(marker, 'dragend', function (event) {
        userLocationLatitude = this.getPosition().lat();
        userLocationLongitude = this.getPosition().lng();
    });
};


function watchCurrentPosition() {

    var positionTimer = navigator.geolocation.watchPosition(function(position) {
        setMarkerPosition(userLocation, position);
    });
    console.log("watchCurrentPosition()");

}

function setMarkerPosition(marker, position) {
    userLocationLatitude = position.coords.latitude;
    userLocationLongitude = position.coords.longitude;

    marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    console.log(position);
}

function focusOnUser() {
    var latlng = new google.maps.LatLng(userLocationLatitude, userLocationLongitude);
    map.setCenter(latlng);
    map.setZoom(20);
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
        // timeout at 20000 milliseconds (20 seconds)
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
        success: function() {
            alert(getRandomThanks());
        },
        error: function(x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}