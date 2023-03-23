import {ChangeDetectionStrategy, Component, HostBinding, HostListener} from '@angular/core';

@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.component.html',
  styleUrls: ['./select-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMenuComponent {
  @HostBinding('class')
  hostClass = 'hidden';

  private skipClick: boolean;

  @HostListener('click', ['$event'])
  hostClick(event: Event): void {
    event.stopPropagation();
  }

  show(): void {
    this.hostClass = '';
    this.skipClick = true;
  }

  @HostListener('window:click')
  hide(): void {
    if (this.skipClick) {
      this.skipClick = false;
      return;
    }
    this.hostClass = 'hidden';
  }
}
