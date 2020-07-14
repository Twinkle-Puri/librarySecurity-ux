import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { faHome, faCartPlus, faList, faBook, faAddressBook } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  brand: string;
  links: any[];

  constructor() {
    this.brand = environment.logo;
    this.links = [
      { icon: faHome, path: 'home', linkText: 'Home' },
      { icon: faBook, path: 'lib', linkText: 'Library' },
      { icon: faAddressBook, path: 'addBook', linkText: 'New Book' }
    ]
  }

  ngOnInit(): void {
  }

}
