import * as d3 from 'd3';

export class Utils {
    public static handleDragResource(rootResource: any) {
        var drag = d3
        .drag()
        .subject((d) => {
          return d;
        })
        .on('drag', function (d) {
          console.log();
          console.log(d3.select('g ~ g').node());
          
          d3.select(this).attr('transform', 'translate(' + d.x + ',' + d.y + ')');
          rootResource.attr('transform', 'translate(' + d.x + ',' + d.y + ')');
        });
    }
}