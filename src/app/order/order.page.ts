import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController, AlertController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  myOrderList = [];
  tot:any;
  constructor(private navParams:NavParams, private modelController:ModalController, private alertController:AlertController,
    private sms:SMS, private vibration:Vibration) { 

  }

  ngOnInit() {
    this.myOrderList = this.navParams.get('orderItems');
    let x=0; 
    let i:any;
    for(i=0;i<this.myOrderList.length;i++){
        x = x + this.myOrderList[i].price;
        console.log(this.myOrderList[i].price);
    }
    this.tot = x.toFixed(2);   
    console.log(this.tot);
  }

  closeOrderModel(){
    this.modelController.dismiss();
  }


  async processOrder(prList:any){
    //let myItem = this.items[item.id]
    console.log(prList);
    let alertOrderNow = this.alertController.create({
      header: 'Order Now', 
      subHeader:'Do you want order these food items?',     
      buttons: [
                {
                  text: "Cancel"
                },
                {
                  text:"Confirm",
                  handler: () =>{
                    this.getUserInputs();
                  }
                }     
              
              ]

    });
    (await alertOrderNow).present();
  }
  
  async getUserInputs(){

    let userInputAlert = this.alertController.create({
      header: 'Please Fill Your Details', 
      inputs: [
        {
          name: 'name',
          placeholder: 'Your Name'
        },
        {
          name: 'mobileNumber',
          placeholder: 'Your Mobile Number',
          type: 'number'
        },
        {
          name: 'address',
          placeholder: 'Your Delivery Address'
          
        },

      ],
      buttons: [
        {
          text: 'Cancel'          
        },
        {
          text:"Confirm",
          handler: data => {
            this.checkUserInputs(data.name,data.mobileNumber,data.address);
          }
        }   
      ]

    });
    (await userInputAlert).present();

  }


  async checkUserInputs(name:any,number:any,address:any){
    console.log(name,number,address);
    if(name.trim().length <= 0 || number.trim().lenght <= 0 || address.trim().length <= 0 ){
        console.log("wrong..!");
      let wrongAlert = this.alertController.create({
        header: 'Input details are incorrect..!  Please try again..!', 
        buttons: [
          {
            text: 'Cancel'          
          },
          {
            text:"try again",
            handler: () =>{
              this.getUserInputs();
            }
          }   
        ]
        
      });
      (await wrongAlert).present();


    }else {
        console.log("valied..!");
        this.confirmOrder(number);
        this.addVibration();
    }   

}

async confirmOrder(phoneNumber:any){
console.log(phoneNumber);
  let confirmUserAlert = this.alertController.create({
    header: 'Order Placed..!', 
    subHeader:'Your order has been placed successfully..!',  
    message:'Please check your Inbox please..!',   
    buttons: [
              {
                text: "ok",
                handler: () =>{
                  console.log(phoneNumber);
                  this.sendMessage(phoneNumber);
                }
              }     
            
            ]

  });
  (await confirmUserAlert).present();
  this.myOrderList.length =0;
}

async sendMessage(phoneNumber:any){
  this.sms.send(phoneNumber,'Bt House Received your order..! Thank you.!');
}

async addVibration(){
  this.vibration.vibrate(1500);
}


}
