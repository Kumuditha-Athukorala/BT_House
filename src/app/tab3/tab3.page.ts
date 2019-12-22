import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public imgItems:any;
  constructor(private http:HttpClient,private photoViewer: PhotoViewer) {
    this.getData();
  }

  async getData(){
    let url = 'https://api.myjson.com/bins/15zkbc';
    let data :Observable<any> = this.http.get(url);
    data.subscribe(result =>{
      
      this.imgItems = result;
      console.log(this.imgItems);
    });
   
  }

  async previewImage(url:any){

    console.log(url);  

    this.photoViewer.show(url, 'BT Food Item', {share: false});
  }

}
