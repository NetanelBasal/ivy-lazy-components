import { Component, ComponentFactoryResolver, ComponentRef, Injector, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FooComponent } from './foo/foo.component';
import { BarComponent } from './bar/bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('vcr', { read: ViewContainerRef }) vcr: ViewContainerRef;
  title = 'exploreivy';
  show = false;
  foo: Promise<Type<FooComponent>>;
  fooInjector: Injector;
  barRef: ComponentRef<BarComponent>;

  bar;
  inputs = {
    title: 'Hello'
  }
  outputs = {
    titleChanges: (v) => {
      console.log(v);
    }
  }
  constructor(private resolver: ComponentFactoryResolver,
              private injector: Injector) {
  }

  updateInputs() {
    this.inputs = {
      title: 'Changed'
    }
  }

  t() {
    this.bar = import(`./bar/bar.component`).then(({ BarComponent}) => BarComponent);
  }

  async loadBar() {
    if (!this.barRef) {
      const { BarComponent } = await import(`./bar/bar.component`);
      const factory = this.resolver.resolveComponentFactory(BarComponent);
      this.barRef = this.vcr.createComponent(factory);
      this.barRef.instance.title = 'Changed';
      this.barRef.instance.titleChanges.subscribe(console.log);
    }
  }

  loadFoo() {
    if (!this.foo) {
      this.fooInjector = Injector.create({
        providers: [{
          provide: 'fooData',
          useValue: { id: 1 }
        }],
        parent: this.injector
      });
      this.foo = import(/* webpackChunkName: 'foo' */`./foo/foo.component`).then(({ FooComponent }) => FooComponent);

      // this.foo = import(/* webpackPrefetch: true */`./foo/foo.component`).then(({ FooComponent }) => FooComponent);
    }
  }

  ngOnDestroy() {
    this.barRef = null;
  }

}
