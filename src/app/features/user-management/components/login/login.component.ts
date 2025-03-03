import { Component, inject, model, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MyErrorStateMatcher } from '../../helpers/error-state-matcher';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedService } from '../../../../shared/services/shared.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CacheService } from '../../../../shared/services/cache.service';
import { loginResponseDTO } from '../../models/login-responseDTO';
import { UserSessionService } from '../../services/user-session.service';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private _cacheService: CacheService, private router: Router) {
    this.routerState = this.router.getCurrentNavigation()?.extras?.state;
  }

  ngOnInit(): void {
    this.allOptions = this.sharedService.getCredentials();
    this.autoFilter();
    if (this.routerState && this.routerState['signupEmail']) {
      this.loginForm.controls['email'].setValue(
        this.routerState['signupEmail']
      );
    }
  }

  ngOnDestroy(): void {
    if (this.routerState) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        navigation.extras.state = {};
      }
    }
  }

  routerState: any;
  formbuilder = inject(FormBuilder);
  isSmallScreen = false;
  passwordVisible = false;
  allOptions: any[] = [];
  rememberMe = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');
  readonly disabled = model(false);
  loginForm: FormGroup = this.formbuilder.group({
    email: [
      '',
      [Validators.required, Validators.email, this.noWhitespaceValidator],
    ],
    password: ['', [Validators.required]],
  });

  matcher = new MyErrorStateMatcher();
  sharedService = inject(SharedService);
  filteredOptions: Observable<any[]> | undefined;
  // router = inject(Router);
  _authService = inject(AuthApiService);
  _userSession = inject(UserSessionService);
  showMustVerify = false;

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }

  userNameSelected(e: any) {
    this.loginForm.controls['password'].setValue(
      this.allOptions.filter((item) => item.loginUserName == e.option.value)[0]
        .loginPassword
    );
    this.rememberMe.set(true);
  }

  autoFilter(): void {
    this.filteredOptions = this.loginForm.controls['email'].valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allOptions.filter(
      (option) =>
        filterValue && option.loginUserName.toLowerCase().includes(filterValue)
    );
  }

  login(): void {
    const payload = this.loginForm.getRawValue();
    this._authService.login(payload).subscribe((response: loginResponseDTO) => {
      if (response.isSuccessful && response.data) {
        this.postlogin(response);
      }
      // Not Verified account
      else if (response.error.errorCode == 1) {
        this.showMustVerify = true;
      }
    });
  }

  postlogin(response: loginResponseDTO): void {
    this.handelRememberMe();
    this.sharedService.postLogin(response);
  }

  handelRememberMe(): void {
    if (this.rememberMe()) {
      this.sharedService.saveCredentials(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      );
    } else {
      this.sharedService.clearCredentials(
        this.loginForm.controls['email'].value
      );
    }
  }
}
