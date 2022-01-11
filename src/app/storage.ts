
import { Injectable } from '@angular/core';

@Injectable()
export class Storage {
    loginResponse:any=[];
    constructor(){
        console.log(this.loginResponse)
    }
}
