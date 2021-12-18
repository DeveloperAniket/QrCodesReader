import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QrCodeModel } from '../../shared/model/qrcode.model';

@Component({
  selector: 'app-qr-detail',
  templateUrl: './qr-detail.component.html',
  styleUrls: ['./qr-detail.component.css']
})
export class QrDetailComponent implements OnInit, OnChanges {

  @Input() data: QrCodeModel;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

}
