import { inject, Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private oAuthService = inject(OAuthService);
  private router = inject(Router);

  constructor() {
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
      console.log("es valido",this.oAuthService.hasValidAccessToken());
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

}
