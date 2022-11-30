import {Injectable} from '@angular/core';
import {IImages} from "../models/images";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Observable, retry, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetService {
  images: IImages[] = []
  endpoint: string = 'https://ps.dev.riple.tech/v1/images/';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService,
  ) {
  }

  getAllImage(): Observable<IImages> {
    return this.http.get<IImages>(this.endpoint, {
      headers: new HttpHeaders({
        'X-Realm': 'print-a-porter',
        Authorization: 'Bearer ' + this.getKeylockToken()
      })
    }).pipe(
      retry(2),
      tap((images) => {
        console.log(images)
        this.images = Object.values(images)[0]
        console.log(this.images)
      })
    )
  }

  getKeylockToken() {
    this.keycloakService.getToken().then((token) => {
      return token
    })
  }
}
