import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../photo/photo.model';

@Pipe({
  name: 'filterByDescription'
})
export class FilterByDescriptionPipe implements PipeTransform {

  transform(photos: Photo[], descriptionQuery: string): Photo[] {
    descriptionQuery = descriptionQuery.trim().toLowerCase();

    if (descriptionQuery) {
      //Se houver algum texto na query, aplico o filtro no array de photos original
      return photos.filter(photo => photo.description.toLowerCase().includes(descriptionQuery));
    } else {
      //Se não houver uma query, retorno o array de photos original
      return photos;
    }
  }

}
