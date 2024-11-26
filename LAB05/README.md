# GEOG_678 Lab 05

## Basic Javascript Mapping with Leaflet JS

### Purpose
The purpose of this lab was to:
1. Learn how to set up Leaflet Map
2. Work with markers, polylines, and popups
3. Deal with events.

## Task 1: Complete the three tutorials in Leaflet - all HTML files are in this Lab05 folder as well as below with screenshots
## Task 2: Create a custom web map - the HTML file is in this Lab05 folder as well as below with screenshots

## Task 1
### Tutorial 1 - Leaflet Quick Start Guide

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Lab05_tutorial01</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"></script>
    <style>
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
      }
      #mapid {
        height: 100vh; /* 100% of the viewport height */
        width: 100%; /* Full width */
      }
    </style>
  </head>
  <body>
   <div id="mapid"></div>
   <script><!--initalize map-->
   var map = L.map('mapid').setView([51.505, -0.09], 13);
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '© OpenStreetMap contributors'
   }).addTo(map);
<!-- add circle-->
   var marker = L.marker([51.5, -0.09]).addTo(map);
   var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
	}).addTo(map);
<!--add polygon-->
	var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
	]).addTo(map);
<!--add marker and popup-->
	marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
	circle.bindPopup("I am a circle.");
	polygon.bindPopup("I am a polygon.");
<!--add lat and long click feature -->
	function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
	}

	map.on('click', onMapClick);
	map.locate({setView: true, maxZoom: 16});
   </script>	
  </body>
</html>
```
Screen Shot

![Lab05_01](https://github.com/user-attachments/assets/a7d853f6-8ca1-47b9-a3b8-c273f10e2eee)

### Tutorial 2 - Leaflet on Mobile

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Lab05_tutorial02</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
   integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
   crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
   integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
   crossorigin=""></script>
   <style> <!--style the map-->
    body {
      padding: 0;
      margin: 0;
    }
    html, body, #mapid {
      height: 100%;
    }
   </style>
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  </head>
  <body>
   <div id="mapid"></div>
   <script> <!--initializing the map-->
   var map = L.map('mapid').fitWorld();
   <!--add tile layer-->
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
     maxZoom: 18
   }).addTo(map);
   <!--set view-->
   map.locate({setView: true, maxZoom: 16});
   <!--zoom-->
   function onLocationFound(e) {
     var radius = e.accuracy / 2;
     L.marker(e.latlng).addTo(map)
         .bindPopup("You are within " + radius + " meters from this point").openPopup();
     L.circle(e.latlng, radius).addTo(map);
   }
   map.on('locationfound', onLocationFound);
   <!--error if msp can't load-->
   function onLocationError(e) {
     alert(e.message);
   }
   map.on('locationerror', onLocationError);
   </script>
  </body>
</html>
```
Screen Shot
![Lab05_02](https://github.com/user-attachments/assets/e3e1f4fb-e506-43a3-9856-692376a475c9)


### Tutorial 3 - Markers with Custon Icons

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Lab05_tutorial03</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"></script>
    <style>
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
      }
      #mapid {
        height: 100vh; /* 100% of the viewport height */
        width: 100%; /* Full width */
      }
    </style>
  </head>
  <body>
   <div id="mapid"></div>
   <script>
   // Initialize map
   var map = L.map('mapid').setView([51.505, -0.09], 13);
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '© OpenStreetMap contributors'
   }).addTo(map);

   // Define custom icon class
   var LeafIcon = L.Icon.extend({
     options: {
       shadowUrl: 'https://jgengle.github.io/Leaflet/examples/custom-icons/leaf-shadow.png',
       iconSize:     [38, 95],
       shadowSize:   [50, 64],
       iconAnchor:   [22, 94],
       shadowAnchor: [4, 62],
       popupAnchor:  [-3, -76]
     }
   });

   // Create specific icons
   var greenIcon = new LeafIcon({
     iconUrl: 'https://jgengle.github.io/Leaflet/examples/custom-icons/leaf-green.png'
   });
   var redIcon = new LeafIcon({
     iconUrl: 'https://jgengle.github.io/Leaflet/examples/custom-icons/leaf-red.png'
   });
   var orangeIcon = new LeafIcon({
     iconUrl: 'https://jgengle.github.io/Leaflet/examples/custom-icons/leaf-orange.png'
   });

   // Add markers with custom icons
   L.marker([51.5, -0.09], {icon: greenIcon})
     .addTo(map)
     .bindPopup("I am a green leaf.");

   L.marker([51.495, -0.083], {icon: redIcon})
     .addTo(map)
     .bindPopup("I am a red leaf.");

   L.marker([51.49, -0.1], {icon: orangeIcon})
     .addTo(map)
     .bindPopup("I am an orange leaf.");
   </script>	
  </body>
