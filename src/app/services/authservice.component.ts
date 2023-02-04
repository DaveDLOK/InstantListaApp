import {  Injectable } from '@angular/core';
import { ApiService } from './apiservice.component';
import { shareReplay, tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import * as moment from "moment";   
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { TokenJWT } from '../models/token-jwt.model';

@Injectable()
export class AuthService {
    private tokenSubject: BehaviorSubject<TokenJWT> = new BehaviorSubject<TokenJWT>(null);
    public token: Observable<TokenJWT>;

    constructor(private apiService: ApiService,) {
    }
    
    public get tokenValue(): TokenJWT {
        return this.tokenSubject.value;
    }

    login(email:string, password:string ) {
        return this.apiService.login(email, password).pipe(tap(res => {
            this.setSession(res);
            this.tokenSubject.next(res)
            this.startRefreshTokenTimer();
        }),shareReplay());
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'second');
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
        localStorage.setItem("userNumber",authResult.userNumber);
    }          

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    

    refreshToken() {
        var idToken:string = localStorage.getItem('id_token');
        return this.apiService.refresh(idToken)
            .pipe(map((token) => {
                this.setSession(token);
                this.tokenSubject.next(token);
                this.startRefreshTokenTimer();
                return token;
            }));
    }

    // helper methods

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.tokenValue.idToken.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
