import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidemenuComponent } from "../shared/sidemenu/sidemenu.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,//Cada stand alone es como un pequeño módulo que se puede cargar de forma independiente
  imports: [
    CommonModule,RouterModule,SidemenuComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * para poder utilizar el componente en la parte de rutas con el loasComponent
 * se debe de exportar la clase del componente así como colocar default en la exportación
 * para que pueda ser importado
 * */
export default class DashboardComponent { }
