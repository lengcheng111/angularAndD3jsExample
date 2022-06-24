import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
  svg: any;
  componentArea: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

  private createSvg(): void {
    this.svg = d3.select("div#bar")
    .append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .attr('fill', '#f3f4f5')
    .attr('preserveAspectRatio', 'xMidYMid meet');
    // .append("g")
    // .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  public addNewNode() {
    const g = this.componentArea.append('g').attr('id', 'generic-node').attr('class', 'jss366');
    const g1 = g.append('g').attr('transform', 'translate(210, 380)').attr('class', 'jss449').append('g');
    g1.append('rect').attr('width', 60).attr('height', 60).attr('fill', 'white').attr('stroke', 'black').attr('stroke-width', 1.5);
    const g1Svg = g1.append('g').attr('transform', 'translate(5, 5)').append('svg').attr('viewBox', '0 0 50 50').attr('width', 50).attr('height', 50);
    g1Svg.append('use').attr('href', '#AWS--Compute--_Instance--Amazon-EC2_A1-Instance_light-bg');

    var drag = d3
    .drag()
    .subject(d => {
      return d;
    })
    .on("drag", function(d) {
      console.log(d);
      d3.select(this)
        .attr("transform", "translate(" + d.x + "," + d.y + ")");
    });
    g.call(drag);
    g1.call(drag);
    g1Svg.call(drag);

    g.on("click", function(d: any) {
      console.log(d);
      // Create the <foreignObject>:
      let ddiv = g.append("foreignObject") 
      .attr("x", 280) 
      .attr("y", 308) 
      .attr("width", 60)
      .attr("height", 280)         
      .append("xhtml:div") // <<<---- xhtml: prefix!
        .classed("jss181", true)

      const button = ddiv.append("xhtml:button");
      button.append('xhtml:span').attr('class', 'MuiTouchRipple-root');
      const buttonSvg = button.append('span').attr('class', 'MuiFab-label').append('svg').attr('class', 'MuiSvgIcon-root').attr('viewBox', '0 0 24 24');
      buttonSvg.append('path').attr('d', 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z');
    });
    g.on("blur", (event: any) => {
      console.log(event);
      
    })
 
      // var div = fo.append('div')
      //     .append('div')
      //     .attr({'class': 'jss181'});
      // div.append('p')
      //     .attr('class', 'lead')
      //     .html('Holmes was certainly not a difficult man to live with.');
      // div.append('p')
      //     .html('He was quiet in his ways, and his habits were regular. It was rare for him to be up after ten at night, and he had invariably breakfasted and gone out before I rose in the morning.');
      // var foHeight = div[0][0].getBoundingClientRect().height;
      // fo.attr({
      //     'height': foHeight
      // });
      // svg.insert('polygon', '.svg-tooltip')
      //     .attr({
      //     'points': "0,0 0," + foHeight + " " + foWidth + "," + foHeight + " " + foWidth + ",0 " + (t) + ",0 " + tip.w + "," + (-tip.h) + " " + (t / 2) + ",0",
      //         'height': foHeight + tip.h,
      //         'width': foWidth,
      //         'fill': '#D8D8D8',
      //         'opacity': 0.75,
      //         'transform': 'translate(' + (anchor.w - tip.w) + ',' + (anchor.h + tip.h) + ')'
      // });
  }

  private drawBars(data: any[]): void {

    this.addIcons();

    const drawingGrid = this.svg.append("g").attr('id', 'drawing-grid');
    drawingGrid.append('rect')
                .attr('id', 'panner')
                .attr('x', 252.51047120418843)
                .attr('y', 1649.4525353556528)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', 'none')
                .attr('opacity', 1)
                .attr('fill', 'rgb(251, 251, 251)');

    const fillWhite = drawingGrid.append("g").attr("fill", "white")
    
    const defs = fillWhite.append("defs");

    defs.append('pattern')
        .attr('id', 'smallSquareGrid')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 10)
        .attr('height', 10)
        .append('path')
          .attr('d', 'M 10 0 L 0 0 0 10')
          .attr('stroke', '#c7c7c7')
          .attr('stroke-width', 0.3);

    const pattern2 = defs.append('pattern')
        .attr('id', 'squareGrid')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 40)
        .attr('height', 40);

    pattern2.append('rect')
        .attr('width', 40)
        .attr('height', 40)
        .attr('fill', 'url(#smallSquareGrid)');

    pattern2.append('path')
        .attr('d', 'M 40 0 L 0 0 0 40')
        .attr('fill', 'none')
        .attr('stroke', '#ededed')
        .attr('stroke-width', 2);

    fillWhite.append('rect')
        .attr('x', 252.51047120418843)
        .attr('y', 1649.4525353556528)
        .attr('id', 'grid')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('opacity', 1)
        .attr('fill', 'url(#squareGrid)');

    // this.drawBar(data);

    this.appendComponent();
  }

  private drawBar(data: any[]) {
    // Add X axis
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.Framework))
    .padding(0.2);

    var drag = d3
    .drag()
    .subject(d => {
      return d;
    })
    .on("drag", function(d) {
      console.log(d);
      d3.select(this)
        .attr("transform", "translate(" + d.x + "," + d.y + ")");
    });

    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([this.height, 0]);

    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: { Framework: string; }) => x(d.Framework))
    .attr("y", (d: { Stars: d3.NumberValue; }) => y(d.Stars))
    .attr("width", x.bandwidth())
    .attr("height", (d: { Stars: d3.NumberValue; }) => this.height - y(d.Stars))
    .attr("fill", "#d04a35").call(drag);
  }

  private addIcons() {
    const svgSprite = this.svg.append("svg");
    const symbol = svgSprite.append("symbol").attr('id', 'AWS--Compute--_Instance--Amazon-EC2_A1-Instance_light-bg');
    const g = symbol.append('g').attr('id', 'ahaWorking');
    g.append('path').attr('class', 'ahacls-152699482124763654285').attr('d', 'm23 30.09-.75-2.43h-3.63l-.72 2.43h-2.42l3.75-10.65h2.54l3.74 10.65zM19.11 26h2.67l-1.35-4.45zm10.66 4.09v-8.4l-2.77.86V20.8l3-1.36h2v10.65z');
    g.append('path').attr('class', 'ahacls-152699482124763654285').attr('d', 'M44.31 44.31H5.69V5.69h38.62zm-36.62-2h34.62V7.69H7.69z');
    g.append('path').attr('class', 'ahacls-152699482124763654285').attr('d', 'M11.21 1h2v5.69h-2zm6.27 0h2v5.69h-2zm6.28 0h2v5.69h-2zm6.28 0h2v5.69h-2zm6.28 0h2v5.69h-2zM11.21 43.31h2V49h-2zm6.27 0h2V49h-2zm6.28 0h2V49h-2zm6.28 0h2V49h-2zm6.28 0h2V49h-2zm6.99-31.86H49v2h-5.69zm0 6.27H49v2h-5.69zm0 6.28H49v2h-5.69zm0 6.28H49v2h-5.69zm0 6.27H49v2h-5.69zM1 11.45h5.69v2H1zm0 6.27h5.69v2H1zM1 24h5.69v2H1zm0 6.28h5.69v2H1zm0 6.27h5.69v2H1z');
    return svgSprite;    
  }

  private appendComponent() {
    this.componentArea = this.svg.append("g").attr('pointer-events', 'auto').attr('class', 'jss180');
  }

}
