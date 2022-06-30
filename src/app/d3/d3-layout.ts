import * as d3 from 'd3';

export class D3Layout {
    public static drawGrid(rootSvg) {
        const drawingGrid = rootSvg.append('g').attr('id', 'drawing-grid');
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
       
      public static addIcons(rootSvg) {
        const svgSprite = rootSvg.append('svg');
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

}