// Set URL for Data Import
const url = "/api/v1.0/pop_gender";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ",dataPromise); 

// Set Global Variables
let user_choice;
let pieColor = ['#142459','#176ba0','#19aade','#1ac9e6','#18d4d4','#1de4bd','#6dfdd2','#c7f9ee'];
let color = ['#0099bb','#0277d7','#34A853','#ffb908','#e84856','#8d8cd9','#ea035e','#f7650b'];
const font = {family: 'Helvetica, sans-serif', weight: 'light',
              size: 16, color: 'white'};

// Map Specific Color to Data Sensitivity Value
let dSensColors = [[1, color[0]],
                   [2, color[1]],  
                   [3, color[2]],
                   [4, color[3]],
                   [5, color[4]]];


d3.json(url).then(function(data) {
    
    // Check Data in Console
    console.log("Data: ", data);

    // Call Dropdown Menu Function
    makeMenu()

    // Dropdown Menu Selection & Call getData Function
    d3.selectAll("#selDataset").on("change", getData);
    

/
function makeMenu(){
        
    // Get reference to the Dropdown select element
    let dropdownMenu = d3.select("#selDataset");
         
    // Create an Array containing each sector (unique values)
    let countryname = _.uniqBy(data, 'country').map(key => key.country);
    // Print Unique Sectors to console
    console.log('country name: ', countryname);

    // Add <select sector> element to beginning of Array for Dropdown Menu
    countryname.unshift('<select country>')

    // Use the Array of Methods to populate the menu options
    let country = countryname;
      
    // Append Method Array to Dropdown Menu
    sectors.forEach((country) => {
    dropdownMenu
        .append("option")
        .text(country)
        .property("value", country);
})};


function getData(){
      
    // Select Dropdown Menu using D3
    let dropdownMenu = d3.select("#selDataset");
      
    // Assign the chosen sector to a variable
    user_choice = dropdownMenu.property("value");
      
    // Print the chosen sector to the console
    console.log("User Choice: ", user_choice);
      
    // Filter for Selected sector
    let selectedcountryname = _.filter(data, object => object.country == user_choice);
    // Print the Selected sector Array of Objects to the console
    console.log("country name: ", countryname)


    /////////////////// METHOD INFO BOX //////////////////////
    // Select Sector Info Box
    let countryInfo = document.getElementById("totalpercentagesmokers");
      
    // Calculations for Sector Info Box
    let totalsmokers = _.size(selectedSector)
    let malesmokers = _.sumBy(selectedSector, 'records_lost')
    let femalesmokers = (recordsLost/totalBreaches)
    let year = _.sumBy(selectedSector, 'data_sensitivity')
    
    // Print the Worst Breach of Selected sector to the console
    console.log("highestsmokers: ", CountryName[0].Year)
    
    


   
    // Count Method Values
    let methodCount = _.countBy(Data.Smokers.Male, 'method');
    // Print Method Count to console
    console.log('Method Count: ', methodCount)

    // Create an Array containing each Method (unique values)
    let uniqueMethods = _.uniqBy(data, 'method').map(key => key.method);
    console.log('Unique Methods: ', uniqueMethods)

    // Set Variables for Pie Chart Labels and Values
    let pie_labels = uniqueMethods
    let pie_values = Object.values(methodCount)
    
    // Set up Pie Chart
    let pieData = [{
        labels: pie_labels,
        values: pie_values,
        type: 'pie',
        marker: {
          colors: pieColor.slice(0,5)
        },
      }];
    
    // Set Pie Chart Layout  
    let pieLayout = {
        title: 'Total no of smokers',
        font: font,
        plot_bgcolor: '#313348', 
        paper_bgcolor: '#313348',
      };
    
    // Plot Pie Chart
    Plotly.newPlot('pieChart', pieData, pieLayout);

    
    
    let yearCount = _.countBy(selectedSector, 'year');
    // Print Year Count to console
    console.log('Year Count: ', yearCount)

    // Set Variables for Line Chart Labels and Values 
    let line_labels = Object.keys(yearCount)
    let line_values = Object.values(yearCount)

    // Set Trace for Line Chart
    let trace = {
        x: line_labels,
        y: line_values,
        mode: 'lines',
        type: 'scatter',
        marker: {
          color: color[1]
        },
        line: {
          shape: 'linear'
        }
      };
      
    // Set Data for Line Chart
    let lineData = [trace];
      
    // Set Line Chart Layout 
    let lineLayout = {
        title: 'Data smoking analysis by Time',
        font: font,
        xaxis: {title: 'year', showgrid: true, gridcolor: '#3b3d56'},
        yaxis: {title: 'countries', range: [0, 20], showgrid: true, gridcolor: '#3b3d56'},
        plot_bgcolor: '#313348', 
        paper_bgcolor: '#313348', 
        //margin: {pad: 5}
      };
      
    // Plot Line Chart
    Plotly.newPlot('lineChart', lineData, lineLayout);


    
    let dataSensGrouped = _.groupBy(selectedSector, 'data_sensitivity');
    // Print Data Sensitivity Grouped data
    console.log('Grouped Data Sensitivities: ', dataSensGrouped)

    // Sum each Data Sensitivty Key in Groupby Variable
    let dataSensSum = _.mapValues(dataSensGrouped, dataSens => _.sumBy(dataSens, 'data_sensitivity'));
    // Print records lost per Data Sensivity key
    console.log('Records Lost: ', dataSensSum)

    // Set Variables for Bar Chart Labels and Values 
    let barLabels = Object.keys(dataSensSum)
    let barValues = Object.values(dataSensSum)

    /

    
    let barDesc = barLabels.map(value => {
      // Loop through colors to assign color based on value
      for (let i = 0; i < dSensDesc.length; i++) {
          if (value <= dSensDesc[i][0]) {
              return dSensDesc[i][1];}}
    });
    
    // Create Array of Colors based Data Sensitivity Values
    let barColors = barLabels.map(value => {
      // Loop through colors to assign color based on value
      for (let i = 0; i < dSensColors.length; i++) {
          if (value <= dSensColors[i][0]) {
              return dSensColors[i][1];}}
    });
    
    // Set Trace for Bar Chart
    let traceBar = {
        x: barValues,
        y: barLabels,
        //text: chartData.labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h",
        marker: {color: barColors},
        hovertext: barDesc
    };
      
    // Set Bar Chart Data to Trace
    let barData = [traceBar];

    // Set Bar Chart Layout Parameters
    let barLayout = {
        title: `Total Breaches by Data Sensitivity`,
        font: font,
        xaxis: {title: 'total smokers', showgrid: true, gridcolor: '#3b3d56'},
        yaxis: {title: 'data about countries', automargin: true, autotick: false, showgrid: true, gridcolor: '#3b3d56'},
        plot_bgcolor: '#313348', 
        paper_bgcolor: '#313348', 
        margin: {pad: -10}
    };
      
    // Plot Horizontal Bar Chart
    Plotly.newPlot("barChart", barData, barLayout);


    // BUBBLE CHART //
    // Sort data by 'records_lost' in descending order and extract Top 10
    let comparision = _.sortBy(Year, 'Data.Smokers.Male').reverse().slice(0,8);
    // Print Top Data Breaches per sector by records lost
    console.log("Sorted Data: ", sortedRecordsLost)
      
    // Create Empty Object to Append to
    let combinedObject = {};
      
    // Group Objects by Keys from sortedRecordsLost Array of Objects
    let groupedObjects = _.groupBy(sortedRecordsLost, (obj) => _.keys(obj).join(','));
    // Print groupedObjects to Console
    console.log('Grouped Objects: ', groupedObjects)
      
    // Iterate over Object to create Summary Object that contains Keys and all Values
    // Code adapted from ChatGPT
    _.forEach(groupedObjects, (group, keys) => {
        const keyArray = keys.split(','); 
         _.forEach(keyArray, (key) => {
          if (!combinedObject[key]) {
            combinedObject[key] = [];
          }
          combinedObject[key] = _.concat(combinedObject[key], _.map(group, key));});
    });
    
    // Check Combined Object for Plotting
    console.log('Combined Object for Plotting: ',combinedObject);

    // Create DateTime of 'date' array
    let dateArray = combinedObject.date.map(dateString => new Year(dateString));
    // Print 'date' array to console
    console.log('Date Array: ', dateArray)

    let bubbleColors = combinedObject.data_sensitivity.map(value => {
        // Loop through colors to assign color based on value
        for (let i = 0; i < dSensColors.length; i++) {
            if (value <= dSensColors[i][0]) {
                return dSensColors[i][1];}}
    });

    // Set Trace for Bubble Chart
    let traceBubble = {
        type: "scatter",
        mode: 'markers',
        x: dateArray,
        y: combinedObject.data_sensitivity,
        text: combinedObject.story,
        marker: {
          color: bubbleColors,
          size: combinedObject.records_lost,
          showscale: false,
          sizeref: 4000000},
        hovertemplate: "<b>%{customdata}</b><br>%{text}<extra></extra>",
        customdata: combinedObject.organisation
      };
      
      // Set Bubble Chart Data to Trace
      let bubbleData = [traceBubble];
      
      // Set Bubble Chart Layout Parameters
      var bubbleLayout = {
        title: `Highest no of smokers`,
        font: font,
        showlegend: false,
        height: 600,
        width: 1140,
        xaxis: {title: {text: "year"}, showgrid: true, gridcolor: '#3b3d56'},
        yaxis: {title: {text: "smokers"}, showgrid: true, gridcolor: '#3b3d56', range: [0, 5.9]},
        plot_bgcolor: '#313348',
        paper_bgcolor: '#313348'
      };
      
      // Plot Bubble Chart
      Plotly.newPlot("bubbleChart", bubbleData, bubbleLayout);

}});