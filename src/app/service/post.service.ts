import {Injectable} from '@angular/core';
import {IImages} from "../models/images";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs";
import {GetService} from "./get.service";


@Injectable({
  providedIn: 'root',
})

export class PostService {

  endpoint: string = 'https://ps.dev.riple.tech/v1/images/';

  constructor(private http: HttpClient, public getService: GetService) {}

  createImage(images: IImages){
      var formData: any = new FormData();
      formData.append('file', images);
      this.http.post('https://ps.dev.riple.tech/v1/upload', formData, {
        headers: new HttpHeaders({
          'X-Realm': 'print-a-porter',
          Authorization: 'Bearer ' + this.getService.getKeylockToken()
        })
      }).pipe(
        tap((formData: any) => this.getService.images.push(formData))
      ).subscribe({
        next: (response) => {
          console.log(response)
          // this.modalService.close()
        },
        error: (error) => console.log(error),
      })
    }
}
