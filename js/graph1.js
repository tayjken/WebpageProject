var margin = {top: 40, bottom: 100, right:30, left: 70},
    width = 400 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
var svg = d3.select("#barchart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate("+margin.left+","+margin.top+")");



       var initGraph1 =function(First){
    var subgroups = First.columns.slice(0)
    
var groups = d3.map(First, function(d){return(d.group)}).keys()

console.log("valuegggs", subgroups);
console.log("values3", First);
           
           
           
  var xScale = d3.scaleBand()
        .domain([0,5])
        .range([0,width])

    var yScale = d3.scaleLinear()
        .domain([0,5])
        .range([height,0])
    
    
    
//name           
var namesValus = [];
          
First.forEach(gettingName);

           
function gettingName(item, index) {
  namesValus.push(item.Item) 
}

console.log("values4", namesValus);
           
//add X
var x = d3.scaleBand()
.domain(namesValus)
.range([0,width])
.padding([0.2])
svg.append("g")
    .attr("class", "text")
.attr("transform", "translate("+(0)+","+(height)+")")
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");
           console.log(height);
           

     
            
           
//add y
var y = d3.scaleLinear()
.domain([0,5])
.range([height, 0])
svg.append("g")
.call(d3.axisLeft(y));

//show the bars
svg.append("g")
.selectAll("g")
.data(First)
.enter()
.append("rect")
.attr("width", function(d){return 60})
.attr("height", function(d){return yScale(parseInt(d.Price));})
.attr("fill","blue")
.attr("x", function(d,i){return i*75.6})
.attr('y', function(d){ return (height - parseInt(y(d.Price))); })
           
           
//tooltip
.on("mouseenter" ,function(First)
      {
        
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
    
        d3.select("#attempted")
        .text("Attempted:"+First.Item);
        d3.select("#made")
        .text("Made:"+extraPoint.Price);
        
        
        
      })//tool tip off
    .on("mouseleave",function()
    {
        d3.select("#tooltip")    
        .classed("hidden",true);
    })

         
 var labels = d3.select("#barchart")
    .append("g")
    .classed("labels", true);
    
    labels.append("text")
    .text("item")
    .classed("title", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+(width/2))
    .attr("y", margin.top-5)
    
    labels.append("text")
    .text("price")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", height+(margin.bottom+margin.top-5))
    
    labels.append("g")
    .attr("transform", "translate(20,"+(margin.top+(height/2))+")")
    .append("text")
    .text("y")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(90)")
}


var successFCN = function(values)
{
    console.log("values graph",values);
    
var First = values[0]
var Opinion = values[1]
    initGraph1(First)
}

var failFCN = function(error)
{
    console.log("error",error);
}

var FirstPromise = d3.csv("../csv/other.data.csv")
var PerPromise = d3.csv("../csv/2020.data.csv")
var promises=[FirstPromise,PerPromise]
Promise.all(promises).then(successFCN,failFCN);
