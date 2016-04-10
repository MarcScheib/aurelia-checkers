import dragula from 'dragula';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import {PieceDroppedEvent} from './events';

@inject(EventAggregator)
export class DragAndDrop {
  eventAggregator;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;

    let dragApi = dragula({
      isContainer: el => {
        if (!el) {
          return false;
        }
        if (dragApi.dragging) {
          return el.classList.contains('drop-target');
        }
        return el.classList.contains('drag-source');
      },
      revertOnSpill: true,
      delay: 200
    });

    this.trackDrop(dragApi);
    this.trackDraggingState(dragApi);
  }

  trackDrop(dragApi) {
    dragApi.on('drop', (el, container, source) => {
      let piece = source.parentElement.au.piece.viewModel.piece;
      let square = container.parentElement.parentElement.au.square.viewModel.square;
      dragApi.cancel();
      this.eventAggregator.publish(new PieceDroppedEvent(piece, square));
    });
  }

  trackDraggingState(dragApi) {
    let handle;
    dragApi.on('drag', () => {
      handle = setTimeout(() => this.dragging = true, 500);
    });
    dragApi.on('dragend', () => {
      clearTimeout(handle);
      this.dragging = false;
    });
  }
}
