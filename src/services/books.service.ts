import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BooksService {
  constructor(private http: Http) { }
  public getJSON() {
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=quilting")
    .map(response => response.json())
    .map(response => response.items)
    .map(books =>{
      return books.map(book => {
        let newdate="";
        if(book.volumeInfo.publishedDate){
          let dt = book.volumeInfo.publishedDate.split("-");
          if(dt.length==3) {
            newdate = dt[2]+"/"+dt[1]+"/"+dt[0];
          } else if(dt.length==2) {
            newdate = "01/"+dt[1]+"/"+dt[0];
          } else if(dt.length==1) {
            newdate = "01/01/"+dt[0];
          }
        }
        return{
          id: book.id,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors,
          mydate: newdate,
          description: book.volumeInfo.description,
          imagesmallurl: book.volumeInfo.imageLinks.smallThumbnail,
          imagebigurl: book.volumeInfo.imageLinks.thumbnail
        }
      })
    })
  }
}