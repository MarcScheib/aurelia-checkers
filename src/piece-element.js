import {bindable, customElement, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('piece')
@inject(EventAggregator)
export class PieceElement {
  @bindable
  piece;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }
}
