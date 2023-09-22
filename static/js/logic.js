let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the lightmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    "Bike Stations": bikeStations
  };

  // Create the map object with options.
  let map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap, bikeStations]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}
// Create the createMarkers function.
function createMarkers(response) {
  console.log(response)
  // Pull the "stations" property from response.data.
  let stations = response.data.stations;
  // Initialize an array to hold the bike markers.
  let bikeMarkers = [];
  // Loop through the stations array.
    // For each station, create a marker, and bind a popup with the station's name.
    for (let index = 0; index < stations.length; index++) {
      let station = stations[index];
    // Add the marker to the bikeMarkers array.
    if (station.capacity>100){
       // Create a custom icon with the desired marker color
    let customIcon = L.divIcon({
      className: 'custom-icon',
      html: '<div style="background-color: green;" class="marker-pin"></div>',
    });

      let bikeMarker = L.marker([station.lat, station.lon])
    .bindPopup("<h3>" + station.name + "</h3><h3>Capacity: " + station.capacity + "</h3>");
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  bikeMarkers.push(bikeMarker);}
}

createMap(L.layerGroup(bikeMarkers));
}


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);