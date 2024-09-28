import { Component, inject, OnInit } from '@angular/core';
import { routes } from '../../app.routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent  implements OnInit{
  private authService = inject(MasterService);
  private router = inject(Router);
  isMenuVisible: boolean = true;

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  name: string | undefined;
  email: string | undefined;
  picture: string | undefined;
  givenName: string | undefined;
  familyName: string | undefined;
  ngOnInit(): void {
    this.showData();
  }

  public menuItems  = routes
  .map(route => route.children??[])
  .flat()
  .filter(route => route && route.path)
  .filter(route => !route.path?.includes('login'))

  showData() {
    const profile = this.authService.getProfile();
    
    if (profile) {
      // Asignar las propiedades del perfil a las variables
      this.name = profile['name'];
      this.email = profile['email'];
      this.picture = profile['picture'];
      this.givenName = profile['given_name'];
      this.familyName = profile['family_name'];
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  
}
