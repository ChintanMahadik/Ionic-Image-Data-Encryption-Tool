import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import {FileChooser} from '@ionic-native/file-chooser'
import {File} from '@ionic-native/file'

/**
 * Generated class for the RetrievePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-retrieve',
  templateUrl: 'retrieve.html',
})
export class RetrievePage {
  
  user={} as User;
  public base64Image:string;
  public file_uri:string;
  public code_From_file:string;
  private message:string;

  constructor(private file:File,private alertCntrl:AlertController, public navCtrl: NavController, public navParams: NavParams,private filechooser:FileChooser) {
    this.base64Image='./assets/imgs/output.jpg';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RetrievePage');
  }


  covert_string_to_image(user:User){
    this.base64Image=user.code;
    user.decoded_message=this.message;

  }


  browseFile(user:User){

    this.filechooser.open().then(uri=>{
      this.file_uri=uri;
      

      var i:number;
      var index:number;
           index=0;
      for(i=uri.length;i>=0;i--){
        if(uri.charAt(i)=='/'){
          break;
        }
        index++;
      }
      var file_name:string;
      file_name=this.file_uri.slice(uri.length-index+1,);
      this.file_uri=this.file_uri.slice(0,-index+1);

      let alert=this.alertCntrl.create({
        title:file_name,
        subTitle:this.file_uri,
       buttons:['Ok']
      });
      alert.present();

      this.file.readAsText(this.file_uri,file_name).then(data=>{
        user.code=data;
        var last_index:number;
        var last_digit:number;
        var image:string;
        var i:number;
        var k:number;
        var c:number;
        c=0;
        last_index=data.length-1;

        for(i=last_index;i>0;i--)
        {
          if(data.charAt(i)==" "){
            k=i;
            break;
          }
          c++;
        }
        
        
        last_digit=Number(data.slice(k,));
       
        image=data.slice(0,-last_digit-c-1);
        this.message=data.slice(data.length-last_digit-1-c,-c-1);


        user.code=image;

      }).catch(e=>{
        
      });



    }).catch(e=>{
      let alert=this.alertCntrl.create({
        title:'No URI',
        subTitle:'invalid file',
       buttons:['Ok']
      });
      alert.present();
    })
  }
}
