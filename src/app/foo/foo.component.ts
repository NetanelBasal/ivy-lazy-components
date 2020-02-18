import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss']
})
export class FooComponent implements OnInit {
  control = new FormControl();

  constructor(@Inject('fooData') data) {
    console.log(data);
  }

  ngOnInit(): void {
  }

}

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [FooComponent]
})
class FooModule {
}
