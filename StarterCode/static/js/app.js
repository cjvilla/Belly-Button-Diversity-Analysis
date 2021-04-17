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
