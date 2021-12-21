import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QrCodeModel } from '../../shared/model/qrcode.model';
import { QrApiService } from '../../shared/services/qr-api.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-qr-detail',
  templateUrl: './qr-detail.component.html',
  styleUrls: ['./qr-detail.component.css']
})
export class QrDetailComponent implements OnInit, OnChanges {
  qrCodeIdDisplay = 0;
  @Input() data: QrCodeModel;
  qrCodeDetail: QrCodeModel;
  informationText: String = "QR code found";
  loading: boolean = false;
  @Output() backToScan = new EventEmitter<boolean>();
  value = '';
  validationMessage = '';
  constructor(private _qrApiService: QrApiService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data.currentValue !== changes.data.previousValue && this.data.Id !== 0
      && this.data.Code !== null && this.data.Code !== '') {
      this.getCodeDetail();
    }
  }
  private populateInfoMessage() {
    this.qrCodeIdDisplay = this.qrCodeDetail.Id;
    // If Id value is greater than 5 then Id value will be (Id -2). As till 5 id is dev id.. 
    if (this.qrCodeDetail && this.qrCodeDetail.Id && this.qrCodeDetail.Id > 5) {
      this.qrCodeIdDisplay = this.qrCodeDetail.Id - 5;
    }
    if (this.qrCodeDetail && this.qrCodeDetail.IsDeleted) {
      this.informationText = "Qr code deleted";
    } else if (this.qrCodeDetail && this.qrCodeDetail.IsRedeemed) {
      this.informationText = "Alert : : : : : : Qr code already redeemed";
    } else if (this.qrCodeDetail && this.qrCodeDetail.IsIssued) {
      this.informationText = "Qr code is active and issued";
    } else {
      this.informationText = "Qr code is active but not issued";
    }
  }

  private getCodeDetail() {
    this.loading = true;
    this._qrApiService.getQRcode(this.data.Code).subscribe((response) => {                           //next() callback
      console.log(response)
      if (response) {
        this.qrCodeDetail = response;
        this.populateInfoMessage();
      }
    },
      (error) => {                              //error() callback
        console.error('Request failed with error')
        this.informationText = error;
        this.loading = false;
      },
      () => {                                   //complete() callback
        this.loading = false;
      });
  }
  public onRedeem() {
    this.loading = true;
    this._qrApiService.markQRcodeRedeem(this.data.Code).subscribe((response) => {                           //next() callback
      console.log(response)
      if (response) {
        this.qrCodeDetail = response;
        this.populateInfoMessage();
      }
    },
      (error) => {                              //error() callback
        console.error('Request failed with error')
        this.informationText = error;
        this.loading = false;
      },
      () => {                                   //complete() callback
        this.loading = false;
      });
  }
  public onActive() {
    if (!this.value || this.value === '') {
      this.validationMessage = 'Insert Name';
      return;
    }

    this.loading = true;
    this._qrApiService.markQRcodeIssue(this.data.Code, this.value).subscribe((response) => {                           //next() callback
      console.log(response)
      if (response) {
        console.log(response)
        this.qrCodeDetail = response;
        this.populateInfoMessage();
      }
    },
      (error) => {                              //error() callback
        console.error('Request failed with error')
        this.informationText = error;
        this.loading = false;
      },
      () => {                                   //complete() callback
        this.loading = false;
      });
  }

  public onBackClick() {
    this.backToScan.emit(true);
  }
}
