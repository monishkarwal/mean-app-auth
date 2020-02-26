import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials) {
    return this.http.post("http://localhost:3000/login", {
      email: credentials["email"],
      password: credentials["password"]
    });
  }

  logout() {
    localStorage.removeItem("token");
  }

  isLoggedIn() {
    let status;
    if (!localStorage.getItem("token")) {
      status = false;
    } else status = true;
    console.log(status);
    return status;
  }
}
