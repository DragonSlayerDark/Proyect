import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss'],
  providers: [LoginService]
})
export class InitComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    if (this.loginService.getUsuario('users')) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
