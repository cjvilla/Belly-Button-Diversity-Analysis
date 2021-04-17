
d3.json("samples.json").then(function(data) {
    
    var select_data = d3.select('#selDataset');
    var select_subjects = Object.values(data.names);

    select_subjects.forEach((row,i) => {
        select_data
        .append("option")
        .text(row)
        .property("value", i)
    })
});

function selectOption() { 
    var select_subject = d3.select('#selDataset').node().value;
    buildPlot(select_subject)
}

function buildPlot(select_subject) {
    d3.json("samples.json").then(function(data) {
        var select_ID = select_subject
        var topSampleValues = Object.values(data.samples[select_ID].sample_values.slice(0,10).reverse());
        var topOtuIDs = Object.values(data.samples[select_ID].otu_ids.slice(0,10).reverse());
        var topOtuLabels = Object.values(data.samples[select_ID].otu_labels.slice(0,10).reverse());
        

// fill demo data 

    var demoBox = document.getElementById("sample-metadata");

    demoBox.innerHTML = `id: ${Object.values(data.metadata[select_ID])[0]}<br>
                        ethnicity: ${Object.values(data.metadata[select_ID])[1]}<br>
                        gender: ${Object.values(data.metadata[select_ID])[2]}<br>
                        age: ${Object.values(data.metadata[select_ID])[3]}<br>
                        location: ${Object.values(data.metadata[select_ID])[4]}<br>
                        bbtype: ${Object.values(data.metadata[select_ID])[5]}<br>
                        wfreq:${Object.values(data.metadata[select_ID])[6]}<br>`;

    console.log(Object.values(data.metadata[select_ID]))

//bar chart
        // trace for horizontal bar chart
        var traceBar = {
        x: topSampleValues,
        y: topOtuIDs,
        text: topOtuLabels,
        name: "Top 10 OTU Samples",
        type: "bar",
        orientation: "h"
        };

        // data
        var chartData = [traceBar];

        // Apply the group bar mode to the layout
        var barLayout = {
        title: "Top 10 OTU Samples",
        width: 500,
        height: 800,
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        },
        yaxis: {
            type: 'category',
            title: {
                text: "OTU Names",
                standoff: 20
              },
            automargin: true,
          },
        xaxis: {
            title: {
                text: "Sample Measurement",
                standoff: 20
              },
            automargin: true,
          }
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", chartData, barLayout);

// bubble chart 

        var sampleValues = Object.values(data.samples[select_ID].sample_values);
        var otuIDs = Object.values(data.samples[select_ID].otu_ids);
        var otuLabels = Object.values(data.samples[select_ID].otu_labels);

        var traceBubble = {
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                color: otuIDs,
                size: sampleValues,
            }
          };
          
          var data = [traceBubble];
          
          var bubbleLayout = {
            title: 'All Samples by OTU ID',
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: {
                title: {
                    text: "OTU ID",
                    standoff: 20
                  },
                automargin: true,
              }
          };
          
          Plotly.newPlot('bubble', data, bubbleLayout);


});       
