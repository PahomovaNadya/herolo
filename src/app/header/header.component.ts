import { Component } from '@angular/core';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor( private newApp: AppComponent ) { }

  addBook() {
    this.newApp.addResult();
  }
}
