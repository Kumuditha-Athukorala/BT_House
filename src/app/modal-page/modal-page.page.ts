import { Component, OnInit } from '@angular/core';
import {NavParams,ModalController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  myItem = null;
  orderList = [];
  preOrderList = [];
  constructor(private navParams:NavParams, private modelController:ModalController, private alertController:AlertController) { }

  ngOnInit() {
    this.myItem = this.navParams.get('menuItem');
    this.preOrderList = this.navParams.get('orderedItem');
    //this.orderList.push(this.navParams.get('orderedItem'));
  }

  closeModel(){
    this.modelController.dismiss();
  }

 async orderNow(myItem:any){
    let alertOrderNow = this.alertController.create({
      header: 'Order Now', 
      subHeader:'Do you want order '+myItem.name+' ?',     
      message: 'Price:<b> '+'&euro; '+myItem.price+'</b>',
      buttons: [
                {
                  text: "Cancel"
                },
                {
                  text:"Order Now",
                  handler: () =>{
                    this.addToList(myItem)
                  }
                }     
              
              ]

    });
    (await alertOrderNow).present();

  }

  async addToList(item:any){

    this.preOrderList.push(item);
    
    let alertAddToList = this.alertController.create({
      header: 'New Food Item', 
      message:'You have added<b> '+item.name+ '</b> to order list',
      buttons: [{
        text : "ok"
      }]
    });
    (await alertAddToList).present(); 


  }
}
    