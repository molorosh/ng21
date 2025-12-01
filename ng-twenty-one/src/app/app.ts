import { Component, signal, inject } from '@angular/core';
import { MainLayout } from "./ux/main-layout/main-layout";
import { DataStoreConfig } from './persistence/data-store-config.service';

@Component({
  selector: 'app-root',
  imports: [MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('ng-twenty-one');
  dataStoreConfig: DataStoreConfig = inject(DataStoreConfig);

  constructor() {
    console.log('App component constructed');
    this.dataStoreConfig.dbName = 'ng-twenty-one';
  }

}
