import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookEndPoint:string;
  constructor( private client: HttpClient) {
    this.bookEndPoint = environment.bookEndPoint;
   }

   getAll(): Observable<Book[]>{
     return this.client.get<Book[]>(this.bookEndPoint);
   }

   getById(id:number):Observable<Book>{
     return this.client.get<Book>(`{this.bookEndPoint}/${id}`);
   }

   add(book:Book):Observable<Book>{
     return this.client.post<Book>(this.bookEndPoint,book);
   }

   modify(book: Book):Observable<Book>{
     return this.client.put<Book>(this.bookEndPoint,book);
   }
   delete(id:number):Observable<void>{
     return this.client.delete<void>(`${this.bookEndPoint}/${id}`);
   }
}
