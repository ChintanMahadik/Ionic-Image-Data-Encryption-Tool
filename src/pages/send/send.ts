import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {AlertController} from 'ionic-angular';
import { User } from '../../models/user';
import { EmailComposer } from '@ionic-native/email-composer';
import {File, IWriteOptions} from '@ionic-native/file'

@Component({
  selector: 'page-home',
  templateUrl: 'send.html'
})
export class SendPage {

  public base64Image:string;
  public imageLen:number;
  public imageLen_string:string;
  public file_dir:string;
  
  user={} as User;
  
  constructor(private emailComp:EmailComposer, public navCtrl: NavController,private cam:Camera,private alertCntrl:AlertController,private file:File) {
this.base64Image='./assets/imgs/blank.jpg'
  }

  capture_image(user:User){
    this.base64Image=null;
    this.cam.getPicture({
      quality:20,
      sourceType:this.cam.PictureSourceType.CAMERA,
      destinationType:this.cam.DestinationType.DATA_URL,
      encodingType:this.cam.EncodingType.JPEG,
      mediaType:this.cam.MediaType.PICTURE
    }).then((imageData) =>{
      this.base64Image ='data:image/jpeg;base64,'+imageData;
      this.imageLen=this.base64Image.length;
      
            if( this.imageLen > 75000){
              this.base64Image ='./assets/imgs/blank.jpg';
              this.imageLen_string=String(this.imageLen);
              let alert=this.alertCntrl.create({
                title:"File Size is Too Big ",
                subTitle:'Cannot save the file',
               buttons:['Ok']
              });
              alert.present();
            }
            else{
      let directory=this.file.externalApplicationStorageDirectory;
      let options:IWriteOptions={replace:true};
      this.file_dir=directory+user.file_name+".txt";
      this.file.writeFile(directory,user.file_name+".txt",this.base64Image+this.user.message+" "+this.user.message.length,options).then((res:any)=>{
        let alert=this.alertCntrl.create({
          title:directory,
          subTitle:'saved to file',
         buttons:['Ok']
        });
        alert.present();
      },(error)=>{
        let alert=this.alertCntrl.create({
          title:"Cannot save File",
          subTitle:'invalid dir',
         buttons:['Ok']
        });
        alert.present();
      });
    }
//this.encrypt= this.fileEncrypt.encrypt(this.base64Image,'chintan');
    },(err) =>{
      console.log(err);
    });
  }

  Open_image_gallery(user:User){

    this.cam.getPicture({
      quality:20,
      sourceType:this.cam.PictureSourceType.PHOTOLIBRARY,
      destinationType:this.cam.DestinationType.DATA_URL,
      encodingType:this.cam.EncodingType.JPEG,
      mediaType:this.cam.MediaType.PICTURE
    }).then((imageData) =>{

      this.base64Image ='data:image/jpeg;base64,'+imageData;
      this.imageLen=this.base64Image.length;

    if( this.imageLen > 75000){
        this.base64Image ='./assets/imgs/blank.jpg';
        this.imageLen_string=String(this.imageLen);
        let alert=this.alertCntrl.create({
          title:"File Size is Too Big ",
          subTitle:'Cannot save the file',
         buttons:['Ok']
        });
        alert.present();
      }
    else{

      let directory=this.file.externalApplicationStorageDirectory;
      let options:IWriteOptions={replace:true};
      this.file_dir=directory+user.file_name+".txt";
      this.file.writeFile(directory,user.file_name+".txt",this.base64Image+this.user.message+" "+this.user.message.length,options).then((res:any)=>{
        let alert=this.alertCntrl.create({
          title:'Saved to File',
          subTitle:directory,
         buttons:['Ok']
        });
        alert.present();
      },(error)=>{
        let alert=this.alertCntrl.create({
          title:"Cannot save File",
          subTitle:'invalid dir',
         buttons:['Ok']
        });
        alert.present();
      });
      

    }
    },(err) => {
      console.log(err);
    });
  }

  sendData(user:User){
    if(user.message!=null  && user.toemail!=null && user.file_name!=null){
    try{
      let email={
        to:user.toemail,
        subject:'Very Important Message',
        body:"Hi,<br>PFA the secret text for data",
        attachments:[this.file_dir],
        isHtml:true
      };
      this.emailComp.open(email);
    }catch(e){
      let alert=this.alertCntrl.create({
        title:"Failed",
        subTitle:'Try it on android device',
       buttons:['Ok']
      });
      alert.present();
    }
  }
  else{
    let alert=this.alertCntrl.create({
      title:"Data fields are incomplete",
      subTitle:'check if data fields are empty.',
     buttons:['Ok']
    });
    alert.present();
  }
}

}
