import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
  private formBuilder: FormBuilder,
  private authentificationService: AuthenticationService,
  private router: Router
  ) { }
  ngOnInit() {
    this.initSignupForm();
  }
  initSignupForm() {
    this.signupForm = this.formBuilder.group ({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required]
    });
}
onSignupUser() {
const email = this.signupForm.get('email').value;
const password = this.signupForm.get('password').value;
const passwordConfirm = this.signupForm.get('passwordConfirm').value;
if (password === passwordConfirm) {
  this.authentificationService.signupUser(email, password).then(
    (data) => {
      console.log(data);
      this.router.navigate(['list']);
    }
  ).catch(
    (error) => {
      console.error(error);
      }
    );
} else {
  alert('Les mots de passe doivent être identiques');
}

}
}

