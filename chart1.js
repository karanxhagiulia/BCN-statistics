// Load D3.js library
document.addEventListener('DOMContentLoaded', function() {
    loadD3();
});

// Function to load D3.js library
function loadD3() {
    const script = document.createElement('script');
    script.src = 'https://d3js.org/d3.v7.min.js';
    script.onload = function() {
        createChart('.chart1'); // Call the function to create the chart when D3.js is loaded
    };
    document.head.appendChild(script);
}

// Function to create the chart
function createChart(chartClass) {
    // Load data from CSV file
    d3.csv('BCN.csv').then(function(data) {
        console.log(data); // Debug: Log the loaded data to check if it's correct
        
        // Ensure "Average yearly salary" values are parsed as numbers
        data.forEach(function(d) {
            d["Average yearly salary"] = parseFloat(d["Average yearly salary"]);
        });
        console.log(data); // Debug: Log the updated data to check if parsing is correct
        
        const filteredData = data.filter(function(d) {
            return !isNaN(d["Average yearly salary"]) && parseInt(d.Year) <= 2022; // Filter out data points with NaN values and consider only data up to the year 2022
        });
        console.log(filteredData); // Debug: Log the filtered data
        
        const width = 1000; // Adjusted width for the SVG container
        const height = 400;
        const margin = { top: 20, right: 20, bottom: 50, left: 20 }; // Increased bottom margin to accommodate X-axis labels

        // Create SVG element with viewBox for responsiveness
        const svg = d3.select(chartClass)
            .append('svg')
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        const x = d3.scaleLinear()
            .domain(d3.extent(filteredData, d => parseInt(d.Year)))
            .range([0, width - margin.left - margin.right]);
        
        const y = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => parseFloat(d["Average yearly salary"]))])
            .range([height - margin.top - margin.bottom, 0]);

        const xAxis = d3.axisBottom(x)
            .tickFormat(d3.format('d')); // Format tick values as integers without commas
        
        // Draw the X-axis
        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(0,' + (height - margin.top - margin.bottom) + ')')
            .call(xAxis);

        // Draw the line
        const line = d3.line()
            .x(d => x(parseInt(d.Year)))
            .y(d => y(parseFloat(d["Average yearly salary"]))); // Access "Average yearly salary" column

        svg.append('path')
            .datum(filteredData)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', line);

        // Add data labels
        svg.selectAll('.dot')
            .data(filteredData)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('cx', d => x(parseInt(d.Year)))
            .attr('cy', d => y(parseFloat(d["Average yearly salary"])))
            .attr('r', 5);

        svg.selectAll('.label')
            .data(filteredData)
            .enter().append('text')
            .attr('class', 'label')
            .attr('x', d => x(parseInt(d.Year)))
            .attr('y', d => y(parseFloat(d["Average yearly salary"])) - 10)
            .text(d => d["Average yearly salary"].toFixed(2))
            .style('text-anchor', 'middle');

        console.log(svg.node()); // Debug: Log the SVG element
    }).catch(function(error) {
        console.error('Error loading the data:', error);
    });
}
