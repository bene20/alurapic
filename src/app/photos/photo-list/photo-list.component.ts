import { Component, OnInit, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  filter: string = '';

  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private photoService: PhotoService) {}

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params['userName'];
    this.photos = this.activatedRoute.snapshot.data['photos'];
    }

    load() {
      this.photoService
        .listFromUserPaginated(this.userName, ++this.currentPage)
        .subscribe(photos => {
          this.filter = '';

          //A linha abaixo utiliza a técnica de desctructuring, e é equivalente
          //a this.photos.push(photos[0], photos[1], photos[1], photos[1]);
          //this.photos.push(...photos);

          //A linha acima precisou ser alterada pela abaixo pois o mecanismo de detecção
          //de mudanças não detecta incluisão de novos itens no array photos. Ele só
          //detecta mudanças de referências. Na linha abaixo modificamos a referência de
          //photos e, com isso, o mecanismo de detecção de mudanças do angular detetcta a mudança e a página é atualizada.
          this.photos = this.photos.concat(photos);

          if (photos.length === 0) { this.hasMore = false; }
        });
    }
}
