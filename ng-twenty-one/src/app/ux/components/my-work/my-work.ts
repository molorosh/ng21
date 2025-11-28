import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-my-work',
  imports: [],
  templateUrl: './my-work.html',
  styleUrl: './my-work.less',
})
export class MyWork {
  thePk = signal(-21);
  theTitle = signal('My New Work Item');
}
