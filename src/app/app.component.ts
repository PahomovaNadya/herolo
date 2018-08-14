import { Component } from '@angular/core';
import { BooksService } from './../services/books.service';
import { IPbook } from './bookIntr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BooksService]
})
export class AppComponent {
  books: Array<IPbook> = [];
  bookInfoN: IPbook[] = [];
  bookInfoD: IPbook[] = [];
  countArrPage: number = 2;
  itensCount: string[] = ["1","2","4","6","8","10"];
  countArr: number = 100;
  isDivVisible = false;
  selectBook: IPbook[] = [];

  constructor(private booksService: BooksService) {}
  ngOnInit() {
    window.location.href="#close";
    localStorage.removeItem('currentBooks');
    this.booksService.getJSON().subscribe(books => {
      localStorage.setItem('currentBooks', JSON.stringify(books));
      this.bookInfoD = JSON.parse(localStorage.getItem('currentBooks'));
      this.countArr = books.length; 
      this.bookInfoN = this.workPaginator(books, 0, this.countArrPage);
      this.isDivVisible = (books.length>0) ? true : false;
   });
  }
  workPaginator(obj: IPbook[], start: number, count: number): IPbook[] {
    let newBookArr: Array<IPbook> = [];
    let i=0;
    let numSrt = +start + (+count);
    obj.forEach((job) => {
      if ( i >= +start && i < numSrt) {
        newBookArr.push(obj[i]);
      }
      i++;
    }); 
    return newBookArr;
  }
  paginate(event) {
    this.bookInfoN = this.workPaginator(this.bookInfoD, event.first, event.rows);
  }
  selectItemCount(event: number){
    this.countArrPage = event;
    this.bookInfoN = this.workPaginator(this.bookInfoD, 0, event);
  }
  editBookApp(idBook: string){
    this.selectBook = this.bookInfoN.filter(g => {
      if (g.id === idBook)
        return g;
      return false;
    });
    this.selectBook[0]["act"] = "edit";
  }
  addEditResult(itemResult: IPbook[], act:string) {
    window.location.href="#close";
    this.bookInfoD = this.buildArray(act ,itemResult, JSON.parse(localStorage.getItem('currentBooks')));
    localStorage.setItem('currentBooks', JSON.stringify(this.bookInfoD));
    this.bookInfoN = this.workPaginator(this.bookInfoD, 0, this.countArrPage);
  }
  deleteResult(itemId: string) {
    let itemDelete = this.bookInfoN.filter(g => {
      if (g.id === itemId)
      return g;
      return false;
    });
    this.bookInfoD = this.buildArray("delete" ,itemDelete, this.bookInfoD);
    localStorage.setItem('currentBooks', JSON.stringify(this.bookInfoD));
    this.bookInfoN = this.workPaginator(this.bookInfoD, 0, this.countArrPage);
    this.countArr = this.bookInfoD.length; 
  }
  addResult() {
    this.selectBook[0] = this.bookInfoD[0];
    this.selectBook[0]["act"] = "add";
    this.selectBook[0]["id"] = "";
    this.selectBook[0]["title"] = "";
    this.selectBook[0]["author"] = "";
    this.selectBook[0]["mydate"] = "";
    this.selectBook[0]["description"] = "";
    this.selectBook[0]["imagesmallurl"] = "http://www.naddim.com/nadya/portfolio/images/notFound.jpg";
    this.selectBook[0]["imagebigurl"] = "http://www.naddim.com/nadya/portfolio/images/notFound.jpg";
    window.location.href="#openModal";
  }
  buildArray(str, items, books): IPbook[] {
    switch(str) {
      case "edit":
        for(let i=0; i<books.length; i++){
          if(books[i].id == items.id){
            books[i] = items;
          }
        }
        break;
      case "add":
        books.push(items);
        break;
      case "delete":
        for(let i=0; i<books.length; i++){
          if(books[i].id == items[0].id){
            books.splice(i,1); 
          }
        }
        break;
    }
    return books;
  }
}