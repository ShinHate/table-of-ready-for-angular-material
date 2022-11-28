import {Component, Input} from '@angular/core';
import {IImages} from "../../models/images";
import {DeleteService} from "../../service/delete.service";
import {GetService} from "../../service/get.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})


export class ImageComponent {
  @Input() image: IImages
  @Input() i: number
  @Input() checked: boolean

  constructor(
    public deleteService: DeleteService,
    public getService: GetService
  ) {
  }

  deleteImage(idImage: any, i:number) {
    this.deleteService.deleteImages(idImage, i)
  }

  updateAllComplete() {
    this.checked = this.getService.images != null && this.getService.images.every(t => t.published);
  }
}
