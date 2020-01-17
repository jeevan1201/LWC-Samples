/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class WizardNavigation extends LightningElement {
    @api laststep;

    navigate(e){
        console.log(e.target.name);
        const nav = new CustomEvent('navigate', {detail: {move : e.target.name}});
        this.dispatchEvent(nav);
    }

    newOptyEvent(e){
        console.log(e.target.name);
        const newOpty = new CustomEvent('newopty');
        this.dispatchEvent(newOpty);
        console.log('New Opty Event dispatched!!!');
    }
}