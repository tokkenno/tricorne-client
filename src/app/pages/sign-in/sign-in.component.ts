import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @ViewChild('loginError') loginError: TemplateRef<any>;

  public readonly form: FormGroup;

  constructor(
      private readonly router: Router,
      private readonly auth: AuthService,
      private readonly formBuilder: FormBuilder,
      private readonly toastService: ToastService
  ) {
    this.form = formBuilder.group({
      user: [''],
      password: [''],
      remember: [false]
    });
  }

  ngOnInit(): void {
    if (this.auth.getSession() != null) {
      this.router.navigate(['/']);
    }
  }

  login(): void {
    this.auth.login(
        this.form.get('user').value,
        this.form.get('password').value,
        Boolean(this.form.get('remember').value)
    ).subscribe((session) => {
      if (session != null) {
        return this.router.navigate(['/']);
      }
    }, () => {
      this.toastService.show(this.loginError, { classname: 'bg-danger text-light', delay: 8000 });
    });
  }
}
