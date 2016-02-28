import {bindable, customElement, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import {DragAndDrop} from './drag-and-drop';

@customElement('square')
@inject(EventAggregator, DragAndDrop)
export class SquareElement {
  @bindable
  square;

  constructor(eventAggregator, dragAndDrop) {
    this.eventAggregator = eventAggregator;
    this.dragAndDrop = dragAndDrop;
  }
}
