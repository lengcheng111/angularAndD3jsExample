import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';
import { D3EventHandler } from './d3-event';

export class Utils {

    // https://bl.ocks.org/mbostock/4566102

    static activeNode: any;

    public static createToolbarResource(rootResource: any, resourceArea: any) {
      // console.log(resourceArea);
      
      //https://observablehq.com/@mbostock/saving-svg
        resourceArea.datum(function(d:any) {
          // console.log(this);
          
          const that = this;
          console.log(that.parentNode.innerHTML);
          window.localStorage.setItem('demo', that.parentNode.innerHTML)
          
        })

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
          .attr('transform', D3EventHandler.setAttrTransform(rootResource))
          .attr('width', 60)
          .attr('height', 280)
          .append('xhtml:div') // <<<---- xhtml: prefix!
          .classed('jss181', true);

        Utils.addEditToolbarButton(ddiv);
        Utils.addLinkedToolbarButton(ddiv, resourceArea);
    }

    public static drawLink(container: any, resourceArea: any) {
        const translateRootResource = container.node().parentNode.transform.baseVal.getItem(0).matrix as SVGMatrix;
        const d3Path = d3.path();
        const startLine = [translateRootResource.e, translateRootResource.f + 130];
        const endLine = [translateRootResource.e + 100, translateRootResource.f + 100];
        d3Path.moveTo(startLine[0], startLine[1]);
        d3Path.lineTo(endLine[0], endLine[1]);

        const id = uuidv4();
        const rootG = resourceArea.append('g').attr('id', id); // .attr('transform', this.setAttrTransform(this.activeNode))
        // create g-cell item
        const gCell = rootG.append('g').attr('cursor', 'cell');
        const path = gCell.append('path').attr('stroke-width', 2).attr('stroke', 'transparent').attr('id', id)
             .attr('fill', '#5a48e0')
             .attr('stroke', '#5a48e0')
             .attr('stroke-linecap', 'butt')
             .attr('stroke-linejoin', 'mitter')
             .attr('pointer-events', 'stroke')
             .attr('d', d3Path);

        // TODO: for higlinght line
        // gCell.append('path').attr('stroke-width', 1).attr('stroke', 'transparent')
        //      .attr('fill', 'transparent')
        //      .attr('stroke-linecap', 'butt')
        //      .attr('stroke', '#5a48e0')
        //      .attr('stroke-linejoin', 'mitter')
        //      .attr('pointer-events', 'stroke')
        //      .attr('d', 'M+200,160L-10,160');

        // TODO: implement move group later
        const gMove = rootG.append('g').attr('cursor', 'move').style('outline', '0px');
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
        const gMove2 = gMove.append('g');
        const endArrow = gMove2.append('circle');
        endArrow.attr('id', `${id}_endPoint`)
              .attr('cx', endLine[0])
              .attr('cy', endLine[1])
              .attr('r', 3)
              .attr('stroke', '#5a48e0')
              .attr('stroke-width', 2)
              .attr('opacity', 1)
              .attr('fill', '#5a48e0');
        endArrow.on('mouseover', function(d: any) {
          const that = this;
          D3EventHandler.toggleCircle(that, true);
        })
        .on('mouseout', function(d: any) {
          const that = this;
          D3EventHandler.toggleCircle(that, false);
        })
        endArrow.call(this.dragEndArrowLinked(id, d3Path, path));
        // gMove2.append('polygon').attr('id', `${id}_endPoint`)
        //       .attr('stroke', '#000')
        //       .attr('shape-rendering', 'geometricPrecision')
        //       .attr('stroke-linejoin', 'round')
        //       .attr('stroke-width', 1)
        //       .attr('fill', '#000')
        //       .attr('transform', 'rotate(0 -4150 460)')
        //       .attr('points', '-200,424 -200,430 -200,436 -200,430 -200,424');
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
        const me = this;
        linkedButton.on('click', function(d: any) {
            me.drawLink(container, resourceArea);
        });
    }


}
