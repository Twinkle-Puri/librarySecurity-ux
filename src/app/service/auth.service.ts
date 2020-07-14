import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LibraryUser } from '../model/library-user';
import { map, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginEndPoint:string;
  regEndPoint:string;
  loginStatus:BehaviorSubject<boolean>;

  constructor(private client:HttpClient) { 
    this.loginEndPoint = environment.loginEndPoint;
    this.regEndPoint = environment.regEndPoint;

    if(sessionStorage.getItem("jwt") && sessionStorage.getItem("username")){
      this.loginStatus = new BehaviorSubject<boolean>(true);
    } else {
      this.loginStatus = new BehaviorSubject<boolean>(false);
    }
  }

  login(user:LibraryUser) : Observable<string>{
    return this.client.post(this.loginEndPoint,user).pipe(
      map(
        (data:any) => {
          let token = data.jwtToken;
          sessionStorage.setItem("jwt","Bearer "+ token);
          sessionStorage.setItem("username",user.userName);
          this.loginStatus.next(true);
          return user.userName;
        }
      )
    );
  }
  logout(){
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("username");
    this.loginStatus.next(false);
  }

  isLoggedIn():boolean{
    return (sessionStorage.getItem("jwt")&& sessionStorage.getItem("username"))?true:false;
  }

  register(user:LibraryUser):Observable<string>{
    return this.client.post(this.regEndPoint,user).pipe(
      map(
        (data:any) =>{
          return data.userName;
        }
      )
    );
  }
}
