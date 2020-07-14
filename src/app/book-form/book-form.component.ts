import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../service/book.service';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Book } from '../model/book';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  saveIcon = faSave;
  bookForm: FormGroup;
  isEditing: boolean = false;
  subjects: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private formBuilder: FormBuilder) {
      
    this.bookForm = formBuilder.group({
      bcode: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
      price: ['', [Validators.required, Validators.min(100), Validators.max(25000)]],
      publishedDate: ['', Validators.required],
      subject: ['', Validators.required]
    });
    this.subjects = ["Personality Developement", "Java","Html","css"];
  }

  get f() {
    return this.bookForm.controls;
  }
  ngOnInit(): void {
    let bcode  = this.activatedRoute.snapshot.params.id;

    if(bcode){
      this.bookService.getById(bcode).subscribe(
        (data) => {this.bookForm.setValue(data); this.isEditing=true;},
        (err) => {console.log(err.message);}
      );
    }
  }
  save(){
    let obr;

    if(this.isEditing){
      obr = this.bookService.modify(this.bookForm.value); //put book
    } else{
      obr = this.bookService.add(this.bookForm.value); //post book
    }


    obr.subscribe(
      (data) =>{this.router.navigateByUrl("/lib");},
      (err) => {console.log(err.message);}
    );
  }

}
