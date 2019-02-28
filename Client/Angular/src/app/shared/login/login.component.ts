import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { environment } from '../../../environments/environment';
import { BackendService } from '../../services/backend-service';
import { Observable } from "rxjs";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})

export class LoginComponent implements OnInit, OnDestroy  {
  socialAuth: boolean = false; // show Google and FB Sign in only when social auth is enabled
  error: boolean = false;
  errorMessage: String ="";
  dataLoading: boolean = false;
  user: boolean = false;
  data: Observable<any>;
  private querySubscription;

  constructor(private _router: Router, private _backendService: BackendService) { }

  ngOnInit() {
    if(environment.socialAuthEnabled) {
      this.socialAuth = true; // show Google and FB Sign in only when social auth is enabled
    }
    if(localStorage.getItem("token")) {
      this.user = true;
    }
}

  login(formData) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.loginUser(formData).subscribe((res)=> {
      if(res["data"]["loginUser_Q"].token !== "") {
        window.localStorage.setItem("token",res["data"]["loginUser_Q"].token);
        this.user = true;
        this.error = false;
        this.errorMessage = "";
      } else {
        this.error = true;
        this.errorMessage = res["data"]["loginUser_Q"].message;
      }
    },
    (error) => {
      this.error = true;
      this.errorMessage = error.message;
      this.dataLoading = false;
    },
    () => {
      this.dataLoading = false;
    });
    }

    logout() {
      window.localStorage.removeItem("token");
      this.user = false;
    }

    ngOnDestroy() {
      if (this.querySubscription) {
        this.querySubscription.unsubscribe();
      }
    }
  }
