import { Component, signal } from '@angular/core';
import { DataStore } from './persistence/data-store.class';
import { MainLayout } from "./ux/main-layout/main-layout";

@Component({
  selector: 'app-root',
  imports: [MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('ng-twenty-one');
  protected dataStore: DataStore;

  constructor() {
    console.log('App component constructed');
    this.dataStore = new DataStore(window.indexedDB, 'ng-twenty-one');
  }

}
