import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private platformDetectorService: PlatformDetectorService ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    this.authService
      .authenticate(userName, password)
      .subscribe(
        () => this.router.navigate(['user', userName]),
        err => {
          alert('Invalid user name or password');
          this.loginForm.reset();

          //Só executo a instrução de aplicar o foco no campo input (acessando
          //diretamente o elemento do DOM) se estiver utilizando a renderização
          //no browser (pois se fosse renderização server-side geraria erro)
          if ( this.platformDetectorService.isPlatformBrowser()) {
            this.userNameInput.nativeElement.focus();
          }
        });
  }

}
