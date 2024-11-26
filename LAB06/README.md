# GEOG_678 Lab 06

## Advanced Javascript Mapping 

### Purpose
The purpose of this lab was to:
1. Work in Leaflet Map
2. Edit Leaflet Map with GeoJSON

## Task 1: Complete the two tutorials in Leaflet - all HTML files are in this Lab06 folder as well as below with screenshots
## Task 2: Create a custom web map of TAMU campus - the HTML file is in this Lab05 folder as well as below with screenshots

## Note - This lab was very difficult.  The Leaflet tutorials were less than helpful and the class notes on this were equally not helpful.  I had to rely mostly on web resources and while I did finally get the assignment to work, I am certain if asked to write it from scratch, I would not be able to.  I do not think this lab really explained or provided the resources to expalain how to create this custom map.  I am only grasping the very edges of these concepts, not fully understanding them.  I know enough to know where to look to find answeres but not to answer the questions on my own.  Therefore, below is mostly copying and pasting and tweaking of web answers or tutorials.

## Task 1: Leaflet Tutorials

### Tutorial 1- Using GeoJSON with Leaflet

```html
<!DOCTYPE html>
<html>
  <head>
    <title>OpenStreetMap Leaflet Example</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
   integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
   crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
   integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
   crossorigin=""></script>
    <style>
      #mapid {
        height: 600px;
        width: 800px;
      }
    </style>
  </head>
  <body>
    <div id="mapid"></div>
    <script>
      // Initialize map
      var map = L.map('mapid').setView([39.74739, -106], 4);
      
      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Coors Field feature
      var coorsFieldFeature = {
        "type": "Feature",
        "properties": {
          "name": "Coors Field",
          "amenity": "Baseball Stadium",
          "popupContent": "This is where the Rockies play!"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-104.99404, 39.75621]
        }
      };

      // Add Coors Field marker
      L.geoJSON(coorsFieldFeature, {
        onEachFeature: function(feature, layer) {
          if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
          }
        }
      }).addTo(map);

      // Lines
      var myLines = [{
        "type": "LineString",
        "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
      }, {
        "type": "LineString",
        "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
      }];
      L.geoJSON(myLines).addTo(map);

      // State polygons
      var states = [{
        "type": "Feature",
        "properties": {"party": "Republican"},
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
          ]]
        }
      }, {
        "type": "Feature",
        "properties": {"party": "Democrat"},
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
          ]]
        }
      }];

      // Add colored state polygons
      L.geoJSON(states, {
        style: function(feature) {
          return feature.properties.party === 'Republican' 
            ? {color: "#ff0000"} 
            : {color: "#0000ff"};
        }
      }).addTo(map);

      // Features with filter
      var someFeatures = [{
        "type": "Feature",
        "properties": {
          "name": "Coors Field",
          "show_on_map": true
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-104.99404, 39.75621]
        }
      }, {
        "type": "Feature",
        "properties": {
          "name": "Busch Field",
          "show_on_map": false
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-104.98404, 39.74621]
        }
      }];

      // Add only features with show_on_map = true
      L.geoJSON(someFeatures, {
        filter: function(feature) {
          return feature.properties.show_on_map;
        }
      }).addTo(map);
    </script>
  </body>
</html>
```
#### Screen Shot

