import { Component, OnInit } from '@angular/core';
import { ProductoService } from './../servicio/producto.service';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements ViewDidEnter {
  

  constructor(
    public proS: ProductoService
  ) { }
  ionViewDidEnter(): void {
    this.proS.consultarProductos();
    this.proS.retroceder();

    
  }

  

  ngOnInit() {
  }

}
