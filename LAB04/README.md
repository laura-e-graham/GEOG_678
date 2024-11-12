# GEOG_678 Lab 04

## Javascript and JSON programming

### Purpose
The purpose of this lab was to:
1. Build interactive web pages (javascript button clicks)
2. Create and utilize JSON objects
3. Make arrays
4. Apply basi javascript control structure (loops, if/else)

## Task 1: Create and link the HTML and Javascript pages for this assignment
## Task 2: Create an HTML button which calls your javascript function Run() when it is clicked

```html

<!DOCTYPE html> 
<!-- First line of code in all of your HTML documents. Declaration of version of HTML -->

<html> 
<!-- Container for the document-->

    <!-- Pull in the code within an external javascript file (located in the same directory) -->
    <script src='BoundingBox.js'></script>
	<script src='theJSON.js'></script>

    <!-- Setting a creative title for the page -->
    <head>
		<meta charset="UTF-8">
		<title> Lab 4 Laura Harstad Graham</title>
    </head>

    <!-- The body of our document which contains things to be rendered by the browser-->
    <body> 

        <!-- Make a button -->
        <input type='button' value='Click Me!' onclick='Run();'></input>
    </body>
</html>

```
## Task 3: Create the Run function inside of your Javascript file

```javascript
function Run(){
	//get the corners created by the above functions  and selects the correct ones ffrom the data by their value
	var topLeftPoint = findTopLeft(theJSON);
	var topRightPoint = findTopRight(theJSON);
	var bottomLeftPoint = findBottomLeft(theJSON);
	var bottomRightPoint = findBottomRight(theJSON);
	
	var BoundingBox = {
		topLeft: topLeftPoint,
		topRight: topRightPoint,
		bottomleft: bottomLeftPoint,
		bottomright: bottomRightPoint
	}
	
```
	
## Task 4: Create javascript functions to calculate the bounding box from the data file

```javascript
// This series of functions solves for the corners of the bound box
// function solves for the top left corner - max lat and min long
//loop through the array for each data point to find the right match
function findTopLeft(pointList) 
{
	var maxLat = null;
	var minLon = null;

    pointList.data.forEach(
		point => 
		{
			if (maxLat == null) {  //first point only for comparison 
				maxLat = point.lat
				minLon = point.lon
			}
			else {
				if (point.lat > maxLat){  //max lat
				maxLat = point.lat
				}
				if (point.lon < minLon){  //min lon
				minLon = point.lon
				}
			}
		}
		)
	return {"pointID": 1, "lat": maxLat, "lon":minLon
	}
}
//find the top right corner, both max lat and max lon	
function findTopRight(pointList) 
{
	var maxLat = null;
	var maxLon = null;

    pointList.data.forEach(
		point => 
		{
			if (maxLat == null) {  //first point only for comparison 
				maxLat = point.lat
				maxLon = point.lon
			}
			else {
				if (point.lat > maxLat){  //max lat
				maxLat = point.lat
				}
				if (point.lon > maxLon){  //max lon
				maxLon = point.lon
				}
			}
		}
		)
	return {"pointID": 2, "lat": maxLat, "lon":maxLon
	}
}

//find the bottom left corner, both min lat and min lon	
function findBottomLeft(pointList) 
{
	var minLat = null;
	var minLon = null;

    pointList.data.forEach(
		point => 
		{
			if (minLat == null) {  //first point only for comparison to find min and min
				minLat = point.lat
				minLon = point.lon
			}
			else {
				if (point.lat < minLat){  //min lat
				minLat = point.lat
				}
				if (point.lon < minLon){  //min lon
				minLon = point.lon
				}
			}
		}
		)
	return {"pointID": 3, "lat": minLat, "lon":minLon
	}
}

//find the bottom right corner, both min lat and max lon	
function findBottomRight(pointList) 
{
	var minLat = null;
	var maxLon = null;

    pointList.data.forEach(
		point => 
		{
			if (minLat == null) {  //first point only for comparison to find min and min
				minLat = point.lat
				maxLon = point.lon
			}
			else {
				if (point.lat < minLat){  //min lat
				minLat = point.lat
				}
				if (point.lon > maxLon){  //max lon
				maxLon = point.lon
				}
			}
		}
		)
	return {"pointID": 4, "lat": minLat, "lon":maxLon
	}
}
```
## Task 5: Make your Run function call your function(s) that find the corners
## Task 6: Create an output object from your corners

```javascript
function Run(){
	//get the corners created by the above functions  and selects the correct ones ffrom the data by their value
	var topLeftPoint = findTopLeft(theJSON);
	var topRightPoint = findTopRight(theJSON);
	var bottomLeftPoint = findBottomLeft(theJSON);
	var bottomRightPoint = findBottomRight(theJSON);
	
	var BoundingBox = {
		topLeft: topLeftPoint,
		topRight: topRightPoint,
		bottomleft: bottomLeftPoint,
		bottomright: bottomRightPoint
	}
	
```

## Task 7: Print out your result, along with your email

```javscript

console.log ("Bounding box computed for laura.e.graham@tamu.edu: ")
	console.log(BoundingBox);
}
```
## Task 8: Screen shot of the console showing your email and your bounding box

![Screenshot 2024-11-11 192520](https://github.com/user-attachments/assets/7f94f75c-71b2-4381-b82e-f2d9dde120cf)


## Task 9: Upload all code to Github
 All code is located in the Lab 04 folder, subfolder "BoundingBox".
 
 HTML - LAB04_LHG
 
 Javascript - BoundingBox.js
 
 JSON- theJSON.js
