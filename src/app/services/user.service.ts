import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { UserData } from '../Common/iusers';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  getEmployeeList(page:number, limit:number): Observable<any> {
    const params = {page: page.toString(), limit: limit.toString()};
    return this._http.get<any>('http://localhost:3000/aliens', {params});
  }

  deleteAlien(id: string){
    return this._http.delete<any>('http://localhost:3000/aliens/' + id)
  }
  
  deleteMulti(Ids: string[]) {
    const URL = `http://localhost:3000/aliens`;
    return this._http.delete(URL, { body: Ids });
  }

}
