import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private alertController : AlertController) {
  }

  
  async viewAddress(){

    let alertAddress = this.alertController.create({
      header: 'Our Current Address',      
      message: 'No.26 Botanic Road, Glasnevin, Dublin 9',
      buttons: ['OK']

    });
    (await alertAddress).present();
    
  }

  async viewPhone(){

    let alertAddress = this.alertController.create({
      header: 'Our Phone Number',      
      message: '089 499 9999',
      buttons: ['OK']

    });
    (await alertAddress).present();
    
  }

  async viewMail(){

    let alertAddress = this.alertController.create({
      header: 'Our E-mail',      
      message: 'info@bthouse.ie',
      buttons: ['OK']

    });
    (await alertAddress).present();
    
  }

}
