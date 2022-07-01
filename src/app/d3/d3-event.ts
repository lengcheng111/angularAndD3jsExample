import * as d3 from 'd3';
import { Utils } from './node-template';
export class D3EventHandler {

    static selectedLink: any;
    
    static toggleCircle = (that, bigger = true) => {
        d3.select(that).transition()
          .duration(1)
          .attr('r', () => bigger ? 8 : 3);
    }

    public static dragResourceNode = (rootResource: any, resourceArea: any) => {
        return d3.drag().subject((d) => {
            return d;
        })
        .on("start", function() {}) // TODO: handle drag start
        .on('drag', function (d) {
            const translate = 'translate(' + d.x + ',' + d.y + ')';
            d3.select(this).attr('transform', translate);
            D3EventHandler.transformToolBar(rootResource);
            const ids = Utils.mapSource.filter(x => x.type === 's').map(x => x.idLink).forEach(ids => {
                ids.forEach(id => {
                    const d = d3.select('path' + '#' + id).attr('d', translate);
                });
            });
        }).on("end", function(d: any) {
            // TODO: if no toolbar resource then create for it, then transform
            Utils.createToolbarResource(rootResource, resourceArea);
            D3EventHandler.transformToolBar(rootResource);
        }); // TODO: handle drag end
    }

    public static dragEndArrowLinked = (idOfLink, d3Path, path) => {
        console.log(idOfLink);
        console.log(d3Path);
        
        return d3.drag().subject((d) => {
            return d;
        })
        .on("start", function() {
          D3EventHandler.selectedLink = path;
        })
        .on('drag', function (d) {
            d3.select(this)
            .attr('cx', d.x)
            .attr('cy', d.y);
  
            const pt2 = d3.path();
            pt2.moveTo(d3Path._x0, d3Path._y0);
            pt2.lineTo(d.x, d.y);
  
            path.attr('d', pt2);
            
        }).on("end", function(d: any) {
          D3EventHandler.selectedLink = null;
        });
      }

    public static mouseOverResourceNode = (src: any) => {
        if (D3EventHandler.selectedLink) {
            console.log(src);
        }
    }

    public static transformToolBar(rootResource: any) {
        d3.selectAll('foreignObject').attr('transform', this.setAttrTransform(rootResource));
    }

    public static setAttrTransform(rootResource: any) {
        const marginYOfToolbar = 100;
        const translateRootResource = rootResource.node().transform.baseVal.getItem(0).matrix as SVGMatrix;
        return `translate(${translateRootResource.e + 60}, ${translateRootResource.f - marginYOfToolbar})`;
    }

}
