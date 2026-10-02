import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <header>
      <a routerLink="/" class="brand">
        <span class="logo" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        DevFest Ado-Ekiti <span>Call for talks</span>
      </a>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
  styleUrl: './app.css',
})
export class App {}
