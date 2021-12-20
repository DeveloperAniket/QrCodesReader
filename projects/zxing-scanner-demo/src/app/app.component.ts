import { Component } from '@angular/core'; 
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { QrCodeModel } from './shared/model/qrcode.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: string;
  showScanner = true;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultValue: QrCodeModel

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor() {
    // setTimeout(() => {
    //   this.onCodeResult('{"Id":3, "Code":"e4a0c3a9-41fe-41a9-b9fb-ea8f5d38ab9a"}') 
    // }, 1000);
  }

  clearResult(): void {
    this.qrResultValue = null;
    this.showScanner = true;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    let obj: QrCodeModel = JSON.parse(resultString);
    if (obj.Code && obj.Id && obj.Id !== 0) {
      this.qrResultValue = obj
      this.showScanner = false;
    }
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }


  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
}
