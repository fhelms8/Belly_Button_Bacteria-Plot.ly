d3.json("samples.json").then(data => {
    var names = data.names;
    var dropdownMenu = d3.select("#selDataset");
    names.forEach(item => {
        var tag = dropdownMenu.append("option");
        tag.text(item);
        tag.attr("id", item);
    })
    init()
});


d3.json("samples.json").then(data => {
    // Create dropdown function to hold ID #'s //
    // Create an array to hold each data sample
    var idNum = Object.values(data.names);
    var Meta = Object.values(data.metadata);
    // var samples = Object.values(samples.samples)

    function init() {
        var data = [{
            values: idNum,
            labels: Meta,
            type: "bar"
        }];

        var layout = {
            height: 600,
            width: 800
        };

        Plotly.newPlot("bar", data, layout);
    }   
        // Create Bar Char // 

    // On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("changed", getData);

    // Function called by DOM changes
    function getData() {
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
       // Call function to update the chart
        updatePlotly(dataset);
    }
    

    d3.selectAll("#sample-metadata").on("changed", getData);

    function getData() {
        var demograpghics = d3.select("#sample-metadata");
        var list = demograpghics.property("value");
        updatePlotly(list);
    }
    init()
});
