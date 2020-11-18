var successFCN=function(values){
    console.log("values",values)
initGraph(valuess)
}
var failFCN=function(error{
                      console.log("error",error)
                      })
                      
var Promise=d3.csv("../data.cvs.csv")
.then(successFCN,failFCN);
var Drawsomething=function(values,target,graphDim,xScale,yScale,colorScale)
{
    var bar= target
    .selectAll("g")
    .data()
    .enter()
    .append("g")
    
    
}

var initGraph=function(Data)
{
    var screen={width:1500,height:500}
    var margins={left:60,right:60,top:30,bottom:30}
    var graph={
        width:screem.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom
    }
d3.select("Interaction")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target= d3.select("#Interaction")
    .append("g")
    .attr("id","#graph")
.attr("transform,"    
    }
