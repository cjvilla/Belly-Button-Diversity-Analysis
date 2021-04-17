function selectOption() { 
    var select_subject = d3.select('#selDataset').node().value;
 build_plot(select_subject)
}

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


function build_plot(select_subject) {
    d3.json("samples.json").then(function(data) {
        var select_ID = select_subject
        var select_sample_values = Object.values(data.samples[select_ID].sample_values.slice(0,10).reverse());
        var select_Otu_ID = Object.values(data.samples[select_ID].otu_ids.slice(0,10).reverse());
        var select_Otu = Object.values(data.samples[select_ID].otu_labels.slice(0,10).reverse());
        
    var page = document.getElementById("sample-metadata");
    
    
    page.innerHTML =   `id: ${Object.values(data.metadata[select_ID])[0]}<br>
                        ethnicity: ${Object.values(data.metadata[select_ID])[1]}<br>
                        gender: ${Object.values(data.metadata[select_ID])[2]}<br>
                        age: ${Object.values(data.metadata[select_ID])[3]}<br>
                        location: ${Object.values(data.metadata[select_ID])[4]}<br>
                        bbtype: ${Object.values(data.metadata[select_ID])[5]}<br>
                        wfreq:${Object.values(data.metadata[select_ID])[6]}<br>`;

                        
    console.log(Object.values(data.metadata[select_ID]))

    var trace1 = {
    x: select_sample_values,
    y: select_Otu_ID,
    text: select_Otu,
    name: "Top 10 OTU Samples",
    type: "bar",
    orientation: "h"
    };

    var subject_data = [trace1];

    var layout1 = {
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

    Plotly.newPlot("bar", subject_data, layout1);


    var sample_Values = Object.values(data.samples[select_ID].sample_values);
    var OTU_IDS = Object.values(data.samples[select_ID].otu_ids);
    var OTU = Object.values(data.samples[select_ID].otu_labels);

    var trace2 = {
        x: OTU_IDS,
        y: sample_Values,
        text: OTU,
        mode: 'markers',
        marker: {
            color: OTU_IDS,
            size: sample_Values,
        }
      };
      
      var subject_data2 = [trace2];
      
      var layout2 = {
        title: 'Samples by OTU ID',
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
      
      Plotly.newPlot('bubble', subject_data2, layout2);
});       
}