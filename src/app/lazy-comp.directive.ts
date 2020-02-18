import { ComponentFactoryResolver, ComponentRef, Directive, EventEmitter, Input, Type, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[lazyComp]'
})
export class LazyCompDirective {
  private _inputs;
  private _outputs;
  private subscription = new Subscription();

  @Input('lazyComp') set comp(type: Type<any>) {
    // TODO: Support components replacment
    if (type) {
      const factory = this.resolver.resolveComponentFactory(type);
      this.compRef = this.vcr.createComponent(factory);
      this.refreshInputs(this._inputs);
      Object.keys(this._outputs).forEach(output => {
        this.subscription.add((this.compRef.instance[output] as EventEmitter<any>).subscribe(this._outputs[output]));
      });
    }
  }

  @Input() set inputs(data) {
    if (this.compRef) {
      this.refreshInputs(data);
      this.compRef.hostView.detectChanges();
    } else {
      this._inputs = data;
    }
  }

  @Input() set outputs(data) {
    this._outputs = data;
  }

  private compRef: ComponentRef<any>;

  constructor(private vcr: ViewContainerRef, private resolver: ComponentFactoryResolver) {
  }

  private refreshInputs(inputs) {
    Object.keys(inputs).forEach(inputName => this.compRef.instance[inputName] = inputs[inputName]);
  }

  ngOnDestroy() {
    this.compRef && this.compRef.destroy();
    this.compRef = null;
    this.subscription.unsubscribe();
  }
}
