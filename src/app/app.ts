import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BasicHeader} from './components/headers/basic-header/basic-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BasicHeader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
