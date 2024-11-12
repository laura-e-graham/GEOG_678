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

/html

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
