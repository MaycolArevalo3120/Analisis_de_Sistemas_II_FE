import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from "../../../shared/title/title.component";

interface Project {
  id: number;
  title: string;
  assignedTo: string;
  state: string;
  areaPath: string;
}

@Component({
  selector: 'app-project-table',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.css'
})
export default class ProjectTableComponent {
  projects: Project[] = [
    { id: 47, title: 'Reestructuración de CUs', assignedTo: 'MAYCOL JEFERSON AREVALO BORRAYO', state: 'Committed', areaPath: 'proyecto2' },
    { id: 48, title: 'Reestructuración', assignedTo: 'ANGEL ENRIQUE JUAREZ', state: 'To Do', areaPath: 'proyecto2' },
    { id: 24, title: 'Sistema de Gestión de Proyectos', assignedTo: 'MAYCOL JEFERSON AREVALO BORRAYO', state: 'In Progress', areaPath: 'proyecto2' },
    { id: 25, title: 'Casos de Uso', assignedTo: 'MAYCOL JEFERSON AREVALO BORRAYO', state: 'In Progress', areaPath: 'proyecto2' }
  ];
}
