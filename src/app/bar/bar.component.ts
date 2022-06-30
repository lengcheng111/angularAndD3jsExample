import { D3Saver } from './../d3/d3-saver';
import { Utils } from './../d3/node-template';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { D3Layout } from '../d3/d3-layout';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
 
  rootSvg: any;
  
  constructor() {}

  ngOnInit(): void {
    // const savedGraph = localStorage.getItem('demo');
    // if (savedGraph) {
    //   d3.svg('assets/demo.svg').then(res => {
    //     const body = d3.select('div#bar').node() as any;
    //     if (body) {
    //       body.append(res.documentElement);
    //     }
    //   });
    // } else {
    //   this.createSvg();
    //   this.drawNode(this.data);
    // }

    this.createRootSvg();
    this.drawLayout();
    Utils.createResourceContainer(this.rootSvg);
  }

  private createRootSvg(): void {
    this.rootSvg = d3
      .select('div#bar')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', '#f3f4f5')
      .attr('preserveAspectRatio', 'xMidYMid meet');
  }

  public addNewNode() {
    Utils.addNewNode();
  }

  private drawLayout(): void {
    D3Layout.addIcons(this.rootSvg);
    D3Layout.drawGrid(this.rootSvg);
  }

  saveNode() {
    D3Saver.saveSvg(this.rootSvg);
  }

}
