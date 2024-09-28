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
    }
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

}
