import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackendService } from '../../services/backend-service';

@Component({
  selector: 'dash-header',
  templateUrl: 'dash.header.component.html'
})
export class DashboardHeaderComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() pageTitle: string;
  @Input() helpType: string;
  emailSent = false;
  selectedValue;
  formShowing = false;
  configData;

  error: any;
  dataLoading: boolean = false;
  brokenNetwork = false;

  constructor(private _backendService: BackendService) {
  }

  ngOnInit(){
    this.configData = this._backendService.getConfig();
  }

  onSubmit(formData) {
    this.dataLoading = true;
    //console.log(formData);
    this._backendService.sendEmail(formData).subscribe(
      res => {
        //console.log(res);
      },
      error => {
        //console.log(error);
        console.log("API didn't respond.");
        this.brokenNetwork = true;
        this.dataLoading = false;
      },
      () => {
        this.dataLoading = false;
        this.emailSent = true;
      }
    )
  }
}