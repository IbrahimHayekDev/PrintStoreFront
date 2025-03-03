import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { UserSessionService } from './features/user-management/services/user-session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  _userSession = inject(UserSessionService);

  ngOnInit(): void {
    this._userSession.loggedIn.next(
      localStorage.getItem('token') ? true : false
    );
    var userStorage = localStorage.getItem('user');
    userStorage
      ? this._userSession.user.next(JSON.parse(userStorage))
      : this._userSession.user.next('');
  }
  title = 'print-store';
}