</html>
```

Screen Shot
![Lab05_03A](https://github.com/user-attachments/assets/92752520-fea2-4058-baf3-309a05d19bce)
![L![Lab05_03C](https://github.com/user-attachments/assets/80412b8d-18e6-4d39-8e13-215c7998d8f7)
![Lab05_03B](https://github.com/user-attachments/assets/a612ed07-97a9-45ee-8818-9a53165dcc92)



## Task 2 - Custom Web Map

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Texas A&M Campus Map</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"></script>
    <style>
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
      }
      #mapid {
        height: 100vh;
        width: 100%;
      }
    </style>
  </head>
  <body>
   <div id="mapid"></div>
   <script>
   // Initialize map
   var map = L.map('mapid').setView([30.610670, -96.340], 15);

   // Add tile layer
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
     maxZoom: 19,
     minZoom: 10
   }).addTo(map);

   // User geolocation
   map.locate({setView: false, maxZoom: 16});

   function onLocationFound(e) {
     var radius = e.accuracy / 2;
     L.marker(e.latlng)
       .addTo(map)
       .bindPopup("Your current location")
       .openPopup();
     L.circle(e.latlng, radius).addTo(map);
   }
   map.on('locationfound', onLocationFound);

   function onLocationError(e) {
     console.warn("Location error: " + e.message);
   }
   map.on('locationerror', onLocationError);

   // Kyle Field marker
   var kyleFieldMarker = L.marker([30.610670, -96.340], {
     title: 'Kyle Field'
   }).addTo(map)
     .bindPopup("<b>Kyle Field</b><br>Home of Aggie Football");

   // Kyle Field circle
   L.circle([30.610670, -96.340], {
     color: 'maroon',
     fillColor: '#500000',
     fillOpacity: 0.2,
     radius: 300
   }).addTo(map);

   // Custom TAMU icon
   var tamuIcon = L.icon({
     iconUrl: 'https://www.tamu.edu/_files/images/logos/primaryTAM.png',
     iconSize: [50, 50],
     iconAnchor: [25, 25],
     popupAnchor: [0, -25]
   });

   // O&M Building marker
   L.marker([30.617742, -96.336657], {
     icon: tamuIcon,
     title: 'O&M Building'
   }).addTo(map)
     .bindPopup("O&M Building");
	 <!--add lat and long click feature -->
	function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
	}

	map.on('click', onMapClick);
	map.locate({setView: true, maxZoom: 16});
   </script>	
  </body>
</html>
```
Screen Shot
![LAB05_FirstWebSiteA](https://github.com/user-attachments/assets/e901f63d-6619-43a2-8163-ca49c2def71c)
![Lab05_FirstWebSiteB](https://github.com/user-attachments/assets/89fb0911-a310-4db8-8d15-40565ebb33db)
![Lab05_FirstWebSiteC](https://github.com/user-attachments/assets/934f08d5-6b4b-4e3f-91ed-0f35bb54cefd)
![Lab05_FirstWebMapD](https://github.com/user-attachments/assets/a2ed9319-e4ae-4758-ade0-30d68a1e5010)










