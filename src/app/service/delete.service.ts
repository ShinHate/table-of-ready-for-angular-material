import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GetService} from "./get.service";
import {catchError, retry, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  endpoint: string = 'https://ps.dev.riple.tech/v1/images/';

  constructor(private http: HttpClient, public getService: GetService) {
  }

  deleteImages(idImage: string, i: number) {
    this.http.delete(this.endpoint + (idImage), {
      headers: new HttpHeaders({
        'X-Realm': 'print-a-porter',
        Authorization: 'Barier ' + this.getService.getKeylockToken()
      })
    }).subscribe(() => {
        this.getService.images.splice(i, 1)
      },
      (error) => console.log(error)
    )
  }

  deleteAllImages() {
    let selectImageArray = this.getService.images.filter((num) => num.published)

    for (let i = 0; i < selectImageArray.length; i++) {
      const indexOfObject = this.getService.images.findIndex((object) => {
        return object.id == selectImageArray[i].id
      })
      if (indexOfObject !== -1) {
        this.http.delete('https://ps.dev.riple.tech/v1/images/' + (selectImageArray[i].id), {
          headers: new HttpHeaders({
            'X-Realm': 'print-a-porter',
            Authorization: 'Barier ' + this.getService.getKeylockToken()
          })
        }).pipe(
          retry(2),
          tap((response) => {
            console.log(response)
          }),
          catchError(err => err)
        ).subscribe(() => {
          console.log(indexOfObject)
        })
      }
      this.getService.images.splice(indexOfObject, 1)
    }
  }
}
