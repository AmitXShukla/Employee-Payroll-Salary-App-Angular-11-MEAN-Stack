import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})

export class BackendService {

  private _graphQLURL = "http://localhost:3000/alivetracking";

  constructor(private _http: HttpClient) { }

  getConfig() {
    return environment.social;
  }

  // function to send emails using a PHP API //
  sendEmail(messageData) {
    let httpOptions_e = {
      headers: new HttpHeaders({ 'Content-Type': 'application/X-www-form-urlencoded' })
    };
    return this._http.post(environment.emailAPI, messageData, httpOptions_e);
  }

  // User-login-signup functions //
  getUser() {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "query getUser { getUser_Q { name email message } }"
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  loginUser(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let formData = !input ? { email: "", password: "" } : input;
    let graphqlQuery = {
      "query": "query loginUser($email: String!,$password: String!) { loginUser_Q(email: $email, password: $password) { token message } }",
      "variables": {
        "email": formData.email,
        "password": formData.password
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  createUser(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let formData = !input ? { name: "", email: "", password: "" } : input;
    let graphqlQuery = {
      "query": "mutation addUser($name: String!,$email: String!,$password: String!) { addUser_M(name:$name, email: $email, password: $password) { email message } }",
      "variables": {
        "name": formData.name,
        "email": formData.email,
        "password": formData.password
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }
  updateUser(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation updateUser($name: String!,$email: String!,$password: String!) { updateUser_M(name:$name, email: $email, password: $password) { email message } }",
      "variables": {
        "name": input.name,
        "email": input.email,
        "password": input.password
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  // jobcode setup page functions
  getJobCode(filterAllDocs?, getOneDoc?) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let formData = !filterAllDocs ? { _id: "", code: "", descr: '' } : filterAllDocs;
    formData._id = !getOneDoc ? "" : getOneDoc;
    formData.code = filterAllDocs && filterAllDocs.code ? filterAllDocs.code : "";
    formData.descr = filterAllDocs && filterAllDocs.descr ? filterAllDocs.descr : "";

    let graphqlQuery = {
      "query": "query getJobCode($_id: String!,$code: String!,$descr: String!) { getJobCode_Q(_id: $_id, code: $code, descr: $descr) { _id code descr job_role job_duty job_descr comments message } }",
      "variables": {
        "_id": formData._id,
        "code": formData.code,
        "descr": formData.descr
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  setJobCode(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation setJobCode($code: String!,$descr: String!,$job_role: String!,$job_duty: String!,$job_descr: String!,$comments: String!) { setJobCode_M(code:$code,descr:$descr,job_role:$job_role,job_duty:$job_duty,job_descr:$job_descr,comments:$comments) { code message } }",
      "variables": {
        "code": input.code,
        "descr": input.descr,
        "job_role": input.job_role,
        "job_duty": input.job_duty,
        "job_descr": input.job_descr,
        "comments": input.comments,
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  setJobCodeDoc(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation setJobCodeDoc($_id:String,$code: String!,$descr: String!,$job_role: String!,$job_duty: String!,$job_descr: String!,$comments: String!) { setJobCodeDoc_M(_id:$_id,code:$code,descr:$descr,job_role:$job_role,job_duty:$job_duty,job_descr:$job_descr,comments:$comments) { code message } }",
      "variables": {
        "_id": input._id,
        "code": input.code,
        "descr": input.descr,
        "job_role": input.job_role,
        "job_duty": input.job_duty,
        "job_descr": input.job_descr,
        "comments": input.comments,
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  delJobCodeDoc(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation delJobCodeDoc($_id:String) { delJobCodeDoc_M(_id:$_id) { message } }",
      "variables": {
        "_id": input
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  // leavecode setup page functions
  getLeaveCode(filterAllDocs?, getOneDoc?) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let formData = !filterAllDocs ? { _id: "", code: "", descr: '' } : filterAllDocs;
    formData._id = !getOneDoc ? "" : getOneDoc;
    formData.code = filterAllDocs && filterAllDocs.code ? filterAllDocs.code : "";
    formData.descr = filterAllDocs && filterAllDocs.descr ? filterAllDocs.descr : "";

    let graphqlQuery = {
      "query": "query getLeaveCode($_id: String!,$code: String!,$descr: String!) { getLeaveCode_Q(_id: $_id, code: $code, descr: $descr) { _id code descr message } }",
      "variables": {
        "_id": formData._id,
        "code": formData.code,
        "descr": formData.descr
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  setLeaveCode(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation setLeaveCode($code: String!,$descr: String!) { setLeaveCode_M(code:$code,descr:$descr) { code message } }",
      "variables": {
        "code": input.code,
        "descr": input.descr,
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  setLeaveCodeDoc(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation setLeaveCodeDoc($_id:String,$code: String!,$descr: String!) { setLeaveCodeDoc_M(_id:$_id,code:$code,descr:$descr) { code message } }",
      "variables": {
        "_id": input._id,
        "code": input.code,
        "descr": input.descr,
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  delLeaveCodeDoc(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation delLeaveCodeDoc($_id:String) { delLeaveCodeDoc_M(_id:$_id) { message } }",
      "variables": {
        "_id": input
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }
  // salarycode setup page functions
  getSalaryCode(filterAllDocs?, getOneDoc?) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let formData = !filterAllDocs ? { _id: "", code: "", descr: '' } : filterAllDocs;
    formData._id = !getOneDoc ? "" : getOneDoc;
    formData.code = filterAllDocs && filterAllDocs.code ? filterAllDocs.code : "";
    formData.descr = filterAllDocs && filterAllDocs.descr ? filterAllDocs.descr : "";

    let graphqlQuery = {
      "query": "query getSalaryCode($_id: String!,$code: String!,$descr: String!) { getSalaryCode_Q(_id: $_id, code: $code, descr: $descr) { _id code descr bsalary, line { frequency ptype payval amount }, gamount, message } }",
      "variables": {
        "_id": formData._id,
        "code": formData.code,
        "descr": formData.descr
      }
    }
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  setSalaryCode(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation setSalaryCode($code: String!,$descr: String!,$bsalary: String!,$line:[Line], $gamount: String!) { setSalaryCode_M(code:$code,descr:$descr,bsalary:$bsalary,line:$line,gamount:$gamount) { code message } }",
      "variables": {
        "code": input.code,
        "descr": input.descr,
        "bsalary": input.bsalary,
        "line": input.line,
        "gamount": input.gamount
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  setSalaryCodeDoc(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation setSalaryCodeDoc($_id:String,$code: String!,$descr: String!,$bsalary: String!,$line:[Line], $gamount: String!) { setSalaryCodeDoc_M(_id:$_id,code:$code,descr:$descr,bsalary:$bsalary,line:$line,gamount:$gamount) { code message } }",
      "variables": {
        "_id": input._id,
        "code": input.code,
        "descr": input.descr,
        "bsalary": input.bsalary,
        "line": input.line,
        "gamount": input.gamount
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  delSalaryCodeDoc(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation delSalaryCodeDoc($_id:String) { delSalaryCodeDoc_M(_id:$_id) { message } }",
      "variables": {
        "_id": input
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }
  // voucher page functions
  getVoucher(filterAllDocs?, getOneDoc?) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let formData = !filterAllDocs ? { _id: "", CODE: "", DESCR: '' } : filterAllDocs;
    formData._id = !getOneDoc ? "" : getOneDoc;
    formData.CODE = filterAllDocs && filterAllDocs.CODE ? filterAllDocs.CODE : "";
    formData.DESCR = filterAllDocs && filterAllDocs.DESCR ? filterAllDocs.DESCR : "";

    let graphqlQuery = {
      "query": "query getVoucher($_id: String!,$CODE: String!,$DESCR: String!) { getVoucher_Q(_id: $_id, CODE: $CODE, DESCR: $DESCR) { _id CODE DESCR TYPE STATUS INVOICE VENDOR ADDRESS { ADD_TYPE ADD_LINE_1 ADD_LINE_2 PIN_CODE STATE COUNTRY } PHONE { PHONE_TYPE PHONE_NUMBER } EMAILID { EMAIL_TYPE EMAILID } EDATE RDATE DDATE PDATE LINE { LINE_NUM LINE_NAME AMOUNT } GAMOUNT GAMOUNT_DISC_TYPE DISC_G_PERCENT DISC_GAMOUNT TAX_TYPE TAX_PERCENT TAX_GAMOUNT SHIP_TYPE SHIP_PERCENT SHIP_GAMOUNT FINAL_AMOUNT PAID_AMOUNT BALANCE message } }",
      "variables": {
        "_id": formData._id,
        "CODE": formData.CODE,
        "DESCR": formData.DESCR
      }
    }
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  setVoucher(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation setVoucher($CODE: String,$DESCR: String,$TYPE: String,$STATUS: String,$INVOICE: String,$VENDOR: String,$ADDRESS:[ADDRESS],$PHONE:[PHONE],$EMAILID:[EMAILID],$EDATE: String,$RDATE: String,$DDATE: String,$PDATE: String, $LINE:[LINE], $GAMOUNT: String, $GAMOUNT_DISC_TYPE: String, $DISC_G_PERCENT: String, $DISC_GAMOUNT: String, $TAX_TYPE: String, $TAX_PERCENT: String, $TAX_GAMOUNT: String, $SHIP_TYPE: String, $SHIP_PERCENT: String, $SHIP_GAMOUNT: String, $FINAL_AMOUNT: String, $PAID_AMOUNT: String, $BALANCE: String ) { setVoucher_M(CODE:$CODE,DESCR:$DESCR,TYPE:$TYPE,STATUS:$STATUS,INVOICE:$INVOICE,VENDOR:$VENDOR,ADDRESS:$ADDRESS,PHONE:$PHONE,EMAILID:$EMAILID,EDATE:$EDATE,RDATE:$RDATE,DDATE:$DDATE,PDATE:$PDATE,LINE:$LINE, GAMOUNT:$GAMOUNT, GAMOUNT_DISC_TYPE:$GAMOUNT_DISC_TYPE, DISC_G_PERCENT:$DISC_G_PERCENT, DISC_GAMOUNT:$DISC_GAMOUNT, TAX_TYPE:$TAX_TYPE, TAX_PERCENT:$TAX_PERCENT, TAX_GAMOUNT:$TAX_GAMOUNT, SHIP_TYPE:$SHIP_TYPE, SHIP_PERCENT:$SHIP_PERCENT, SHIP_GAMOUNT:$SHIP_GAMOUNT, FINAL_AMOUNT:$FINAL_AMOUNT, PAID_AMOUNT:$PAID_AMOUNT, BALANCE:$BALANCE) { CODE message } }",
      "variables": {
        "CODE": input.CODE,
        "DESCR": input.DESCR,
        "TYPE": input.TYPE,
        "STATUS": input.STATUS,
        "INVOICE": input.INVOICE,
        "VENDOR": input.VENDOR,
        "ADDRESS": input.ADDRESS,
        "PHONE": input.PHONE,
        "EMAILID": input.EMAILID,
        "EDATE": input.EDATE,
        "RDATE": input.RDATE,
        "DDATE": input.DDATE,
        "PDATE": input.PDATE,
        "LINE": input.LINE,
        "GAMOUNT": input.GAMOUNT,
        "GAMOUNT_DISC_TYPE": input.GAMOUNT_DISC_TYPE,
        "DISC_G_PERCENT": input.DISC_G_PERCENT,
        "DISC_GAMOUNT": input.DISC_GAMOUNT,
        "TAX_TYPE": input.TAX_TYPE,
        "TAX_PERCENT": input.TAX_PERCENT,
        "TAX_GAMOUNT": input.TAX_GAMOUNT,
        "SHIP_TYPE": input.SHIP_TYPE,
        "SHIP_PERCENT": input.SHIP_PERCENT,
        "SHIP_GAMOUNT": input.SHIP_GAMOUNT,
        "FINAL_AMOUNT": input.FINAL_AMOUNT,
        "PAID_AMOUNT": input.PAID_AMOUNT,
        "BALANCE": input.BALANCE
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  setVoucherDoc(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation setVoucherDoc($_id:String,$CODE: String,$DESCR: String,$TYPE: String,$STATUS: String,$INVOICE: String,$VENDOR: String,$ADDRESS:[ADDRESS],$PHONE:[PHONE],$EMAILID:[EMAILID],$EDATE: String,$RDATE: String,$DDATE: String,$PDATE: String, $LINE:[LINE], $GAMOUNT: String, $GAMOUNT_DISC_TYPE: String, $DISC_G_PERCENT: String, $DISC_GAMOUNT: String, $TAX_TYPE: String, $TAX_PERCENT: String, $TAX_GAMOUNT: String, $SHIP_TYPE: String, $SHIP_PERCENT: String, $SHIP_GAMOUNT: String, $FINAL_AMOUNT: String, $PAID_AMOUNT: String, $BALANCE: String ) { setVoucherDoc_M(_id:$_id,CODE:$CODE,DESCR:$DESCR,TYPE:$TYPE,STATUS:$STATUS,INVOICE:$INVOICE,VENDOR:$VENDOR,ADDRESS:$ADDRESS,PHONE:$PHONE,EMAILID:$EMAILID,EDATE:$EDATE,RDATE:$RDATE,DDATE:$DDATE,PDATE:$PDATE,LINE:$LINE, GAMOUNT:$GAMOUNT, GAMOUNT_DISC_TYPE:$GAMOUNT_DISC_TYPE, DISC_G_PERCENT:$DISC_G_PERCENT, DISC_GAMOUNT:$DISC_GAMOUNT, TAX_TYPE:$TAX_TYPE, TAX_PERCENT:$TAX_PERCENT, TAX_GAMOUNT:$TAX_GAMOUNT, SHIP_TYPE:$SHIP_TYPE, SHIP_PERCENT:$SHIP_PERCENT, SHIP_GAMOUNT:$SHIP_GAMOUNT, FINAL_AMOUNT:$FINAL_AMOUNT, PAID_AMOUNT:$PAID_AMOUNT, BALANCE:$BALANCE) { CODE message } }",
      "variables": {
        "_id": input._id,
        "CODE": input.CODE,
        "DESCR": input.DESCR,
        "TYPE": input.TYPE,
        "STATUS": input.STATUS,
        "INVOICE": input.INVOICE,
        "VENDOR": input.VENDOR,
        "ADDRESS": input.ADDRESS,
        "PHONE": input.PHONE,
        "EMAILID": input.EMAILID,
        "EDATE": input.EDATE,
        "RDATE": input.RDATE,
        "DDATE": input.DDATE,
        "PDATE": input.PDATE,
        "LINE": input.LINE,
        "GAMOUNT": input.GAMOUNT,
        "GAMOUNT_DISC_TYPE": input.GAMOUNT_DISC_TYPE,
        "DISC_G_PERCENT": input.DISC_G_PERCENT,
        "DISC_GAMOUNT": input.DISC_GAMOUNT,
        "TAX_TYPE": input.TAX_TYPE,
        "TAX_PERCENT": input.TAX_PERCENT,
        "TAX_GAMOUNT": input.TAX_GAMOUNT,
        "SHIP_TYPE": input.SHIP_TYPE,
        "SHIP_PERCENT": input.SHIP_PERCENT,
        "SHIP_GAMOUNT": input.SHIP_GAMOUNT,
        "FINAL_AMOUNT": input.FINAL_AMOUNT,
        "PAID_AMOUNT": input.PAID_AMOUNT,
        "BALANCE": input.BALANCE
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  delVoucherDoc(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation delVoucherDoc($_id:String) { delVoucherDoc_M(_id:$_id) { message } }",
      "variables": {
        "_id": input
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }
  // employee manage page functions
  getEmployee(filterAllDocs?, getOneDoc?) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let formData = !filterAllDocs ? { _id: "", CODE: "", DESCR: '' } : filterAllDocs;
    formData._id = !getOneDoc ? "" : getOneDoc;
    formData.CODE = filterAllDocs && filterAllDocs.CODE ? filterAllDocs.CODE : "";
    formData.DESCR = filterAllDocs && filterAllDocs.DESCR ? filterAllDocs.DESCR : "";

    let graphqlQuery = {
      "query": "query getEmployee($_id: String!,$CODE: String!,$DESCR: String!) { getEmployee_Q(_id: $_id, CODE: $CODE, DESCR: $DESCR) { _id CODE SKEY DESCR MIDDLE_NAME LAST_NAME DOB FATHER_NAME MOTHER_NAME SPOUSE_NAME SDOB ADD_TYPE_1 ADD_LINE_1 ADD_LINE_2 PIN_CODE STATE COUNTRY ADD_TYPE_2 ADD_LINE_12 ADD_LINE_22 PIN_CODE2 STATE2 COUNTRY2 MOBILE1 MOBILE2 EMAIL1 EMAIL2 DEGREE COLLEGE ADD_LINE_C1 ADD_LINE_C2 PIN_CODE_C STATE_C COUNTRY_C REFERENCE_1 REFERENCE_1_ADD REFERENCE_2 REFERENCE_2_ADD JOB_CODE SALARY_CODE LEAVE_CODE message } }",
      "variables": {
        "_id": formData._id,
        "CODE": formData.CODE,
        "DESCR": formData.DESCR
      }
    }
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  setEmployee(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation setEmployee($CODE: String,$SKEY: String,$DESCR: String,$MIDDLE_NAME: String,$LAST_NAME: String,$DOB: String,$FATHER_NAME: String,$MOTHER_NAME: String,$SPOUSE_NAME: String,$SDOB: String,$ADD_TYPE_1: String,$ADD_LINE_1: String,$ADD_LINE_2: String,$PIN_CODE: String,$STATE: String,$COUNTRY: String,$ADD_TYPE_2: String,$ADD_LINE_12: String,$ADD_LINE_22: String,$PIN_CODE2: String,$STATE2: String,$COUNTRY2: String,$MOBILE1: String,$MOBILE2: String,$EMAIL1: String,$EMAIL2: String,$DEGREE: String,$COLLEGE: String,$ADD_LINE_C1: String,$ADD_LINE_C2: String,$PIN_CODE_C: String,$STATE_C: String,$COUNTRY_C: String,$REFERENCE_1: String,$REFERENCE_1_ADD: String,$REFERENCE_2: String,$REFERENCE_2_ADD: String,$JOB_CODE: String,$SALARY_CODE: String,$LEAVE_CODE: String) { setEmployee_M(CODE: $CODE,SKEY: $SKEY,DESCR: $DESCR,MIDDLE_NAME: $MIDDLE_NAME,LAST_NAME: $LAST_NAME,DOB: $DOB,FATHER_NAME: $FATHER_NAME,MOTHER_NAME: $MOTHER_NAME,SPOUSE_NAME: $SPOUSE_NAME,SDOB: $SDOB,ADD_TYPE_1: $ADD_TYPE_1,ADD_LINE_1: $ADD_LINE_1,ADD_LINE_2: $ADD_LINE_2,PIN_CODE: $PIN_CODE,STATE: $STATE,COUNTRY: $COUNTRY,ADD_TYPE_2: $ADD_TYPE_2,ADD_LINE_12: $ADD_LINE_12,ADD_LINE_22: $ADD_LINE_22,PIN_CODE2: $PIN_CODE2,STATE2: $STATE2,COUNTRY2:$COUNTRY2,MOBILE1: $MOBILE1,MOBILE2: $MOBILE2,EMAIL1: $EMAIL1,EMAIL2: $EMAIL2,DEGREE: $DEGREE,COLLEGE: $COLLEGE,ADD_LINE_C1: $ADD_LINE_C1,ADD_LINE_C2: $ADD_LINE_C2,PIN_CODE_C: $PIN_CODE_C,STATE_C: $STATE_C,COUNTRY_C: $COUNTRY_C,REFERENCE_1: $REFERENCE_1,REFERENCE_1_ADD: $REFERENCE_1_ADD,REFERENCE_2: $REFERENCE_2,REFERENCE_2_ADD: $REFERENCE_2_ADD,JOB_CODE: $JOB_CODE,SALARY_CODE: $SALARY_CODE,LEAVE_CODE: $LEAVE_CODE) { CODE message } }",
      "variables": {
        "CODE": input.CODE,
        "SKEY": input.SKEY,
        "DESCR": input.DESCR,
        "MIDDLE_NAME": input.MIDDLE_NAME,
        "LAST_NAME": input.LAST_NAME,
        "DOB": input.DOB,
        "FATHER_NAME": input.FATHER_NAME,
        "MOTHER_NAME": input.MOTHER_NAME,
        "SPOUSE_NAME": input.SPOUSE_NAME,
        "SDOB": input.SDOB,
        "ADD_TYPE_1": input.ADD_TYPE_1,
        "ADD_LINE_1": input.ADD_LINE_1,
        "ADD_LINE_2": input.ADD_LINE_2,
        "PIN_CODE": input.PIN_CODE,
        "STATE": input.STATE,
        "COUNTRY": input.COUNTRY,
        "ADD_TYPE_2": input.ADD_TYPE_2,
        "ADD_LINE_12": input.ADD_LINE_12,
        "ADD_LINE_22": input.ADD_LINE_22,
        "PIN_CODE2": input.PIN_CODE2,
        "STATE2": input.STATE2,
        "COUNTRY2": input.COUNTRY2,
        "MOBILE1": input.MOBILE1,
        "MOBILE2": input.MOBILE2,
        "EMAIL1": input.EMAIL1,
        "EMAIL2": input.EMAIL2,
        "DEGREE": input.DEGREE,
        "COLLEGE": input.COLLEGE,
        "ADD_LINE_C1": input.ADD_LINE_C1code,
        "ADD_LINE_C2": input.ADD_LINE_C2,
        "PIN_CODE_C": input.PIN_CODE_C,
        "STATE_C": input.STATE_C,
        "COUNTRY_C": input.COUNTRY_C,
        "REFERENCE_1": input.REFERENCE_1,
        "REFERENCE_1_ADD": input.REFERENCE_1_ADD,
        "REFERENCE_2": input.REFERENCE_2,
        "REFERENCE_2_ADD": input.REFERENCE_2_ADD,
        "JOB_CODE": input.JOB_CODE,
        "SALARY_CODE": input.SALARY_CODE,
        "LEAVE_CODE": input.LEAVE_CODE
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  setEmployeeDoc(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation setEmployeeDoc($_id:String,$CODE: String,$SKEY: String,$DESCR: String,$MIDDLE_NAME: String,$LAST_NAME: String,$DOB: String,$FATHER_NAME: String,$MOTHER_NAME: String,$SPOUSE_NAME: String,$SDOB: String,$ADD_TYPE_1: String,$ADD_LINE_1: String,$ADD_LINE_2: String,$PIN_CODE: String,$STATE: String,$COUNTRY: String,$ADD_TYPE_2: String,$ADD_LINE_12: String,$ADD_LINE_22: String,$PIN_CODE2: String,$STATE2: String,$COUNTRY2: String,$MOBILE1: String,$MOBILE2: String,$EMAIL1: String,$EMAIL2: String,$DEGREE: String,$COLLEGE: String,$ADD_LINE_C1: String,$ADD_LINE_C2: String,$PIN_CODE_C: String,$STATE_C: String,$COUNTRY_C: String,$REFERENCE_1: String,$REFERENCE_1_ADD: String,$REFERENCE_2: String,$REFERENCE_2_ADD: String,$JOB_CODE: String,$SALARY_CODE: String,$LEAVE_CODE: String) { setEmployeeDoc_M(_id:$_id,CODE: $CODE,SKEY: $SKEY,DESCR: $DESCR,MIDDLE_NAME: $MIDDLE_NAME,LAST_NAME: $LAST_NAME,DOB: $DOB,FATHER_NAME: $FATHER_NAME,MOTHER_NAME: $MOTHER_NAME,SPOUSE_NAME: $SPOUSE_NAME,SDOB: $SDOB,ADD_TYPE_1: $ADD_TYPE_1,ADD_LINE_1: $ADD_LINE_1,ADD_LINE_2: $ADD_LINE_2,PIN_CODE: $PIN_CODE,STATE: $STATE,COUNTRY: $COUNTRY,ADD_TYPE_2: $ADD_TYPE_2,ADD_LINE_12: $ADD_LINE_12,ADD_LINE_22: $ADD_LINE_22,PIN_CODE2: $PIN_CODE2,STATE2: $STATE2,COUNTRY2:$COUNTRY2,MOBILE1: $MOBILE1,MOBILE2: $MOBILE2,EMAIL1: $EMAIL1,EMAIL2: $EMAIL2,DEGREE: $DEGREE,COLLEGE: $COLLEGE,ADD_LINE_C1: $ADD_LINE_C1,ADD_LINE_C2: $ADD_LINE_C2,PIN_CODE_C: $PIN_CODE_C,STATE_C: $STATE_C,COUNTRY_C: $COUNTRY_C,REFERENCE_1: $REFERENCE_1,REFERENCE_1_ADD: $REFERENCE_1_ADD,REFERENCE_2: $REFERENCE_2,REFERENCE_2_ADD: $REFERENCE_2_ADD,JOB_CODE: $JOB_CODE,SALARY_CODE: $SALARY_CODE,LEAVE_CODE: $LEAVE_CODE) { CODE message } }",
      "variables": {
        "_id": input._id,
        "CODE": input.CODE,
        "SKEY": input.SKEY,
        "DESCR": input.DESCR,
        "MIDDLE_NAME": input.MIDDLE_NAME,
        "LAST_NAME": input.LAST_NAME,
        "DOB": input.DOB,
        "FATHER_NAME": input.FATHER_NAME,
        "MOTHER_NAME": input.MOTHER_NAME,
        "SPOUSE_NAME": input.SPOUSE_NAME,
        "SDOB": input.SDOB,
        "ADD_TYPE_1": input.ADD_TYPE_1,
        "ADD_LINE_1": input.ADD_LINE_1,
        "ADD_LINE_2": input.ADD_LINE_2,
        "PIN_CODE": input.PIN_CODE,
        "STATE": input.STATE,
        "COUNTRY": input.COUNTRY,
        "ADD_TYPE_2": input.ADD_TYPE_2,
        "ADD_LINE_12": input.ADD_LINE_12,
        "ADD_LINE_22": input.ADD_LINE_22,
        "PIN_CODE2": input.PIN_CODE2,
        "STATE2": input.STATE2,
        "COUNTRY2": input.COUNTRY2,
        "MOBILE1": input.MOBILE1,
        "MOBILE2": input.MOBILE2,
        "EMAIL1": input.EMAIL1,
        "EMAIL2": input.EMAIL2,
        "DEGREE": input.DEGREE,
        "COLLEGE": input.COLLEGE,
        "ADD_LINE_C1": input.ADD_LINE_C1code,
        "ADD_LINE_C2": input.ADD_LINE_C2,
        "PIN_CODE_C": input.PIN_CODE_C,
        "STATE_C": input.STATE_C,
        "COUNTRY_C": input.COUNTRY_C,
        "REFERENCE_1": input.REFERENCE_1,
        "REFERENCE_1_ADD": input.REFERENCE_1_ADD,
        "REFERENCE_2": input.REFERENCE_2,
        "REFERENCE_2_ADD": input.REFERENCE_2_ADD,
        "JOB_CODE": input.JOB_CODE,
        "SALARY_CODE": input.SALARY_CODE,
        "LEAVE_CODE": input.LEAVE_CODE
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  delEmployeeDoc(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation delEmployeeDoc($_id:String) { delEmployeeDoc_M(_id:$_id) { message } }",
      "variables": {
        "_id": input
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }
  // salary voucher page functions
  getSalaryVoucher(filterAllDocs?, getOneDoc?) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let formData = !filterAllDocs ? { _id: "", code: "", descr: '' } : filterAllDocs;
    formData._id = !getOneDoc ? "" : getOneDoc;
    formData.code = filterAllDocs && filterAllDocs.code ? filterAllDocs.code : "";
    formData.descr = filterAllDocs && filterAllDocs.descr ? filterAllDocs.descr : "";

    let graphqlQuery = {
      "query": "query getSalaryVoucher($_id: String!,$code: String!,$descr: String!) { getSalaryVoucher_Q(_id: $_id, code: $code, descr: $descr) { _id emplid emplskey empldescr empllastname emplsalcode paiddata code descr bsalary line { frequency ptype payval amount } gamount, message } }",        
      "variables": {
        "_id": formData._id,
        "code": formData.code,
        "descr": formData.descr
      }
    }
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  setSalaryVoucher(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation setSalaryVoucher($emplid:String,$emplskey:String,$empldescr: String,$empllastname: String,$emplsalcode: String,$paiddata: String,$code: String!,$descr: String!,$bsalary: String!,$line:[Line], $gamount: String!) { setSalaryVoucher_M(emplid:$emplid,emplskey:$emplskey,empldescr: $empldescr,empllastname: $empllastname,emplsalcode: $emplsalcode,paiddata: $paiddata,code:$code,descr:$descr,bsalary:$bsalary,line:$line,gamount:$gamount) { code message } }",
      "variables": {
        "emplid": input.emplid,
        "emplskey": input.emplskey,
        "empldescr": input.empldescr,
        "empllastname": input.empllastname,
        "emplsalcode": input.emplsalcode,
        "paiddata": input.paiddata,
        "code": input.code,
        "descr": input.descr,
        "bsalary": input.bsalary,
        "line": input.line,
        "gamount": input.gamount
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  setSalaryVoucherDoc(input) {
    //"query": "mutation setSalaryVoucherDoc($_id:String,$code: String!,$descr: String!,$bsalary: String!,$line:[Line], $gamount: String!) { setSalaryVoucherDoc_M(_id:$_id,code:$code,descr:$descr,bsalary:$bsalary,line:$line,gamount:$gamount) { code message } }",
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation setSalaryVoucherDoc($_id:String,$emplid:String,$emplskey:String,$empldescr: String,$empllastname: String,$emplsalcode: String,$paiddata: String,$code: String!,$descr: String!,$bsalary: String!,$line:[Line], $gamount: String!) { setSalaryVoucherDoc_M(_id:$_id,emplid:$emplid,emplskey:$emplskey,empldescr: $empldescr,empllastname: $empllastname,emplsalcode: $emplsalcode,paiddata: $paiddata,code:$code,descr:$descr,bsalary:$bsalary,line:$line,gamount:$gamount) { code message } }",
      "variables": {
        "_id": input._id,
        "emplid": input.emplid,
        "emplskey": input.emplskey,
        "empldescr": input.empldescr,
        "empllastname": input.empllastname,
        "emplsalcode": input.emplsalcode,
        "paiddata": input.paiddata,
        "code": input.code,
        "descr": input.descr,
        "bsalary": input.bsalary,
        "line": input.line,
        "gamount": input.gamount
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }

  delSalaryVoucherDoc(input) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') ? localStorage.getItem('token') : "" }) };
    let graphqlQuery = {
      "query": "mutation delSalaryVoucherDoc($_id:String) { delSalaryVoucherDoc_M(_id:$_id) { message } }",
      "variables": {
        "_id": input
      }
    };
    return this._http.post(this._graphQLURL, graphqlQuery, httpOptions);
  }
}
