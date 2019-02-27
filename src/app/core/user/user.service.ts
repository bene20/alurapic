import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private tokenService: TokenService) {
    // Preciso acionar manualmente o decodeAndNotify() no
    // construtor para o caso em que fecho a aplicação e a abro novamente. Nesse
    // caso, o setToken não seria acionado e, portanto, não acionaria o decodeAndNotify.
    if (this.tokenService.hasToken()) {
      this.decodeAndNotify();
    }

   }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    //console.log("Token JWT recebido: " + token);

    const user = jwt_decode(token) as User; // 'as' aqui está fazendo um casting,
                                            // pois tenho certeza que o conteúdo do Token é um tipo 'User'
    this.userSubject.next(user);
  }
}
