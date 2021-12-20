import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { QrCodeModel } from '../model/qrcode.model';

@Injectable({
  providedIn: 'root'
})
export class QrApiService {
  baseURL: string = "https://qrcodeapi.azurewebsites.net/QRCode/";

  constructor(private http: HttpClient) { }

  getQRcode(code: string): Observable<QrCodeModel> {
    return this.http.get<QrCodeModel>(this.baseURL + code)
      .pipe(map(result => Object.assign(new QrCodeModel(), result)));

  }
}
