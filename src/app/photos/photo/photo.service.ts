import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Photo } from './photo.model';

const API : string = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  public listFromUser(userName: string): Observable<Photo[]> {
    return this.http
      .get<Photo[]>(API + '/' + userName + '/photos');
  }

  public listFromUserPaginated(userName: string, page: number): Observable<Photo[]> {
    const params = new HttpParams().append('page', page.toString());
    return this.http
      .get<Photo[]>(API + '/' + userName + '/photos', {params: params});
  }

}
