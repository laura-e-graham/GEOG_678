# GEOG_678 Lab08

## Interactive Charts

## Tasks:
1. Operational Dashboad in ArcGIS Online
2. Chart with D3
3. Chart with HighCharts

## Task 1: Operational Dashboard in ArcGIS Online

### We were asked to follow the tutorial provided by ESRI and create a Dashboard for current snowplow information.  This tutorial worked fairly well but needs a few updates as the program has had a few changes since the time the tutorial was created.  However, the tutorial was comprehensive and did provide directions and exposure to several options of information presentation. 

### Website for my Dashboard:

https://www.arcgis.com/apps/dashboards/0ce6113d72b746ad809e00f0e88f38df

### Screenshot of my DashBoard

![DashBoard](https://github.com/user-attachments/assets/7c0d0c2c-f592-4c6a-81f7-d6961586e9aa)


## Task 2:  Chart with D3

### We were asked create a chart in D3 for a weeks worth of College Station temperatures.  This proved to be very difficult for me.  I selected a chart from the D3 site and copied the code.  I tried to alter it to fit the temperature data.  I made a CSV file for the data.  I could not get it to work.  I then placed the CSV data directly in the code but still had no luck.  I had to do many web seachers, ask AI, and several trial and errors to get this to work. I am not sure if I picked a tricky chart to begin with or with D3 charts are just beyond my abilities.  

### D3 Code

```html
<!DOCTYPE html>
<html>
  <head>
    <title>TAMU Temperature D3</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    
  </head>
  <body>

    <div id="chart"></div>
    <script>
// CSV data
const csvData = `date,High Temp,Low Temp
Sat,82,67
Sun,81,59
Mon,81,50
Tue,70,47
Wed,77,51
Thur,78,60
Fri,79,66
sat ,80,66`;

// Parse CSV
const data = d3.csvParse(csvData, d3.autoType);

// Chart dimensions
const width = 928;
const height = 500;
const marginTop = 50;
const marginRight = 50;
const marginBottom = 50;
const marginLeft = 50;

// Create chart
function createChart() {
  // Scales
  const x = d3.scaleBand()
    .domain(data.map(d => d.date))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => Math.max(d['High Temp'], d['Low Temp']))])
    .range([height - marginBottom, marginTop]);

  // Create SVG
  const svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  // Main title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", marginTop / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Weekly Temperature in College Station");

  // X-axis
  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

  // Y-axis
  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickFormat(d => `${d}°F`));

  // Y-axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .style("text-anchor", "middle")
    .text("Temperature (°F)");

  // Line generator
  const highTempLine = d3.line()
    .x(d => x(d.date) + x.bandwidth() / 2)
    .y(d => y(d['High Temp']));

  const lowTempLine = d3.line()
    .x(d => x(d.date) + x.bandwidth() / 2)
    .y(d => y(d['Low Temp']));

  // Draw High Temp line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("d", highTempLine);

  // Draw Low Temp line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("d", lowTempLine);

  // Add labels
  svg.append("text")
    .attr("x", width - 100)
    .attr("y", y(data[data.length-1]['High Temp']))
    .attr("fill", "red")
    .text("High Temp");

  svg.append("text")
    .attr("x", width - 100)
    .attr("y", y(data[data.length-1]['Low Temp']))
    .attr("fill", "blue")
    .text("Low Temp");
}

// Render chart
createChart();
    </script>
  </body>
</html>
```
### Screen Shot of D3 Chart

![D3chart](https://github.com/user-attachments/assets/ea519b66-cc07-479e-bb28-b5726ee78bdd)


## Task 3: Chart with HighCharts

### We were asked to take the same temperature data for College Station and make a chart using HighCharts.  I selected a HighChart example and copied the code.  I updated it and with much less difficulty was able to get it to work.  The HighCharts provided coding that was a bit more understandable to me.  I feel that I could use these charts with more confidence than D3 charts.

### HighCharts Code

```html
<!DOCTYPE html>
<html>
  <head>
    <title>TAMU Temperature</title>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <style>
        #container {
            min-width: 310px;
            max-width: 800px;
            height: 400px;
            margin: 0 auto
        }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <script>
    Highcharts.chart('container', {
        title: {
            text: 'Weekly Temperature in College Station',
            align: 'left'
        },
        subtitle: {
            text: 'By Laura Harstad Graham',
            align: 'left'
        },
        yAxis: {
            title: {
                text: 'Temperature (F)'
            }
        },
        xAxis: {
            categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            accessibility: {
                rangeDescription: 'Range: Sat, Sun, Mon, Tue, Wed, Thu, Fri, Sat'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
        series: [{
            name: 'High Temperature',
            data: [82, 81, 81, 70, 77, 78, 79, 80]
        }, {
            name: 'Low Temperature',
            data: [67, 59, 50, 47, 51, 60, 66, 66]
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
    </script>
  </body>
</html>
```

### Screen Shot of HighCharts

![Highchart](https://github.com/user-attachments/assets/86cb9fd2-b53f-4d5e-a540-2a8dc2c3e323)

