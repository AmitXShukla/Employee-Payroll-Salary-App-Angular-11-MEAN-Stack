import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { moveIn, fallIn } from '../shared/router.animations';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BackendService } from '../services/backend-service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'salary',
    templateUrl: './salary.component.html'
})
export class SalaryComponent implements OnInit, OnDestroy {

    members: any[];
    dataSource: MatTableDataSource<any>;
    myDocData;
    data;
    emplData: any;
    toggleField: string;
    state: string = '';
    savedChanges = false;
    error: boolean = false;
    errorMessage: String = "";
    dataLoading: boolean = false;
    private querySubscription;

    pCDs = ['Allowance', 'Deduction'];
    freqCDs = ['Bi-Weekly', 'Monthly', 'Yearly', 'One-time', 'OTHER'];
    total_amount = 0;
    addDataForm: FormGroup;
    editDataForm: FormGroup;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['code', 'descr', 'emplid', 'empldescr', 'empllastname', 'paiddata', '_id'];

    constructor(private _backendService: BackendService, private _fb: FormBuilder, private _router: ActivatedRoute) { }

    ngOnInit() {
        let id = this._router.snapshot.paramMap.get('id');
        this.getEmployee(id);
        this.toggleField = (!id) ? "searchMode" : "addMode";
        //this.toggleField = "searchMode";
        this.error = false;
        this.errorMessage = "";
        this.dataSource = new MatTableDataSource(this.members);
        this.addDataForm = this._fb.group({
            emplid: ['', Validators.required],
            emplskey: ['', Validators.required],
            empldescr: ['', Validators.required],
            empllastname: ['', Validators.required],
            emplsalcode: ['', Validators.required],
            paiddata: ['', Validators.required],
            code: ['', Validators.required],
            descr: ['', Validators.required],
            bsalary: ['', Validators.required],
            line: this._fb.array([]),
            /**
            line: this._fb.array([this._fb.group({
                frequency: ['', Validators.required],
                ptype: ['', Validators.required],
                payval: ['', Validators.required],
                amount: ['', [Validators.pattern("^[0-9]*$")]]
            })]),
            */
            gamount: ''
        });
        this.editDataForm = this._fb.group({
            _id: ['', Validators.required],
            emplid: ['', Validators.required],
            emplskey: ['', Validators.required],
            empldescr: ['', Validators.required],
            empllastname: ['', Validators.required],
            emplsalcode: ['', Validators.required],
            paiddata: ['', Validators.required],
            code: ['', Validators.required],
            descr: ['', Validators.required],
            bsalary: ['', Validators.required],
            line: this._fb.array([]),
            gamount: ''
        });
    }

