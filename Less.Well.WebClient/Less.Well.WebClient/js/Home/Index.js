//TODO local / Prod 
var webApiUri = "http://localhost:63251/api/Wells/";
//var webApiUri = "TODO";

// the list of wells will be cached here after retrieval
var wells = {};

// get all Employees on page load!
$(document).ready(function () {
    getWells();
});

function getWells() {
    jQuery.support.cors = true;
    $.ajax({
        url: webApiUri,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            wells = data;
            showWellsOnMap(data);
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function showWellsOnMap(data) {
    load(data);
}

function load(positions) {
    var mapDiv = document.getElementById("map");
    var latlng = new google.maps.LatLng(positions[0].Longitude, positions[0].Latitude);
    var mapOptions =
    {
        zoom: 13,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    var map = new google.maps.Map(mapDiv, mapOptions);

    $.each(positions, function (index, well) {
        var latlng = new google.maps.LatLng(well.Longitude, well.Latitude);
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: well.Info
        });
    });

    
}
