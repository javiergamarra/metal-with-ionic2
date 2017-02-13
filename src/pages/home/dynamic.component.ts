import {
  Component,
  NgModule,
  ViewContainerRef,
  Compiler,
  ReflectiveInjector,
  Directive,
  ElementRef,
  AfterViewInit,
  OnInit
} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {IonicModule} from "ionic-angular";

declare let metal: any;

@Directive({
  selector: 'dynamic-component',
})
export class DynamicComponent implements AfterViewInit {

  data = '3';
  rows = ['sd', 'asd'];

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler, private el: ElementRef) {
  }

  ngAfterViewInit(): void {

    let login = document.getElementById('login');
    console.log(login)

    // this.data = `<ion-item ngDefaultControl>
    //   	<ion-label ngDefaultControl>B</ion-label>
    //  	<ion-input type="text" name="title" ngDefaultControl></ion-input>
    //  </ion-item>`;

    this.data = `<div *ngFor="let a of rows">{{a}}</div>`;

    // let component = new metal.LiferayLogin({element: login});

    const pipe = 'json';

    console.log(login)
    // console.log(this.value.nativeElement);

    @Component({
      selector: 'dynamic-comp',
      template: '<ion-item ngDefaultControl> <ion-label ngDefaultControl>Todo</ion-label> <ion-input type="text" name="title" ngDefaultControl></ion-input> </ion-item><p [innerHTML]="data">a</p>1 {{{"a": "2"} | ' + pipe + ' }} {{data}} 2  <div id="test" #mytest>  </div>'
    })
    class DynamicComponent implements AfterViewInit, OnInit {
      ngOnInit(): void {
        new metal.LiferayLogin({element: '#test'});
      }

      ngAfterViewInit(): void {
        let test = document.getElementById('test');
        console.log(test)
      }
    }

    @NgModule({
      imports: [
        IonicModule.forRoot(BrowserModule)
      ],
      declarations: [
        DynamicComponent
      ],
    })
    class DynamicModule {
    }

    this.compiler.compileModuleAndAllComponentsAsync(DynamicModule)
      .then(({ngModuleFactory, componentFactories}) => {
        const compFactory = componentFactories.find(x => x.componentType === DynamicComponent);
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        const cmpRef = this.vcRef.createComponent(compFactory, 0, injector, []);
        cmpRef.instance.data = this.data
      });
  }

  // let component = new metal.LiferayLogin({element: '#login'});
  // console.log(component);
  // component.addListener('loginError', err => {
  //   console.log('Error')
  // });
  // component.addListener('loginSuccess', x => {
  //   console.log(JSON.stringify(x))
  // });

}
