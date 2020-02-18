import { Component, OnInit } from '@angular/core';
import { BarService } from './bar.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html'
})
export default class BarComponent implements OnInit {

  constructor(private barService: BarService) {
  }

  ngOnInit(): void {
  }

}
