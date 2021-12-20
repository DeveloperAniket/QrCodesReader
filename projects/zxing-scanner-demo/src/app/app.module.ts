import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppUiModule } from './app-ui.module';
import { AppComponent } from './app.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrDetailComponent } from './QR-Details/qr-detail/qr-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    ZXingScannerModule, HttpClientModule,
    // Angular
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    // Local
    AppUiModule,

  ],
  declarations: [AppComponent, QrDetailComponent],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
