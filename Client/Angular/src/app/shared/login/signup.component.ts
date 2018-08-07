import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { BackendService } from '../../services/backend-service';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class SignupComponent implements OnDestroy {

  state: string = '';
  idtaken = false;
  savedChanges = false;
  data: any;
  error: boolean = false;
  errorMessage: String ="";
  dataLoading: boolean = false;
  private querySubscription;

  constructor(private _backendService: BackendService, private router: Router) {
  }

  routeLoginPage() {
    this.router.navigate(['/login']);
  }

  onSubmit(formData) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.createUser(formData).subscribe((res)=> {
      if(res["data"]["addUser_M"].email !== "") {
        this.savedChanges = true;
        this.error = false;
        this.errorMessage = "";
      } else {
        this.error = true;
        this.errorMessage = res["data"]["addUser_M"].message;
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
  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}