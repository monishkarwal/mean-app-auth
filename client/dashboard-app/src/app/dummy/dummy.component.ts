import { Router } from "@angular/router";
import { AuthService } from "./../service/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dummy",
  templateUrl: "./dummy.component.html",
  styleUrls: ["./dummy.component.css"]
})
export class DummyComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