![Tutorial01](https://github.com/user-attachments/assets/ef0d940c-95f3-4ef5-980e-3a17209a746d)

### Leaflet Tutorial 2 - Interactive Choropleth Map

```html
<!DOCTYPE html>
<html>
  <head>
    <title>US States Population Density Map</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
   integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
   crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
   integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
   crossorigin=""></script>
    <style>
      #mapid {
        height: 600px;
        width: 100%;
      }
      .info {
        padding: 6px 8px;
        font: 14px/16px Arial, Helvetica, sans-serif;
        background: white;
        background: rgba(255,255,255,0.8);
        box-shadow: 0 0 15px rgba(0,0,0,0.2);
        border-radius: 5px;
      }
      .info h4 {
        margin: 0 0 5px;
        color: #777;
      }
      .legend {
        line-height: 18px;
        color: #555;
      }
      .legend i {
        width: 18px;
        height: 18px;
        float: left;
        margin-right: 8px;
        opacity: 0.7;
      }
    </style>
  </head>
  <body>
    <div id="mapid"></div>
    <script src="https://leafletjs.com/examples/choropleth/us-states.js"></script>
    <script>
      // Initialize map
      var map = L.map('mapid').setView([37.8, -96], 4);

      // Add tile layer
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      // Color function based on population density
      function getColor(d) {
        return d > 1000 ? '#800026' :
               d > 500  ? '#BD0026' :
               d > 200  ? '#E31A1C' :
               d > 100  ? '#FC4E2A' :
               d > 50   ? '#FD8D3C' :
               d > 20   ? '#FEB24C' :
               d > 10   ? '#FED976' :
                          '#FFEDA0';
      }

      // Style function for states
      function style(feature) {
        return {
          fillColor: getColor(feature.properties.density),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        };
      }

      // Highlight feature on mouseover
      function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });

        layer.bringToFront();
        info.update(layer.feature.properties);
      }

      // Reset highlight on mouseout
      function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
      }

      // Zoom to feature on click
      function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
      }

      // Event listeners for each feature
      function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        });
      }

      // Create GeoJSON layer
      var geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(map);

      // Custom info control
      var info = L.control();

      info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
      };

      info.update = function (props) {
        this._div.innerHTML = '<h4>US Population Density</h4>' +  
          (props ?
            '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
            : 'Hover over a state');
      };

      info.addTo(map);

      // Legend control
      var legend = L.control({position: 'bottomright'});

      legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 10, 20, 50, 100, 200, 500, 1000],
            labels = [];

        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
      };

      legend.addTo(map);
    </script>
  </body>
</html>

```
#### Screen Shot
![Tutorial02](https://github.com/user-attachments/assets/32de1bdb-7030-49df-aaf2-22c8fde22239)

## Task 2 - Custom Map of TAMU

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Texas A&M University Buildings Map</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <style>
      #map { 
        height: 600px; 
        width: 100%; 
      }
      .building-highlight {
        stroke: yellow;
        stroke-width: 3;
        fill-opacity: 0.7;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <div id="building-info"></div>

    <script src="tamubuildings.js"></script>
    <script>
      // Initialize the map
      var map = L.map('map').setView([30.6186, -96.3365], 15);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Declare geojsonLayer in a broader scope
      var geojsonLayer;

      // Style for buildings
      function buildingStyle(feature) {
        return {
          color: 'maroon',
          fillColor: 'maroon',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.5
        };
      }

      // Function to handle building highlighting
      function highlightBuilding(e) {
        var layer = e.target;
        
        // Reset all buildings to original style
        geojsonLayer.eachLayer(function(l) {
          geojsonLayer.resetStyle(l);
        });

        // Highlight current building
        layer.setStyle({
          color: 'yellow',
          fillColor: 'yellow',
          weight: 3,
          fillOpacity: 0.7
        });

        // Update building info
        document.getElementById('building-info').innerHTML = 
          '<strong>Building Name:</strong> ' + layer.feature.properties.BldgName +
          '<br><strong>Building Abbriviation:</strong> ' + layer.feature.properties.BldgAbbr;
      }

      // Function to reset building style
      function resetHighlight(e) {
        geojsonLayer.resetStyle(e.target);
        document.getElementById('building-info').innerHTML = 'Hover over a building for details';
      }

      // Function to zoom to building
      function zoomToBuilding(e) {
        map.fitBounds(e.target.getBounds());
      }

      // Wait for tamubuildings.js to load
      document.addEventListener('DOMContentLoaded', function() {
        // Ensure tamu variable is defined in tamubuildings.js
        if (typeof tamu !== 'undefined') {
          // Create GeoJSON layer with event handlers
          geojsonLayer = L.geoJSON(tamu, {
            style: buildingStyle,
            onEachFeature: function(feature, layer) {
              layer.on({
                mouseover: highlightBuilding,
                mouseout: resetHighlight,
                click: zoomToBuilding
              });
            }
          }).addTo(map);
        } else {
          console.error('TAMU buildings data not loaded. Check tamubuildings.js');
        }
      });

      // Initial info text
      document.getElementById('building-info').innerHTML = 'Hover over a building for details';
    </script>
  </body>
</html>
```
#### Screen Shot

![LHG_TAMU_MAP](https://github.com/user-attachments/assets/280d6c2f-ebc5-4735-8c96-0493913ccd13)

