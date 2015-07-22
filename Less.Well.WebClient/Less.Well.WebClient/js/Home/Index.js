//TODO local / Prod 
//var webApiUri = "http://localhost:63251/api/Wells/";
var webApiUri = "http://elixir.webapi.cheese-maker.ch/api/wells";

var google,
    map,
    userLocationMarker,
    newWellMarker;

// the list of wells will be cached here after retrieval
var wells = {},
    wellMarkers = [];

var userLocationLatitude,
    userLocationLongitude,
    newWellLocationLatitude, 
    newWellLocationLongitude;

var defaultZoomLevel = 16;
var closeLookZoomLevel = 20;

$(document).ready(function() {
    initializeMap();
    initializeWatching().done(function() {
        getWellsData();
        setUserMarkerPosition();
    });
    $('#addWell').click(function() {
        $('#addWell').toggle();
        addWellMarker();
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

function initializeMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'));
    map.setZoom(defaultZoomLevel);
    map.setCenter(new google.maps.LatLng(0, 0));
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
}

var deferred;
function initializeWatching() {
    deferred = new $.Deferred();
    if (navigator.geolocation) {
        watchUserPosition();
    } else {
        alert("Dis grät wott mr dini GPS-Koordinate nid säge. Chasch das äch ischteue?");
    }
    return deferred.promise();
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

function createUserMarker() {
    console.log("createUserMarker()");
    userLocationMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(userLocationLatitude, userLocationLongitude),
        title: "Da bisch du!",
        icon: "../Content/Images/blueMarker.png",
    });
    // scroll to userLocation
    map.panTo(new google.maps.LatLng(userLocationLatitude, userLocationLongitude));
};

function addWellMarker() {
    console.log("addWellMarker()");
    newWellMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(userLocationLatitude, userLocationLongitude),
        title: "Da isch eine!",
        icon: "../Content/Images/green-dot.png",
        draggable: true
    });
    map.panTo(new google.maps.LatLng(userLocationLatitude, userLocationLongitude));

    map.setZoom(closeLookZoomLevel );

    google.maps.event.addListener(newWellMarker, 'dragend', function () {
        newWellLocationLatitude = this.getPosition().lat();
        newWellLocationLongitude = this.getPosition().lng();
    });
};

function removeWellMarker() {
    if (newWellMarker != undefined) {
        newWellMarker.setMap(null);
        newWellMarker = undefined;
        $('#addWell').toggle();
        $('#addWellConfirmation').toggle();
    }
}

function watchUserPosition() {
    var options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };
    navigator.geolocation.watchPosition(watchSuccess, watchError, options);
}

function watchSuccess(position) {
    //alert("watchSuccess(pos)"+position.coords.latitude +" "+ position.coords.longitude);
    console.log("watchSuccess(position) with pos: "+position.coords.latitude +" "+ position.coords.longitude);
    userLocationLatitude = position.coords.latitude;
    userLocationLongitude = position.coords.longitude;
    setUserMarkerPosition();
    deferred.resolve();
}

function watchError(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

function setUserMarkerPosition() {
    if (userLocationMarker == undefined) {
        createUserMarker();
    }
    console.log("setUserMarkerPosition()");
    userLocationLatitude = userLocationLatitude;
    userLocationLongitude = userLocationLongitude;
    userLocationMarker.setPosition(new google.maps.LatLng(userLocationLatitude, userLocationLongitude));
}

function focusOnUser() {
    console.log("focusOnUser()");
    var latlng = new google.maps.LatLng(userLocationLatitude, userLocationLongitude);
    map.setCenter(latlng);
    map.setZoom(16);

    removeWellMarker();
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
    console.log("getWellsData()");
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
        Longitude: newWellLocationLongitude,
        Latitude: newWellLocationLatitude,
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