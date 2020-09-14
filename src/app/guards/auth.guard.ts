import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router'
import {  NavController, ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private navCtrl: NavController, private storage: Storage ){}
  	canActivate(
    	next: ActivatedRouteSnapshot,
    	state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    	
  		return this.storage.length().then(length => {
	    		if (length != null && length!=undefined && length>=3) { 
	    			// console.log(length)
	    			return true
	    		}else {
	    			// console.log(length)
   					this.navCtrl.navigateRoot('/login');
	    			return false
	    		}

	    	})
 
    }
  
}
