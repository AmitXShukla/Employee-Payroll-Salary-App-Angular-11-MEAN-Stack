import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { moveIn, fallIn } from '../shared/router.animations';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BackendService } from '../services/backend-service';

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    animations: [moveIn(), fallIn()],
    host: { '[@moveIn]': '' }
})
export class EmployeeComponent implements OnInit, OnDestroy {

    members: any[];
    dataSource: MatTableDataSource<any>;
    myDocData;
    data;
    toggleField: string;
    state: string = '';
    savedChanges = false;
    error: boolean = false;
    errorMessage: String = "";
    dataLoading: boolean = false;
    private querySubscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['CODE', 'DESCR', '_id'];
    leaveCDs;
    salCDs;
    jobCDs;

    constructor(private _backendService: BackendService) { }

    ngOnInit() {
        this.toggleField = "searchMode";
        this.dataSource = new MatTableDataSource(this.members);
        this.getJobData();
        this.getLeaveData();
        this.getSalData();
    }

    toggle(filter?) {
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
    }

    getLeaveData() {
        this.dataLoading = true;
        return this.querySubscription = this._backendService.getLeaveCode().subscribe((res) => {
            if (res["data"]["getLeaveCode_Q"].code !== "") {
                this.leaveCDs = res["data"]["getLeaveCode_Q"];
                this.error = false;
                this.errorMessage = "";
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
    getSalData() {
        this.dataLoading = true;
        return this.querySubscription = this._backendService.getSalaryCode().subscribe((res) => {
            if (res["data"]["getSalaryCode_Q"].code !== "") {
                this.salCDs = res["data"]["getSalaryCode_Q"];
                this.error = false;
                this.errorMessage = "";
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
    getJobData() {
        this.dataLoading = true;
        return this.querySubscription = this._backendService.getJobCode().subscribe((res) => {
            if (res["data"]["getJobCode_Q"].code !== "") {
                this.jobCDs = res["data"]["getJobCode_Q"];
                this.error = false;
                this.errorMessage = "";
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

    getData(filterAllDocs?, getOneDoc?) {
        this.dataLoading = true;
        return this.querySubscription = this._backendService.getEmployee(filterAllDocs, getOneDoc).subscribe((res) => {
            if (res["data"]["getEmployee_Q"].CODE !== "") {
                if (getOneDoc) {
                    this.data = res["data"]["getEmployee_Q"][0];
                    this.toggle('editMode');
                } else {
                    this.dataSource = new MatTableDataSource(res["data"]["getEmployee_Q"]);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
                this.error = false;
                this.errorMessage = "";
            } else {
                this.error = true;
                this.errorMessage = res["data"]["getEmployee_Q"].message;
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

    setData(formData) {
        this.dataLoading = true;
        this.querySubscription = this._backendService.setEmployee(formData).subscribe((res) => {
            if (res["data"]["setEmployee_M"].CODE !== "") {
                this.savedChanges = true;
                this.error = false;
                this.errorMessage = "";
            } else {
                this.error = true;
                this.errorMessage = res["data"]["setEmployee_M"].message;
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

    updateData(formData) {
        this.dataLoading = true;
        this.querySubscription = this._backendService.setEmployeeDoc(formData).subscribe((res) => {
            if (res["data"]["setEmployeeDoc_M"].CODE !== "") {
                this.savedChanges = true;
                this.error = false;
                this.errorMessage = "";
            } else {
                this.error = true;
                this.errorMessage = res["data"]["setEmployeeDoc_M"].message;
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

    getDoc(docId) {
        this.getData("", docId);
    }

    deleteDoc(docId) {
        if (confirm("Are you sure want to delete this record ?")) {
            this.querySubscription = this._backendService.delEmployeeDoc(docId).subscribe((res) => {
                //console.log("res"+JSON.stringify(res))
                if (!res["data"]["delEmployeeDoc_M"]) {
                    this.toggle('searchMode');
                    this.error = false;
                    this.errorMessage = "";
                } else {
                    this.error = true;
                    this.errorMessage = res["data"]["delEmployeeDoc_M"].message;
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
    }

    //mat table paginator and filter functions
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    ngOnDestroy() {
        // this is not needed when observable is used, in this case, we are registering user on subscription
        if (this.querySubscription) {
            this.querySubscription.unsubscribe();
        }
    }
}