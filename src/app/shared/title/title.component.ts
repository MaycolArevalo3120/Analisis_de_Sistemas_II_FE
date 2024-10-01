import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {


  /**
  * El required nos permite hacer que el atributo que se le pase sea obligatorio
  * */
  @Input({required: true})title!: string ;

  /**
   * Los inputs son elementos que pueden llegar a ser solicitados desde el html, con elque
   * les podemos pasar parametros.
  * */
  @Input({transform: booleanAttribute}) withShadow:boolean =false;
}

