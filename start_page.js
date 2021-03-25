require(["esri/config", "esri/Map", "esri/views/MapView", "esri/Graphic", "esri/layers/GraphicsLayer"], function(esriConfig, Map, MapView, Graphic, GraphicsLayer) {
  esriConfig.apiKey = "AAPK5be3f01c97514789abf75cecf9eed17aYS60cPwCtzEzXaZy2u42oARgeKjVAUOk-0wu97XRw_4BrzTh8VKPB8DAT4vkvk7H";

  const map = new Map({
    basemap: "gray-vector" // Basemap layer service
  });

  const view = new MapView({
    map: map,
    center: [-119, 33.5], // Longitude, latitude
    zoom: 6, // Zoom level
    container: "viewDiv" // Div element
  });

  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  var longitudes = [];
  var latitudes = [];

  d3.csv("1960.csv").then(function(data) {
      for(var i = 0; i < data.length; i++) {
          // longitudes.push(data[i]['longitude'])
          // latitudes.push(data[i]['latitude'])
          var longitude_val = +data[i]['longitude'];
          var latitude_val = +data[i]['latitude'];

          const point = { // Create a point
            type: "point",
            longitude: longitude_val,
            latitude: latitude_val
          };

          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40], // Orange
            outline: {
              color: [255, 255, 255], // White
              width: 1
            }
          };

          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol
          });

          graphicsLayer.add(pointGraphic);
      }
  });

});
