var drawPlot = function(varieties,target,
                         xScale,yScale)
{
    target.selectAll("circle")
    .data(varieties)
    .enter()
    .append("circle")
    .attr("cx",function(date)
    {
        console.log(date.Variety,"here")
        return xScale(date.Variety);   
    })
    .attr("cy",function(variety)
    {
//        console.log(variety.WeightedAveragePrice,"variet")
        return yScale(variety.WeightedAveragePrice);    
    })
    .attr("r",4)
    .attr("fill","white")
    .attr("class",function(variety)
    {
        if(variety.lesscollege_pct<80)
        {
            return "lessCollege"        
        }
        else if(variety.clf_unemploy_pct<6)
        {
            return "unemployment";        
        }
    })
    //tooltip on
    .on("mouseenter" ,function(variety)
      {
        
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
        d3.select("#commodity")
        .text(variety.commodity);
        
        d3.select("#variety")
        .text(variety.variety);
      })//tool tip off
    .on("mouseleave",function()
    {
        d3.select("#tooltip")    
        .classed("hidden",true);
    })
}


var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawAxes = function(graphDim,margins,
                         xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select("svg")
    .append("g");
    axes.append("g")
    .attr("transform","translate("+margins.left+","+(margins.top+graphDim.height)+")")
    .call(xAxis);
    
    axes.append("g")
    .attr("transform","translate("+margins.left+","+(margins.top)+")")
    .call(yAxis);
 
}


//graphDim -object that stores dimensions of the graph area
//margins - objedct that stores the size of the margins
var drawLabels = function(graphDim,margins)
{
    var labels = d3.select("svg")
    .append("g")
    .classed("labels",true);
    
    labels.append("text")
    .text("Average Market Prices Over Time")
    .classed("title",true)
    .attr("text-anchor", "middle")
    .attr("x", margins.left+(graphDim.width/2))
    .attr("y", margins.top)
    
    labels.append("text")
    .text("Types of Apples")
    .classed("label", true)
    .attr("text-anchor","middle")
    .attr("x", margins.left+graphDim.width/2)
    .attr("y", graphDim.height+(margins.bottom+margins.top))
    
    labels.append("g")
    .attr("transform", "translate(20,"+(margins.top+
    (graphDim.height/2))+")")
    .append("text")
    .text("Average Cost")
    .classed("label",true)
    .attr("text-anchor","middle")
    .attr("transform","rotate(90)")
}


var drawLegend = function(graphDim,margins)
{  var categories = [
       {
           class:"fruitsLegend",
           name:"Fruits"
       },
       {
           class:"veggieLegend",
           name:"Vegetables"
       }
    ]

//    var legend = d3.select("svg")
//    .append("g")
//    .classed("legend", true)
//    .attr("transform", "translate("+
//    (margins.left+10)+","+(margins.top+10)+")");
// 
//    var entries = legend.selectAll("g")
//    .data(categories)
//    .enter()
//    .append("g")
//    .classed("legendEntry", true)
//    .attr("class", function(category){
//        return category.class;
//    })
//    .attr("transform", function(categories, index){
//        return "translate(0,"+index+20+")";
//    })
//    
//    entries.append("rect")
//    .attr("width", 5)
//    .attr("height", 5)
// 
//    entries.append("text")
//    .text(function(category){return category.name;})
//    .attr("x", 15)
//    .attr("y", 10)
// 
    
    
    
}

//sets up several important variables and calls the functions for the visualization.
var initGraph = function(counties)
{
    //size of screen
    var screen = {width:1200,height:600}
    //how much space on each side
    var margins = {left:70,right:20,top:20,bottom:40}
    
    
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("svg")
    .append("g")
    .attr("id","#graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
    
    var xScale = d3.scaleBand()
         .domain(["BRAEBURN","FUJI","GALA","GOLDEN DELICIOUS","GRANNY SMITH","HONEYCRISP","JONAGOLD","JONATHAN","MCINTOSH","PINK LADY/CRIPPS PINK","RED DELICIOUS"])
        .range([0,graph.width])

    var yScale = d3.scaleLinear()
        .domain([0,6])
        .range([graph.height,0])
    var g0=target.append("g")
    .attr("transform","translate(55,10)")
    
    drawAxes(graph,margins,xScale,yScale);
    drawPlot(counties,g0,xScale,yScale);
    drawLabels(graph,margins);
    drawLegend(graph,margins);
    
    
    
    
    
}







var successFCN = function(varieties)
{
    console.log("fruits",varieties);
    initGraph(varieties);
    
}

var failFCN = function(error)
{
    console.log("error",error);
}

var polPromise = d3.csv("csv/apple.data.csv")
polPromise.then(successFCN,failFCN);
