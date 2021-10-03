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

    // Create function to pull data from "samples" for bar chart (#bar) // 
    // "sample_value" => values for bar chart / "otu_ids" => labels / "otu_labels" => hovertext //
    // function barchart(samples) {
    //     d3.json("samples.json").then((sampData)=> {
    //         var sampValue = sampData.samples;
    //         var sampfilter = sampValue.filter(Sdata => Sdata.id == samples);
    //         var htmlsampData = d3.select("#bar").html("");

    //     })
    // }


// function barChart (samps) {
//     d3.json("samples.json").then((sampleBar) => {
//         var sampValue = sampleBar.samples;
//         var sampfilter = sampValue.filter(Sdata => Sdata.id == samps)[0];
//         var htmlsampData = d3.select("#bar").html("");
//         console.log(sampValue);

        
//             var barData =[{
//                 values: sampValue,
//                 labels: sampfilter,
//                 type: "bar",
//                 text: htmlsampData
//             }];
//             var layout = {
//                 height: 600,
//                 width: 800
//             };
//             Plotly.newPlot("bar", barData, layout)
//             }
//     );
// }

function barChart () {
    d3.json("samples.json").then((sampleBar) => {
        var slicedData = sampleBar.samples.slice([0]);
        // var reversedData = slicedData.reverse(0);
        console.log(slicedData);
        let trace1 ={
            x: slicedData.map(object => object.ids),
            y: slicedData.map(object => object.otu_ids),
            text: slicedData.map(object => object.otu_labels),
            name: "Belly Button",
            type: "bar",
            orientation: "h"
        };
        let traceData = [trace1];
        let layout = {
            title: "Belly Button Grossness",
            height: 600,
            width: 800,
        };
        Plotly.newPlot("bar", traceData, layout);
    })
}

// Defined OptionChanged to pass functions 
function optionChanged(demoOption) {

    // Update metadata with newly selected sample
    DemoTable(demoOption); 
    // // Update charts with newly selected sample
    barChart(demoOption)
}

