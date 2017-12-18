import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {UsersService} from '../users.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css'],
    providers: [UsersService],
})
export class UserCreateComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    model: any = {};
    responseStatus: Object = [];
    response: any = {};
    public form: FormGroup;
    id: number;

    constructor(private _avRoute: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private _usersService: UsersService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.id = parseInt(this._avRoute.snapshot.params["id"]);
        }
    }
    ngOnInit() {
        if (this.id && 0 != this.id) {
            this._avRoute
                .data
                .subscribe(res => {
                    this.model = res.userDetail.user
                    if (this.model && this.model.date_of_birth) {
                        var d = new Date(this.model.date_of_birth);
                        var month = ("0" + (d.getMonth() + 1)).slice(-2);  //months from 1-12
                        var day = ("0" + d.getDate()).slice(-2);
                        var year = d.getFullYear();
                        var newdate = year + "-" + month + "-" + day;
                        this.model.date_of_birth = newdate;
                    }
                },
            );
        }
        this.form = this.fb.group({
            first_name: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
            last_name: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
            mobile: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]{1,10}')])],
            email: [null, Validators.compose([Validators.required, Validators.maxLength(100), Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],              // EMAIL_REGEX: "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,                //NUMBERS_ONLY: '^[0-9]*                //PHONE_NO: '^[0-9]{1,10}$',
            location: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
            age: [null, Validators.compose([Validators.required, Validators.min(0)])],
            date_of_birth: [null, Validators.compose([Validators.required])],
        });
    }
    createUser() {
        var dateabc = this.model.date_of_birth;
        var d = new Date();
        var birth_date = dateabc + ' ' + ("0" + d.getHours()).slice(-2) + ':' + ("0" + d.getMinutes()).slice(-2) + ':' + ("0" + d.getSeconds()).slice(-2);
        var utc_date = new Date(birth_date).toUTCString();
        this.model.date_of_birth = new Date(utc_date);
        this.blockUI.start();
        this._usersService.createUser(this.model).subscribe(
            res => {
                if (true == res.flag && null !== res.flag) {
                    this.toastr.success(res.message);
                    this._router.navigate(['users']);
                    this.blockUI.stop();
                } else {
                    this.blockUI.stop();
                    if (res.data.validationCheck) {
                        this.toastr.warning(res.message);
                    } else {
                        this.toastr.error(res.message);
                    }
                }
            },
            err => {
                this.blockUI.stop();
                this.toastr.error('Something went wrong.');
            }
        );
    }

    updateUser() {
        var userId = this.model.id;
        var selectedDate = this.model.date_of_birth;
        var d = new Date();
        var birthDate = selectedDate + ' ' + ("0" + d.getHours()).slice(-2) + ':' + ("0" + d.getMinutes()).slice(-2) + ':' + ("0" + d.getSeconds()).slice(-2);
        var utcDate = new Date(birthDate).toUTCString();
        this.model.date_of_birth = new Date(utcDate);
        this.blockUI.start();
        this._usersService.updateUser(this.model, userId).subscribe(
            res => {
                if (true == res.flag && null !== res.flag) {
                    this.toastr.success(res.message);
                    this._router.navigate(['users']);
                    this.blockUI.stop();
                } else {
                    this.blockUI.stop();
                    if (res.data.validationCheck) {
                        this.toastr.warning(res.message);
                    } else {
                        this.toastr.error(res.message);
                    }
                }
            },
            err => {
                this.blockUI.stop();
                this.toastr.error('Something went wrong.');
            }
        );
    }
}
