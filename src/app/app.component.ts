import { Component } from '@angular/core';
import { Photo } from './photos/photo/photo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  photos: Photo[] = [
    { url: 'https://osegredo.com.br/wp-content/uploads/2018/07/signo-de-leao-830x450.jpg', description: 'Leão 1'},
    { url: 'https://statig1.akamaized.net/bancodeimagens/7k/26/1s/7k261s08f31s2yk4y38m33y0k.jpg', description: 'Leão 2'}
  ];
}
