import { inject, Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private oAuthService = inject(OAuthService);
  private router = inject(Router);

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.initConfigurations();
  }

  initConfigurations() {
    if (typeof window !== 'undefined') {  // Verifica si "window" está disponible
      const authConfig: AuthConfig = {
        issuer: 'https://accounts.google.com',
        strictDiscoveryDocumentValidation: false,
        clientId: '951477395189-q2joajm8jlrp7mbs3p53ob8t7bebhb0p.apps.googleusercontent.com',
        redirectUri: window.location.origin + '/dashboard', // Aquí es donde usas "window"
        scope: 'openid profile email',
      };
      this.oAuthService.configure(authConfig);
      this.oAuthService.setStorage(localStorage);
      this.oAuthService.setupAutomaticSilentRefresh();
      this.oAuthService.loadDiscoveryDocumentAndTryLogin();
      //console.log( this.oAuthService.getIdToken() );
      this.decodeToken();
      this.handleLogin();
    }
  }

  private decodeToken(){
    const token = this.oAuthService.getIdToken();
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      console.log(decodedPayload);
      console.log("es valido",this.oAuthService.getIdToken());
      return JSON.parse(decodedPayload);
    }
    return null
  }
  

  login(){
    this.oAuthService.initImplicitFlow();
  };

  logout(){
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  };

  getProfile(){
    return this.oAuthService.getIdentityClaims();
  };

  getToken(){
    return this.oAuthService.getAccessToken();
  };

  handleLogin(){
    if (this.oAuthService.hasValidAccessToken()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
    sessionStorage.setItem("loggerdInUser", this.getToken())
    sessionStorage.setItem('hasReloadeds', 'ture');;
  }
  getTokensGoogle(){  
    return this.oAuthService.getIdToken();
  }

  loginBackEnd(credentials: any) {
    return this.http.post<any>('http://localhost:8081/analisis-sistemas/api/publico/authenticate', credentials)
      .pipe(
        map(response => {
          this.cookieService.set('jwt', response.jwt, { expires: new Date(response.expires * 1000) });
          this.isAuthenticatedSubject.next(true);
          return response;
        })
      );
  }
  logoutBackend() {
    this.cookieService.delete('jwt');
    this.isAuthenticatedSubject.next(false);
  }

  // Método para verificar si el token es válido (opcional)
  // Puedes implementar una lógica para verificar la validez del token, por ejemplo,
  // enviando una petición al servidor
  isAuthenticated() {
    // ... Lógica para verificar la validez del token
    return this.isAuthenticatedSubject.value;
  }

}
