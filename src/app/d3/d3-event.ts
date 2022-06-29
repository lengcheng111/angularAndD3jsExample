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
            d3.select(this).attr('transform', 'translate(' + d.x + ',' + d.y + ')');
            D3EventHandler.transformToolBar(rootResource);

        }).on("end", function(d: any) {
            // TODO: if no toolbar resource then create for it, then transform
            Utils.createToolbarResource(rootResource, resourceArea);
            D3EventHandler.transformToolBar(rootResource);
        }); // TODO: handle drag end
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
