/* eslint-disable vars-on-top */
/* eslint-disable no-console */
import { track, LightningElement } from 'lwc';

export default class FileUpload extends LightningElement {
    @track fileName='';
    @track fileContent='';

    fileUploadHandle(e){
        this.fileName = e.target.files[0].name;
        var reader = new FileReader();
        reader.onload = event => {
            var content = event.target.result;
            var base64 = 'base64,';
            var dataStart = content.indexOf(base64) + base64.length;
            this.fileContent = content.substring(dataStart);
            
        }
        reader.readAsDataURL(e.target.files[0]);
    }

}