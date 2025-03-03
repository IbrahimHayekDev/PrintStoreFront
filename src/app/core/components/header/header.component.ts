import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Page } from '../../models/page';
import { SharedService } from '../../../shared/services/shared.service';
import { HeaderService } from '../../services/header.service';
import { CacheService } from '../../../shared/services/cache.service';
import { MatMenuModule } from '@angular/material/menu';
import { UserSessionService } from '../../../features/user-management/services/user-session.service';
import { AuthApiService } from '../../../features/user-management/services/auth-api.service';
import { LayoutService } from '../../services/layout.service';
import {
  categoryItem,
  MainCategoriesResponse,
} from '../../models/MainCategoriesResponse';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor() {}

  _cacheService = inject(CacheService);
  _userSession = inject(UserSessionService);
  _authService = inject(AuthApiService);
  _layoutService = inject(LayoutService);
  userData: any = null;
  userLoggedIn = false;

  ngOnInit(): void {
    this.headerService.setPage(Number(localStorage.getItem('activePage')) || 0);

    this.activePage = this.headerService.activePage$;

    this.getCategories();
    this._userSession.loggedIn.subscribe((res) => {
      if (res == true) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
    this.userData = CacheService.getUserData();
    this._userSession.user.subscribe((res) => {
      if (res != '') {
        this.userData = res;
      }
    });
  }

  router = inject(Router);
  sharedService = inject(SharedService);
  headerService = inject(HeaderService);
  menuItems: Page[] = [];
  mainCategories: categoryItem[] = [];
  activePage: Signal<number> | undefined;

  navigatetoCategory(categoryId: number) {
    this.headerService.setPage(categoryId);
    this.router.navigateByUrl(`/shop/categories-listing/${categoryId}`);
  }

  navigateAccount() {
    this.router.navigateByUrl('/account/login');
  }

  async getMenuitems(): Promise<void> {
    await this.headerService.getMenuPages().subscribe((response) => {
      this.menuItems = response;
    });
  }

  logout(): void {
    this._authService.logout().subscribe((response) => {
      this.sharedService.postLogout(response);
    });
  }

  navigateToViewAccount() {
    this.router.navigateByUrl('account/view');
  }

  getCategories() {
    this._layoutService
      .GetPortalMainCategories()
      .subscribe((response: MainCategoriesResponse) => {
        if (response.isSuccessful) {
          this.mainCategories = response.data.items;
        }
      });
  }
}
