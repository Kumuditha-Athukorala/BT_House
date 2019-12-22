import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {ModalPagePage} from '../modal-page/modal-page.page';
import {OrderPage} from '../order/order.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})



export class Tab2Page {

  public items:any;
  public uniqueType:any;
  public uniqueMeal:any; 
  public searchItemList=[]; 
  public emptyList =[];
  public orderList = [];

  constructor(public navCtrl:NavController, public http:HttpClient,public alertController:AlertController,public modalController: ModalController) {
    this.getData();
    
  }

  async getData(){
    let url = 'https://api.myjson.com/bins/19h14w';
    let data :Observable<any> = this.http.get(url);
    data.subscribe(result =>{
      
      this.items = result;
      //console.log(result);
      this.getUniqueTypes();
      this.getuniqueMeals();
    });
   
  }

  async getUniqueTypes(){
    let typeList=[];
    let i:any;   

     for (i = 0; i < this.items.length; i++) {        
        typeList.push(this.items[i].type);
     }
     
    let  unique = (value:any, index:any, self:any) => {
      return self.indexOf(value) === index;
    }   

     this.uniqueType = typeList.filter(unique);
     
  }

  async getuniqueMeals(){
    let mealList=[];
    let i:any;   

     for (i = 0; i < this.items.length; i++) {        
       mealList.push(this.items[i].meal);
     }
     
     let  unique = (value:any, index:any, self:any) => {
      return self.indexOf(value) === index;
    } 
    this.uniqueMeal = mealList.filter(unique);
     console.log(this.uniqueMeal);
  }
  

  async searchFood(fdType:any,fdMeal:any){

    //this.getData();
   
    console.log(fdType);
    console.log(fdMeal);    

    if(this.items.length > this.searchItemList.length){
      let i:any;
      for(i = 0; i < this.items.length; i++){

        if(fdType==this.items[i].type || fdMeal==this.items[i].meal){
            this.searchItemList.push(this.items[i]);
        }
       
      }
      this.items = this.searchItemList;
      
    }else{
      this.items = this.emptyList;
      this.getData();
      let i:any;
      for(i = 0; i < this.items.length; i++){

        if(fdType==this.items[i].type || fdMeal==this.items[i].meal){
            this.searchItemList.push(this.items[i]);
        }
      }
      this.items = this.searchItemList;
     
    }    
    

  }


  async orderNow(item:any){
    //let myItem = this.items[item.id]
    console.log(item);
    let alertOrderNow = this.alertController.create({
      header: 'Order Now', 
      subHeader:'Do you want order '+item.name+' ?',     
      message: 'Price:<b> '+'&euro; '+item.price+'</b>',
      buttons: [
                {
                  text: "Cancel"
                },
                {
                  text:"Order Now",
                  handler: () =>{
                    this.addToList(item)
                  }
                }     
              
              ]

    });
    (await alertOrderNow).present();
  }

  

  async addToList(item:any){

    this.orderList.push(item);

    let alertAddToList = this.alertController.create({
      header: 'New Food Item', 
      message:'You have added<b> '+item.name+ '</b> to order list',
      buttons: [{
        text : "ok"
      }]
    });
    (await alertAddToList).present(); 


  }


  async viewMore(item:any){
     
    const model = await this.modalController.create({
      component: ModalPagePage,
      componentProps: {
        menuItem:item,
        orderedItem:this.orderList
      }

    });
    model.present();
  }

  async viewMyOrders(){
     
    const orderModel = await this.modalController.create({
      component: OrderPage,
      componentProps: {
        orderItems:this.orderList
      }

    });
    orderModel.present();
  }
}



