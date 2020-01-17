/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class OptyLineItemsStep extends LightningElement {
    @api optyId;

    refreshOptyItemsComponet(e){
        console.log('This is the event handler: '+JSON.stringify(e));
        this.template.querySelector('c-opportunity-items').optyItemAdded();
    }
}