    getEmployee(id) {
        this.dataLoading = true;
        return this.querySubscription = this._backendService.getEmployee("", id).subscribe((res) => {
            this.addDataForm.controls["emplid"].patchValue(res["data"]["getEmployee_Q"][0]._id);
            this.addDataForm.controls["emplskey"].patchValue(res["data"]["getEmployee_Q"][0].SKEY);
            this.addDataForm.controls["empldescr"].patchValue(res["data"]["getEmployee_Q"][0].DESCR);
            this.addDataForm.controls["empllastname"].patchValue(res["data"]["getEmployee_Q"][0].LAST_NAME);
            this.addDataForm.controls["emplsalcode"].patchValue(res["data"]["getEmployee_Q"][0].SALARY_CODE);

            this._backendService.getSalaryCode("", res["data"]["getEmployee_Q"][0].SALARY_CODE).subscribe((res) => {
                if (res["data"]["getSalaryCode_Q"].code !== "") {

                    this.data = res["data"]["getSalaryCode_Q"][0];
                    this.addDataForm.patchValue(this.data);
                    this.addDataForm.controls["code"].patchValue("");

                    for (let i = 0; i < this.data["line"].length; i++) {
                        this.LINES('addDataForm').push(this._fb.group(this.data["line"][i]));
                    }
                    this.calculateTotal(('addDataForm'));
                }
            });
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

    LINES(formName) {
        return this[formName].get('line') as FormArray;
    }
    addLINES(formName) {
        this.LINES(formName).push(this._fb.group({
            frequency: ['', Validators.required],
            ptype: ['', Validators.required],
            payval: ['', Validators.required],
            amount: ['', [Validators.pattern("^[0-9]*$")]]

        }));
        this.calculateTotal(formName);
    }
    deleteLINES(index, formName) {
        this.LINES(formName).removeAt(index);
        this.calculateTotal(formName);
    }
    calculateTotal(formName) {
        this.total_amount = 0;
        for (let i = 0; i <= this[formName].value.line.length; i++) {
            if (this[formName].value.line[i]) {
                if (this[formName].value.line[i].ptype == 'Allowance') {
                    this.total_amount += +this[formName].value.line[i].amount;
                } else {
                    this.total_amount -= +this[formName].value.line[i].amount;
                }
            }
        }
        this.total_amount += parseFloat(this[formName].controls['bsalary'].value);
        this[formName].controls['gamount'].setValue(this.total_amount.toFixed(2));
    }

    toggle(filter?) {
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
    }

    getData(filterAllDocs?, getOneDoc?) {
        this.dataLoading = true;
        return this.querySubscription = this._backendService.getSalaryVoucher(filterAllDocs, getOneDoc).subscribe((res) => {
            if (res["data"]["getSalaryVoucher_Q"].code !== "") {
                if (getOneDoc) {
                    this.data = res["data"]["getSalaryVoucher_Q"][0];
                    this.editDataForm = this._fb.group({
                        _id: ['', Validators.required],
                        emplid: ['', Validators.required],
                        emplskey: ['', Validators.required],
                        empldescr: ['', Validators.required],
                        empllastname: ['', Validators.required],
                        emplsalcode: ['', Validators.required],
                        paiddata: ['', Validators.required],
                        code: ['', Validators.required],
                        descr: ['', Validators.required],
                        bsalary: ['', Validators.required],
                        line: this._fb.array([]),
                        gamount: ''
                    });
                    this.editDataForm.patchValue(this.data);

                    for (let i = 0; i < this.data["line"].length; i++) {
                        this.LINES('editDataForm').push(this._fb.group(this.data["line"][i]));
                    }
                    this.calculateTotal(('editDataForm'));
                    this.toggle('editMode');
                } else {
                    this.dataSource = new MatTableDataSource(res["data"]["getSalaryVoucher_Q"]);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
                this.error = false;
                this.errorMessage = "";
            } else {
                this.error = true;
                this.errorMessage = res["data"]["getSalaryVoucher_Q"].message;
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
        this.querySubscription = this._backendService.setSalaryVoucher(formData).subscribe((res) => {
            if (res["data"]["setSalaryVoucher_M"].code != "") {
                this.savedChanges = true;
                this.error = false;
                this.errorMessage = "";
            } else {
                this.error = true;
                this.errorMessage = res["data"]["setSalaryVoucher_M"].message;
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
        this.querySubscription = this._backendService.setSalaryVoucherDoc(formData).subscribe((res) => {
            if (res["data"]["setSalaryVoucherDoc_M"].code !== "") {
                this.savedChanges = true;
                this.error = false;
                this.errorMessage = "";
            } else {
                this.error = true;
                this.errorMessage = res["data"]["setSalaryVoucherDoc_M"].message;
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
            this.querySubscription = this._backendService.delSalaryVoucherDoc(docId).subscribe((res) => {
                //console.log("res"+JSON.stringify(res))
                if (!res["data"]["delSalaryVoucherDoc_M"]) {
                    this.toggle('searchMode');
                    this.error = false;
                    this.errorMessage = "";
                } else {
                    this.error = true;
                    this.errorMessage = res["data"]["delSalaryVoucherDoc_M"].message;
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