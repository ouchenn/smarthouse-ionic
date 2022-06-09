import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { TokenServiceService } from '../services/token-service.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenServiceService
  ) {}

  loguser: User = {
    nom: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
  };

  ngOnInit(): void {}

  formIsValid() {
    return this.loguser.email != '' && this.loguser.password != '';
  }
  loginUser() {
    this.userService.login(this.loguser).subscribe(
      (res) => {
        this.tokenService.handle(res);
        this.tokenService.changeStatus(true);
        this.router.navigate(['/home']);
      },
      (error: Response) => {
        alert('password incorect ' + error.status);
        console.log(error);
      }
    );
  }
}
