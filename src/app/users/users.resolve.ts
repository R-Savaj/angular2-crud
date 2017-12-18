import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {UsersService} from './users.service';

@Injectable()
export class UserResolver implements Resolve<any> {
    @BlockUI() blockUI: NgBlockUI;
    constructor(
        private _userService: UsersService, private router: Router, private toastr: ToastrService
    ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        this.blockUI.start();
        return this._userService.getById(route.params.id)
            .map(res => {
                if (true == res.flag && null !== res.flag) {
                    this.blockUI.stop();
                    return res.data;
                }
                else {
                    this.blockUI.stop();
                    this.toastr.error(res.message);
                    this.router.navigate(['users']);
                }
            })
            .catch(err => {
                this.blockUI.stop();
                this.toastr.error('Something went wrong');
                this.router.navigate(['users']);
                return Observable.of(err);
            });

    }

}