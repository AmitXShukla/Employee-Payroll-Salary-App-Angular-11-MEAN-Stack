import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { moveIn, fallIn } from '../shared/router.animations';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BackendService } from '../services/backend-service';

@Component({
    selector: 'leavecode',
    templateUrl: './leavecode.component.html',
    animations: [moveIn(), fallIn()],
    host: { '[@moveIn]': '' }
})
export class LeaveCodeComponent implements OnInit, OnDestroy {

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
    displayedColumns = ['code', 'descr', '_id'];

    constructor(private _backendService: BackendService) { }

    ngOnInit() {
        this.toggleField = "searchMode";
        this.dataSource = new MatTableDataSource(this.members);
    }

    toggle(filter?) {
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
    }

    getData(filterAllDocs?, getOneDoc?) {
        this.dataLoading = true;
        return this.querySubscription = this._backendService.getLeaveCode(filterAllDocs, getOneDoc).subscribe((res) => {
            if (res["data"]["getLeaveCode_Q"].code !== "") {
                if(getOneDoc) {
                    this.data = res["data"]["getLeaveCode_Q"][0];
                    this.toggle('editMode');
                } else {
                    this.dataSource = new MatTableDataSource(res["data"]["getLeaveCode_Q"]);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
                this.error = false;
                this.errorMessage = "";
            } else {
                this.error = true;
                this.errorMessage = res["data"]["getLeaveCode_Q"].message;
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
        this.querySubscription = this._backendService.setLeaveCode(formData).subscribe((res) => {
            if (res["data"]["setLeaveCode_M"].code !== "") {
                this.savedChanges = true;
                this.error = false;
                this.errorMessage = "";
            } else {
                this.error = true;
                this.errorMessage = res["data"]["setLeaveCode_M"].message;
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
        this.querySubscription = this._backendService.setLeaveCodeDoc(formData).subscribe((res) => {
            if (res["data"]["setLeaveCodeDoc_M"].code !== "") {
                this.savedChanges = true;
                this.error = false;
                this.errorMessage = "";
            } else {
                this.error = true;
                this.errorMessage = res["data"]["setLeaveCodeDoc_M"].message;
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
            this.querySubscription = this._backendService.delLeaveCodeDoc(docId).subscribe((res) => {
                //console.log("res"+JSON.stringify(res))
                if (!res["data"]["delLeaveCodeDoc_M"]) {
                    this.toggle('searchMode');
                    this.error = false;
                    this.errorMessage = "";
                } else {
                    this.error = true;
                    this.errorMessage = res["data"]["delLeaveCodeDoc_M"].message;
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