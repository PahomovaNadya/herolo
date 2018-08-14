import { Component, Input } from '@angular/core';
import { AppComponent } from './../app.component';

@Component({
    selector: 'app-book-list',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent {
  @Input() item;
  constructor(private appPage: AppComponent) { }
  editBook(idBook){
    window.location.href="#openModal";
    this.appPage.editBookApp(idBook);
  }
  deleteBook(idBook) {
    if (confirm('Do you want to delete the book?')) {
      this.appPage.deleteResult(idBook);
    }
  }
}