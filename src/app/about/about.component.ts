import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', css: 'card-1', cols: 1, rows: 1 },
          { title: 'Card 2', css: 'card-2', cols: 1, rows: 1 },
          { title: 'Card 3', css: 'card-3', cols: 1, rows: 1 },
          { title: 'Card 4', css: 'card-4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', css: 'card-1', cols: 2, rows: 1 },
        { title: 'Card 2', css: 'card-2', cols: 1, rows: 1 },
        { title: 'Card 3', css: 'card-3', cols: 1, rows: 2 },
        { title: 'Card 4', css: 'card-4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
