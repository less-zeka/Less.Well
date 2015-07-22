//TODO local / Prod 
//var webApiUri = "http://localhost:63251/api/Wells/";
var webApiUri = "http://elixir.webapi.cheese-maker.ch/api/wells";

var google;
var map;
var userLocationMarker;

// the list of wells will be cached here after retrieval
var wells = {};
var wellMarkers = [];

var userLocationLatitude;
var userLocationLongitude;

var defaultZoomLevel = 16;

$(document).ready(function() {
    initLocationProcedure();

    $('#addWell').click(function() {
        $('#addWell').toggle();
        $('#addWellConfirmation').toggle();
    });

    $('#addWellConfirmation').click(function() {
        alert('Merci, notiere mrs grad!');
        addWell();
    });

    $('#refocusOnUser').click(function () {
        focusOnUser();
    });
});

function initLocationProcedure() {
    map = new google.maps.Map(document.getElementById('map-canvas'));
    map.setZoom(defaultZoomLevel);
    map.setCenter(new google.maps.LatLng(0, 0));
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    if (navigator.geolocation) {
        watchCurrentPosition();
    } else {
        alert("Dis grät wott mr dini GPS-Koordinate nid säge. Chasch das äch ischteue?");
    }
}

function getPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, watchError, { timeout: 10000 });
    } else {
        alert("Dis grät wott mr dini GPS-Koordinate nid säge. Chasch das äch ischteue?");
    }
}

function successCallback(position) {
    userLocationLatitude = position.coords.latitude;
    userLocationLongitude = position.coords.longitude;
}

function displayAndWatch(lat, lon) {
    userLocationLatitude = lat;
    userLocationLongitude = lon;

    // watch position
    watchCurrentPosition();
}

function createUserMarker() {
    console.log(userLocationLatitude);
    // marker for userLocation
    userLocationMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(userLocationLatitude, userLocationLongitude),
        title: "You are here",
        icon: "../Content/Images/blueMarker.png",
        draggable: true
    });
    // scroll to userLocation
    map.panTo(new google.maps.LatLng(userLocationLatitude, userLocationLongitude));

    google.maps.event.addListener(userLocationMarker, 'dragend', function() {
        userLocationLatitude = this.getPosition().lat();
        userLocationLongitude = this.getPosition().lng();
    });
};

function watchCurrentPosition() {
    var options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };
    navigator.geolocation.watchPosition(watchSuccess, watchError, options);
}

function watchSuccess(position) {
    userLocationLatitude = position.coords.latitude;
    userLocationLongitude = position.coords.longitude;
    console.log("watchCurrentPosition successt");
    //alert("watchCurrentPosition successt!");
    createUserMarker();
    setMarkerPosition(position);
    getWellsData();
}

function watchError(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

function setMarkerPosition(position) {
    userLocationLatitude = position.coords.latitude;
    userLocationLongitude = position.coords.longitude;
    userLocationMarker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
}

function focusOnUser() {
    var latlng = new google.maps.LatLng(userLocationLatitude, userLocationLongitude);
    map.setCenter(latlng);
    map.setZoom(16);
}

function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied!");
    } else if (err.code == 2) {
        alert("Dis grät wott mr dini GPS-Koordinate nid säge. Chasch das äch ischteue?");
        //alert("Error: Position is unavailable!");
    }
}

function getWellsData() {
    var queryString = "lat=" + userLocationLatitude + "&lon=" + userLocationLongitude;
    jQuery.support.cors = true;
    $.ajax({
        url: webApiUri,
        type: 'GET',
        dataType: 'json',
        data: queryString,
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
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: well.Info
        });
        wellMarkers.push(marker);
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