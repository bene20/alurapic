import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoComponent } from './photo/photo.component';
import { PhotoService } from './photo/photo.service';

@NgModule({
  declarations: [PhotoComponent],
  imports: [CommonModule],
  exports: [PhotoComponent]
})
export class PhotosModule {

}
