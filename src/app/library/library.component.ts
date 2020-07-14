import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { BookService } from '../service/book.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  editIcon = faEdit;
  deleteIcon = faTrash;
  books: Book[];
  errMsg: string;

  constructor(private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {

    let obr = this.bookService.getAll();
    obr.subscribe(
      (data) => { this.books = data; },
      (err) => {
        this.errMsg = "Unable to fetch data";
        console.log(JSON.stringify(err));
      }
    )
  }
  delete(bcode: number) {
    let obr = this.bookService.delete(bcode);

    obr.subscribe(
      (data) => { this.loadData(); },
      (err) => {
        this.errMsg = `Unable to delete ! please try after sometime
      If Problem persists contact Admin`;
        console.log(JSON.stringify(err));
      }
    );
  }
  details(bcode:number) {
    this.router.navigateByUrl(`/book/${bcode}`);
  }
}



