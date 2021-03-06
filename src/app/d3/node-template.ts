import { ResourceAndLink } from './resource-link-id';
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';
import { D3EventHandler } from './d3-event';

export class Utils {

    // https://bl.ocks.org/mbostock/4566102

    static activeNode: any;
    static resourceArea: any;

    static mapSource: ResourceAndLink[] = []; // map id of source resource and the link of itself
    static mapTarget: ResourceAndLink[] = []; // map id of target resource and the link of itself

    public static createToolbarResource(rootResource: any, resourceArea: any) {
      // console.log(resourceArea);
      
      //https://observablehq.com/@mbostock/saving-svg
        // resourceArea.datum(function(d:any) {
        //   // console.log(this);
          
        //   const that = this;
        //   console.log(that.parentNode.innerHTML);
        //   window.localStorage.setItem('demo', that.parentNode.innerHTML)
          
        // })
        const hasToolBar = d3.selectAll('foreignObject').empty();
        if (!hasToolBar) {
          return;
        }
        this.activeNode = rootResource;
        // Create the <foreignObject>:
        let ddiv = resourceArea.append('foreignObject')
          .attr('transform', D3EventHandler.setAttrTransform(rootResource))
          .attr('width', 60)
          .attr('height', 280)
          .append('xhtml:div') // <<<---- xhtml: prefix!
          .classed('jss181', true);

        Utils.addEditToolbarButton(ddiv);
        Utils.addLinkedToolbarButton(ddiv, rootResource, resourceArea);
    }

    public static drawLink(rootResource: any, resourceArea: any) {
        const translateRootResource = rootResource.node().transform.baseVal.getItem(0).matrix as SVGMatrix;
        const widthOfResource = rootResource.node().getBBox().width;
        const heightOfResource = rootResource.node().getBBox().height / 2;
        const idOfResource = rootResource.node().id;
        const d3Path = d3.path();
        const startPosition = [translateRootResource.e + widthOfResource, translateRootResource.f + heightOfResource];
        const endPosition = [translateRootResource.e + 150, translateRootResource.f - 10];
        d3Path.moveTo(startPosition[0], startPosition[1]);
        d3Path.lineTo(endPosition[0], endPosition[1]);

        const idOfLink = uuidv4();

        // add id-link to source-map
        const foundSource = this.mapSource.find(x => x.idSource === idOfResource);
        if (foundSource) {
          foundSource.idLink.push(idOfLink);
          foundSource.type = 's';
        }

        const rootG = resourceArea.append('g').attr('id', idOfLink); // .attr('transform', this.setAttrTransform(this.activeNode))
        // create g-cell item
        const gCell = rootG.append('g').attr('cursor', 'cell');
        const path = gCell.append('path').attr('stroke-width', 2).attr('stroke', 'transparent').attr('id', idOfLink)
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
        endArrow.attr('id', `${idOfLink}_endPoint`)
              .attr('cx', endPosition[0])
              .attr('cy', endPosition[1])
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
        endArrow.call(D3EventHandler.dragEndArrowLinked(idOfLink, d3Path, path));
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

    public static addLinkedToolbarButton(ddiv: any, rootResource: any, resourceArea: any) {
        const linkedButton = ddiv
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
            me.drawLink(rootResource, resourceArea);
        });
    }

    public static createResourceContainer(rootSvg) {
        Utils.resourceArea = rootSvg
          .append('g')
          .attr('pointer-events', 'auto')
          .attr('class', 'jss180');
    }

    public static addNewNode() {
      // const rootG = this.componentArea.append('g').attr('class', 'jss180').attr('tabindex', 0).attr('pointer-events', 'auto');
      const id = uuidv4();
      this.mapSource.push({
        idSource: id,
        idLink: [],
        type: 's'
      } as ResourceAndLink);
      const rootResource = Utils.resourceArea
        .append('g').attr('id', id)
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
      rootResource.call(D3EventHandler.dragResourceNode(rootResource, Utils.resourceArea));
      rootResource.on('click', () => Utils.createToolbarResource(rootResource, Utils.resourceArea));
      rootResource.on('mouseover', function(d: any) {
        const that = this;
        D3EventHandler.mouseOverResourceNode(that);
      });
  
      // this.resourceArea.on('click', function(d) {
      //   const that = this;
      //   console.log(JSON.stringify(that.resourceArea.node()));
        
      // })
    }
}
