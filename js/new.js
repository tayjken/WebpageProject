var margin = {top: 50, bottom: 100, right:30, left: 70},
    width = 1200 - margin.left - margin.right,
    height = 600- margin.top - margin.bottom;



var svg2 = d3.select("#barchart3")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate("+margin.left+","+margin.top+")");

       
       
var drawGraph3 =function(organic){
    var subgroups = organic.columns.slice(0)
    
var groups = d3.map(organic, function(d){return(d.group)}).keys()

console.log("haha", subgroups);
console.log("values3", organic);
           
         
var xScale = d3.scaleBand()
        .domain([0,10])
        .range([height,0])

var yScale = d3.scaleLinear()
        .domain([10,0])
        .range([0,height])
    
          

var x = d3.scaleBand()
.domain(["apple pears","organis apple pears","avocado","organic avocado","blackberries","organic blackberries","blueberries","organic blueberries","cranberries","organic cranberries","limes","organic limes"])
.range([0,width])
.padding([.2])
svg2.append("g")
.attr("transform", "translate("+(0)+","+(height)+")")
.attr("class", "text")
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-25)")
.style("text-anchor", "end");           

console.log(height)


var y = d3.scaleLinear()
.domain([0,5])
.range([height,0])
svg2.append("g")
.call(d3.axisLeft(y));


svg2.append("g")
.selectAll("g")
.data(organic)
.enter()
.append("rect")
.attr("width", function(d){return 15})
.attr("height", function(d){return yScale(parseInt(d.Price));})
.attr("fill","purple")
.attr("x", function(d,i){return i*90})
.attr('y', function(d){ return xScale(height - parseInt(y(d.Price))); })
         

.on("mouseenter" ,function(organic)
      {
        
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltiP")
        .classed("hidden2",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
    
    d3.select("#amount")
        .text("Amount: $"+organic.Price);

        
        
})
    
    .on("mouseleave",function()
    {
        d3.select("#tooltiP")    
        .classed("hidden2",true);
    })              

         

var labels = d3.select("#barchart3 svg")
    .append("g")
    .classed("labels", true);
    
    labels.append("text")
    .text("Organic vs Nonorganic Prices")
    .classed("title", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", margin.top-5)
    
    labels.append("text")
    .text("Variety of Crops")
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
var successFCN = function(organic)
{
    console.log("items", organic);
    drawGraph3(organic,labels);
    
}

var failFCN = function(error)
{
    console.log("error",error);
}

var organicPromise = d3.csv("csv/organic.data.csv")
organicPromise.then(successFCN,failFCN);


