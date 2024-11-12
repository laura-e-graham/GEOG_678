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
	
	console.log ("Bounding box computed for laura.e.graham@tamu.edu: ")
	console.log(BoundingBox);
}
	