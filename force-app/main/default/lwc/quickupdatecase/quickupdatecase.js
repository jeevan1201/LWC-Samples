/* eslint-disable no-alert */
import { LightningElement, track, api } from 'lwc';

export default class Quickupdatecase extends LightningElement {
    @track editCase = false;
    @api recordId;

    editcase(){
        this.editCase = true;
    }

    handleSuccess(){
        this.editCase = false;
    }
}