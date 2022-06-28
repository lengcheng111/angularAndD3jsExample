import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';

export class Utils {

    static activeNode: any;

    public static createToolbarResource(rootResource: any, resourceArea: any) {
        const hasToolBar = d3.selectAll('foreignObject').empty();
          if (!hasToolBar) {
            return;
          }
          this.activeNode = rootResource;
          // Create the <foreignObject>:
          let ddiv = resourceArea
            .append('foreignObject')
            // .attr("x", d.offsetX + 30)
            // .attr("y", d.offsetY - 90)
            .attr('transform', Utils.setAttrTransform(rootResource))
            .attr('width', 60)
            .attr('height', 280)
            .append('xhtml:div') // <<<---- xhtml: prefix!
            .classed('jss181', true);
    
        Utils.addEditToolbarButton(ddiv);
        Utils.addLinkedToolbarButton(ddiv, resourceArea);
    }

    public static drawLink(resourceArea: any) {
        const id = uuidv4();
        const rootG = resourceArea.append('g').attr('id', id); // .attr('transform', this.setAttrTransform(this.activeNode))
        // create g-cell item
        const gCell = rootG.append('g').attr('cursor', 'cell');
        gCell.append('path').attr('stroke-width', 2).attr('stroke', 'transparent')
             .attr('fill', '#5a48e0')
             .attr('stroke', '#5a48e0')
             .attr('stroke-linecap', 'butt')
             .attr('stroke-linejoin', 'mitter')
             .attr('pointer-events', 'stroke')
             .attr('d', 'M 25 25 L 75 25 L 75 75 Z');
        // TODO: for higlinght line
        // gCell.append('path').attr('stroke-width', 1).attr('stroke', 'transparent')
        //      .attr('fill', 'transparent')
        //      .attr('stroke-linecap', 'butt')
        //      .attr('stroke', '#5a48e0')
        //      .attr('stroke-linejoin', 'mitter')
        //      .attr('pointer-events', 'stroke')
        //      .attr('d', 'M+200,160L-10,160');

        // TODO: implement move group later
        // const gMove = rootG.append('g').attr('cursor', 'move').style('outline', '0px');
        // const gMove1 = gMove.append('g');
        // gMove1.append('circle').attr('id', `${id}_startPoint`)
        //       .attr('cx', 100)
        //       .attr('cy', 100)
        //       .attr('r', 17)
        //       .attr('stroke', '#5a48e0')
        //       .attr('stroke-width', 2)
        //       .attr('opacity', 0)
        //       .attr('fill', '#5a48e0');
        // gMove1.append('rect').attr('id', `${id}_startPoint`)
        //       .attr('x', 100)
        //       .attr('y', 100)
        //       .attr('width', 10)
        //       .attr('height', 10)
        //       .attr('fill', '#fff')
        //       .attr('stroke', '#000')
        //       .attr('stroke-width', 1);
        // const gMove2 = gMove.append('g');
        // gMove2.append('circle').attr('id', `${id}_endPoint`)
        //       .attr('cx', 100)
        //       .attr('cy', 100)
        //       .attr('r', 17)
        //       .attr('stroke', '#5a48e0')
        //       .attr('stroke-width', 2)
        //       .attr('opacity', 0)
        //       .attr('fill', '#5a48e0');
        // gMove2.append('polygon').attr('id', `${id}_endPoint`)
        //       .attr('stroke', '#000')
        //       .attr('shape-rendering', 'geometricPrecision')
        //       .attr('stroke-linejoin', 'round')
        //       .attr('stroke-width', 1)
        //       .attr('fill', '#000')
        //       .attr('transform', 'rotate(0 -4150 460)')
        //       .attr('points', '-200,424 -200,430 -200,436 -200,430 -200,424');
    }

    public static addEditToolbarButton(container: any) {
        const editButton = container
        .append('xhtml:button')
        .classed(
          'MuiButtonBase-root MuiFab-root MuiFab-sizeSmall MuiFab-primary',
          true
        );
      editButton.append('xhtml:span').attr('class', 'MuiTouchRipple-root');
      const buttonSvg = editButton
        .append('span')
        .attr('class', 'MuiFab-label')
        .append('svg')
        .attr('class', 'MuiSvgIcon-root')
        .attr('viewBox', '0 0 24 24');
      buttonSvg
        .append('path')
        .attr(
          'd',
          'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
        );
        editButton.on('click', function(d: any) {
            console.log('edit button click', d);
        });
    }

    public static addLinkedToolbarButton(container: any, resourceArea: any) {
        const linkedButton = container
        .append('xhtml:button')
        .classed(
          'MuiButtonBase-root MuiFab-root MuiFab-sizeSmall MuiFab-primary',
          true
        );
      linkedButton.append('xhtml:span').attr('class', 'MuiTouchRipple-root');
      const buttonSvg = linkedButton
        .append('span')
        .attr('class', 'MuiFab-label')
        .append('svg')
        .attr('class', 'MuiSvgIcon-root')
        .attr('viewBox', '0 0 24 24');
      buttonSvg
        .append('path')
        .attr(
          'd',
          'M16.01 11H4v2h12.01v3L20 12l-3.99-4z'
        );
        const me = this as any;
        linkedButton.on('click', function(d: any) {
            console.log('linked button click', container);
            me.drawLink(resourceArea);
        });
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