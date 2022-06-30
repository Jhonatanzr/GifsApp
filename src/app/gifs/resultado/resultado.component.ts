import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html'
})
export class ResultadoComponent{

  get resultado(){
    return this.gifsService.resultado;
  }

  get busqueda(){
    return this.gifsService.busqueda;
  }

  constructor( private gifsService: GifsService ) { }
  
}
