import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    providers: [UsersService],
})
export class UserListComponent implements OnInit {
    constructor(private _usersService: UsersService, private toastr: ToastrService, private _router: Router) {}
    @BlockUI() blockUI: NgBlockUI;
    data: any[];
    rowsOnPage = 5;
    getUsers() {
        this.blockUI.start();
        this._usersService.getUsers().subscribe(
            res => {
                if (true == res.flag && null !== res.flag) {
                    if (res.data.length > 0) {
                        this.data = res.data;
                        this.blockUI.stop();
                    } else {
                        this.blockUI.stop();
                        this.data = [];
                        this.toastr.warning(res.message);
                    }
                } else {
                    this.blockUI.stop();
                    this.toastr.warning(res.message);
                }
            },
            error => {
                this.blockUI.stop();
                this.toastr.error('Something went wrong');
            });
    }
    ngOnInit() {
        this.getUsers()
    }
    add() {
        this._router.navigate(['/users/create']);
    }
}
