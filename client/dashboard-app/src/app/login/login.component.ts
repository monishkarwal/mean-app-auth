import { AuthService } from "./../service/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  signIn(credentials) {
    this.authService.login(credentials).subscribe(
      result => {
        if (result["token"]) {
          localStorage.setItem("token", result["token"]);
          this.router.navigate(["/dummy"]);
        }
      },
      error => {
        this.invalidLogin = true;
      }
    );
  }
}
