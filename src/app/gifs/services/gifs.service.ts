import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'sJjaiBrzVRBMboUcxzHWxK99WhTieR19';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultado: Gif[] = [];
  public busqueda: string = '';

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultado = JSON.parse( localStorage.getItem('resultado')! ) || [];
    this.busqueda = localStorage.getItem('busqueda') || '';
  }

  buscarGifs( query: string = '' ){

    query = query.trim().toLowerCase();
    if (query.length === 0){
      return;
    }

    this.busqueda = query;

    if(!this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.slice(0,10);
      localStorage.setItem( 'historial',JSON.stringify( this._historial ) );
    }
    
    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);      

    this.http.get<SearchGifsResponse>(`${ this.serviceUrl }/search`, { params })
        .subscribe( ( resp )  =>{ 
          // console.log( resp.data.length );
          this.resultado = resp.data;
          localStorage.setItem( 'resultado', JSON.stringify( this.resultado ) );
          localStorage.setItem( 'busqueda', query );
        });

  }

  eliminarHistorial(){
    localStorage.clear();
    this._historial = [];
  }

}
