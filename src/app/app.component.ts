import { BarComponent } from './bar/bar.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo1';
  isMouseDown = false;

  @ViewChild('appBar', { static : true}) appBar: BarComponent | undefined;

  onAddNode() {
    this.isMouseDown = false;
    // call child to add new node
    if (this.appBar) {
      this.appBar.addNewNode()
    }
  }
}
