import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QrCodeModel } from '../../shared/model/qrcode.model';

@Component({
  selector: 'app-qr-detail',
  templateUrl: './qr-detail.component.html',
  styleUrls: ['./qr-detail.component.css']
})
export class QrDetailComponent implements OnInit, OnChanges {

  @Input() data: QrCodeModel;
  informationText: String = "QR code found";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data.currentValue !== changes.data.previousValue && this.data.Id !== 0) {
      if (this.data && this.data.IsDeleted) {
        this.informationText = "Qr code deleted";
      } else if (this.data && this.data.IsRedeemed) {
        this.informationText = "Alert : : : : : : Qr code already redeemed";
      } else if (this.data && this.data.IsIssued) {
        this.informationText = "Qr code is active and issued";
      } else {
        this.informationText = "Qr code is active but not issued";
      }
    }
  }
  public onRedeem() {
    console.log("Reedem");
  }
  public onActive() {
    console.log("Active");
  }
}
