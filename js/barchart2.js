var margin = {top: 50, bottom: 100, right:30, left: 70},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;



var svg3 = d3.select("#barchart2")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate("+margin.left+","+margin.top+")");

       
       
     var drawGraph2 =function(veg){
    var subgroups = veg.columns.slice(0)
    
var groups = d3.map(veg, function(d){return(d.group)}).keys()

console.log("haha", subgroups);
console.log("values3", veg);
           
         
var xScale = d3.scaleBand()
        .domain([0,10])
        .range([height,0])

var yScale = d3.scaleLinear()
        .domain([10,0])
        .range([0,height])
    
    
           
var x = d3.scaleBand()
.domain(["2020 spinach","2016 spinach","2020 onions","2016 onions","2020 carrots","2016 carrots","2020 avocado","2016 avocado"])
.range([0,width])
.padding([-.2])
svg3.append("g")
.attr("transform", "translate("+(0)+","+(height)+")")
.attr("class", "text")
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-35)")
.style("text-anchor", "end");           

console.log(height)


var y = d3.scaleLinear()
.domain([0,5])
.range([height, 0])
svg3.append("g")
.call(d3.axisLeft(y));

//show the bars
svg3.append("g")
.selectAll("g")
.data(veg)
.enter()
.append("rect")
.attr("width", function(d){return 30})
.attr("height", function(d){return yScale(parseInt(d.Price));})
.attr("fill","orange")
.attr("x", function(d,i){return i*150})
.attr('y', function(d){ return (height - parseInt(y(d.Item))); })
         
    
.on("mouseenter" ,function(veg)
      {
        
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltippp")
        .classed("hidden3",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
    
    d3.select("#Money")
        .text("Cost:"+veg.Price);
        
        
      })//tool tip off
    .on("mouseleave",function()
    {
        d3.select("#tooltippp")    
        .classed("hidden3",true);
    })              

         

var labels = d3.select("#barchart2 svg")
    .append("g")
    .classed("labels", true);
    
    labels.append("text")
    .text("Year Comparison with Vegetables")
    .classed("title", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", margin.top-5)
    
    labels.append("text")
    .text("Variety of Vegetables")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", height+(margin.bottom+margin.top-5))
    
    labels.append("g")
    .attr("transform", "translate(20,"+(margin.top+(height/2))+")")
    .append("text")
    .text("Average Price")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(90)")
         
         
         
     }
var successFCN = function(veg)
{
    console.log("things", veg);
    drawGraph2(veg,labels);
    
}

var failFCN = function(error)
{
    console.log("error",error);
}

var vegPromise = d3.csv("csv/2020.data.csv")
vegPromise.then(successFCN,failFCN);

