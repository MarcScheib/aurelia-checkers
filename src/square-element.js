import {bindable, customElement, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('square')
@inject(EventAggregator)
export class SquareElement {
  @bindable
  square;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }
}
