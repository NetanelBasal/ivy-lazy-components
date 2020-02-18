import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  widgets$: Observable<any>;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.widgets$ = this.dashboardService.getWidgets().pipe(mergeMap((widgets) => {
      return Promise.all(widgets.map(widget => {
        return import(`../widgets/${widget.type}/${widget.type}.component`);
      }))
    }));
  }

}
