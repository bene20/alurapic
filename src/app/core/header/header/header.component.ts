import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../../user/user.model';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$: Observable<User>;

  constructor(userService: UserService) {
    this.user$ = userService.getUser();
  }

  ngOnInit() {
  }

}
