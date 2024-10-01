import { Component, inject, signal } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

type Grade = 'A'|'B'|'F';
@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [TitleComponent,CommonModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export default class ProyectosComponent {
  private router = inject(Router);
  public showContent = signal(false);
  public grade = signal<Grade>('A');
  public toggleContent () {
    this.showContent.update(value => !value);
    this.grade.set("A")
  }

  redirectToPage() {
    this.router.navigate(['/dashboard/proyect-table']);
  }
}
