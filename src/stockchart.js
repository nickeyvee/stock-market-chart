'use strict';

const $ = require("jquery");
const d3 = require('d3');

function plotStock(data) {

   const vis = d3.select("#visualisation"),
      WIDTH = 1150,
      HEIGHT = 300,
      MARGINS = {
         top: 20,
         right: 20,
         bottom: 20,
         left: 50
      };

   /**
    * This will be our timescale.
    What we are doing here is converting our ISO dates implicitly
    into numbers represented in milliseconds. This will allow us
    to actually plot plot our numbers on a graph.
    */

   const xScale = d3.time.scale()
      .range([MARGINS.left, WIDTH - MARGINS.right])
      .domain([new Date(data.date_left.ISO), new Date(data.date_right.ISO)]);

   // console.log([new Date(data.date_left.ISO), new Date(data.date_right.ISO)])

   const yScale = d3.scale
      .linear()
      .range([HEIGHT - MARGINS.top, MARGINS.bottom])
      .domain([data.price_bottom, data.price_top]);

   // console.log([data.price_bottom, data.price_top]);

   const xAxis = d3.svg.axis()
      .scale(xScale);

   const yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");

   vis.append("svg:g")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);

   vis.append("svg:g")
      .call(yAxis);

   vis.append("svg:g")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);

   // ==== APPLYING A LINE ====

   var lineGen = d3.svg.line()
      .x(d => {
         return xScale(new Date(d.ISO))
      })
      .y(d => {
         return yScale(d.price)
      });

   vis.append('svg:path')
      .attr('d', lineGen(data.date_arr))
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
   console.log("shit's not broke?");
}

function resetChart() {
   d3.selectAll("path").remove();
   d3.selectAll("g").remove();
}

module.exports = {
   plotStock,
   resetChart
}