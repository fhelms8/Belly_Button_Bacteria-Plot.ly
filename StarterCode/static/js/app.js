// Create function to pull data from "names" for dropdown // 
d3.json("samples.json").then(numData => {
    var names = numData.names;
    var dropdownMenu = d3.select("#selDataset");
    names.forEach(idNum => {
        var nums = dropdownMenu.append("option");
        nums.text(idNum);
        nums.attr("id", nums);
    })
});

// Create function to pull data from "metadata" for demographics table (#sample-metadata) //
function DemoTable(demographics) {
    d3.json("samples.json").then((sampleMD) => {
        var MData = sampleMD.metadata;
        var dataID = MData.filter(Ddata => Ddata.id == demographics);
        var htmlMD = d3.select("#sample-metadata").html("");
        Object.entries(dataID[0]).forEach(([key, value]) => {
            htmlMD.append("p").text(`${key}: ${value}`);
        });
    });
}

// Create Bar Chart Functions //

function barChart (bardata) {
    d3.json("samples.json").then((sampleBar) => {
        var slicedData = sampleBar.samples;
        var idValue = slicedData.filter(IData => IData.id == bardata)[0];
        d3.select('#bar').html("");
        let trace1 ={
            x: idValue.sample_values,
            y: idValue.otu_ids.map(object => "OTU" + object),
            text: idValue.otu_labels,
            name: "Belly Button",
            type: "bar",
            orientation: "h"
        };
        let traceData = [trace1];
        let layout = {
            height: 600,
            width: 800,
        };
        Plotly.newPlot("bar", traceData, layout);

        // Create Bubble Chart //
        var trace2 ={
            x: idValue.otu_ids.map(object => object),
            y: idValue.sample_values,
            text: idValue.otu_labels,
            mode: 'markers',
            marker: {
                color: idValue.sample_values,
                size: idValue.sample_values,
                opacity: idValue.sample_values
            }            
        };
        var bubblechart = [trace2];
        var layout2 = {
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: {
                title: "OTU ID"
            }
        };
        Plotly.newPlot("bubble", bubblechart, layout2);
    });
}


// Defined OptionChanged to pass functions 
function optionChanged(demoOption) {

    // Update metadata with newly selected sample
    DemoTable(demoOption); 
    // // Update charts with newly selected sample
    barChart(demoOption)
}

