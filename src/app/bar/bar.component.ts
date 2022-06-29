import { Utils } from './../d3/node-template';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  private data = [
    { Framework: 'Vue', Stars: '166443', Released: '2014' },
    { Framework: 'React', Stars: '150793', Released: '2013' },
    { Framework: 'Angular', Stars: '62342', Released: '2016' },
    { Framework: 'Backbone', Stars: '27647', Released: '2010' },
    { Framework: 'Ember', Stars: '21471', Released: '2011' },
  ];
  svg: any;
  resourceArea: any;
  

  constructor() {}

  ngOnInit(): void {
    this.createSvg();
    this.drawNode(this.data);
  }

  private createSvg(): void {
    this.svg = d3
      .select('div#bar')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', '#f3f4f5')
      .attr('preserveAspectRatio', 'xMidYMid meet');
  }

  public addNewNode() {
    // const rootG = this.componentArea.append('g').attr('class', 'jss180').attr('tabindex', 0).attr('pointer-events', 'auto');
    const rootResource = this.resourceArea
      .append('g')
      .attr('class', 'jss368')
      .attr('transform', 'translate(470, 110)')
      .attr('opacity', 1); //.attr('pointer-events', 'visiblePainted')
    const gSingleMom = rootResource.append('g');
    gSingleMom
      .append('rect')
      .attr('width', 60)
      .attr('height', 60)
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr('class', 'jss369');
    const rootGG1 = gSingleMom
      .append('g')
      .attr('transform', 'translate(5, 5)')
      .append('svg')
      .attr('viewBox', '0 0 50 50')
      .attr('width', 50)
      .attr('height', 50);
    rootGG1
      .append('use')
      .attr(
        'href',
        '#AWS--Compute--_Instance--Amazon-EC2_A1-Instance_light-bg'
      );
    // TODO: keep genericNode for handle later
    // https://stackoverflow.com/questions/29541520/how-to-access-previous-sibling-of-this-when-iterating-over-a-selection
    // const genericNode = this.resourceArea
    //   .append('g')
    //   .attr('id', 'generic-node')
    //   .attr('class', 'jss368')
    //   .attr('transform', 'translate(170, 310)');
    // genericNode
    //   .append('rect')
    //   .attr('width', 60)
    //   .attr('height', 60)
    //   .attr('fill', 'transparent')
    //   .attr('stroke', '#581bf5')
    //   .attr('stroke-width', 0)
    //   .attr('stroke-opacity', 1);
    // const g1Svg = g1.append('g').attr('transform', 'translate(5, 5)').append('svg').attr('viewBox', '0 0 50 50').attr('width', 50).attr('height', 50);
    // g1Svg.append('use').attr('href', '#AWS--Compute--_Instance--Amazon-EC2_A1-Instance_light-bg');

    // handle drag event for resourceNode
    rootResource.call(Utils.dragResourceNode(rootResource, this.resourceArea));
    rootResource.on('click', () => Utils.createToolbarResource(rootResource, this.resourceArea));
  }

  private drawNode(data: any[]): void {
    this.addIcons();
    this.drawGrid();
    // this.drawBar(data);

    this.appendComponent();
  }

  private drawGrid() {
    const drawingGrid = this.svg.append('g').attr('id', 'drawing-grid');
    drawingGrid.on('click', function (d: any) {
      d3.selectAll('foreignObject').remove();
    });

    drawingGrid
      .append('rect')
      .attr('id', 'panner')
      .attr('x', 252.51047120418843)
      .attr('y', 1649.4525353556528)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', 'none')
      .attr('opacity', 1)
      .attr('fill', 'rgb(251, 251, 251)');

    const fillWhite = drawingGrid.append('g').attr('fill', 'white');

    const defs = fillWhite.append('defs');

    defs
      .append('pattern')
      .attr('id', 'smallSquareGrid')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 10)
      .attr('height', 10)
      .append('path')
      .attr('d', 'M 10 0 L 0 0 0 10')
      .attr('stroke', '#c7c7c7')
      .attr('stroke-width', 0.3);

    const pattern2 = defs
      .append('pattern')
      .attr('id', 'squareGrid')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 40)
      .attr('height', 40);

    pattern2
      .append('rect')
      .attr('width', 40)
      .attr('height', 40)
      .attr('fill', 'url(#smallSquareGrid)');

    pattern2
      .append('path')
      .attr('d', 'M 40 0 L 0 0 0 40')
      .attr('fill', 'none')
      .attr('stroke', '#ededed')
      .attr('stroke-width', 2);

    fillWhite
      .append('rect')
      .attr('x', 252.51047120418843)
      .attr('y', 1649.4525353556528)
      .attr('id', 'grid')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('opacity', 1)
      .attr('fill', 'url(#squareGrid)');
  }
   
  private addIcons() {
    const svgSprite = this.svg.append('svg');
    const symbol = svgSprite
      .append('symbol')
      .attr('id', 'AWS--Compute--_Instance--Amazon-EC2_A1-Instance_light-bg');
    const g = symbol.append('g').attr('id', 'ahaWorking');
    g.append('path')
      .attr('class', 'ahacls-152699482124763654285')
      .attr(
        'd',
        'm23 30.09-.75-2.43h-3.63l-.72 2.43h-2.42l3.75-10.65h2.54l3.74 10.65zM19.11 26h2.67l-1.35-4.45zm10.66 4.09v-8.4l-2.77.86V20.8l3-1.36h2v10.65z'
      );
    g.append('path')
      .attr('class', 'ahacls-152699482124763654285')
      .attr('d', 'M44.31 44.31H5.69V5.69h38.62zm-36.62-2h34.62V7.69H7.69z');
    g.append('path')
      .attr('class', 'ahacls-152699482124763654285')
      .attr(
        'd',
        'M11.21 1h2v5.69h-2zm6.27 0h2v5.69h-2zm6.28 0h2v5.69h-2zm6.28 0h2v5.69h-2zm6.28 0h2v5.69h-2zM11.21 43.31h2V49h-2zm6.27 0h2V49h-2zm6.28 0h2V49h-2zm6.28 0h2V49h-2zm6.28 0h2V49h-2zm6.99-31.86H49v2h-5.69zm0 6.27H49v2h-5.69zm0 6.28H49v2h-5.69zm0 6.28H49v2h-5.69zm0 6.27H49v2h-5.69zM1 11.45h5.69v2H1zm0 6.27h5.69v2H1zM1 24h5.69v2H1zm0 6.28h5.69v2H1zm0 6.27h5.69v2H1z'
      );
    return svgSprite;
  }

  private appendComponent() {
    this.resourceArea = this.svg
      .append('g')
      .attr('pointer-events', 'auto')
      .attr('class', 'jss180');
  }
}
