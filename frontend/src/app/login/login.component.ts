import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    if (authService.isLoggedIn()) {
      router.navigate(['/dashboard/contact-list']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.loading = true;
    const { username, password } = this.loginForm.value;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    this.authService
      .login(username, password)
      .toPromise()
      .then((res: any) => {
        console.log(res);
        this.loading = false;
        console.log(res.data);
        if (res.message === 'Invalid credentials') {
        } else {
          localStorage.setItem('token', JSON.stringify(res.data));
          this.router.navigate(['/dashboard/contact-list']);
        }
      })
      .catch((err) => {
        this.loading = false;
        console.log('err', err);
      });
  }
}
