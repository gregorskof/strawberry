import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { RoundedSelectionDirective } from './directives/rounded-selection.directive';

@Component({
  imports: [RouterOutlet, Header, Footer],
  hostDirectives: [RoundedSelectionDirective],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Angular-Test-Environment');
}
