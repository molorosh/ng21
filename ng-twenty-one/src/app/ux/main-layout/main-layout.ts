import { Component, computed, signal, input } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.less',
})
export class MainLayout {
  appTitle = input<string>();

  numberA = signal(0);
  numberB = signal(0);

  addition = computed(() => this.numberA() + this.numberB());
  subtraction = computed(() => this.numberA() - this.numberB());
  multiplication = computed(() => this.numberA() * this.numberB());
  division = computed(() => {
    const b = this.numberB();
    return b !== 0 ? this.numberA() / b : null;
  });
  
  incrementA():void {
    this.numberA.update(n => n + 1);
  }
  incrementB():void {
    this.numberB.update(n => n + 1);
  }
  decrementA():void {
    this.numberA.update(n => n - 1);
  }
  decrementB():void {
    this.numberB.update(n => n - 1);
  }
}
