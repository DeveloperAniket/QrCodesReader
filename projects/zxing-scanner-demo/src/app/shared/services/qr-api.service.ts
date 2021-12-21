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
    return this.http.get(this.baseURL + code)
      .pipe(map(result => this.mapQrCodeModel(result)));

  }
  markQRcodeIssue(code: string, name: string): Observable<QrCodeModel> {
    return this.http.get(this.baseURL + 'issue/' + code + '/' + name)
      .pipe(map(result => this.mapQrCodeModel(result)));

  }
  markQRcodeRedeem(code: string): Observable<QrCodeModel> {
    return this.http.get(this.baseURL + 'redeem/' + code)
      .pipe(map(result => this.mapQrCodeModel(result)));

  }

  private mapQrCodeModel(string: any): QrCodeModel {
    const res = new QrCodeModel();
    if (string) {
      res.Id = string["id"];
      res.Code = string["code"];
      res.IsDeleted = string["isDeleted"];
      res.IsIssued = string["isIssued"];
      res.FullName = string["fullName"];
      res.IsRedeemed = string["isRedeemed"];
      res.RedeedemDate = string["redeedemDate"];
      res.Created = string["created"];
    }
    return res;
  }
}
