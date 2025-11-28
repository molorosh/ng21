import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataStore } from './persistence/data-store.class';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
