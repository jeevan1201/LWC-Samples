import { LightningElement, track, api } from 'lwc';
import yelpPlaces from '@salesforce/apex/YelpPlacesLookup.LookupPlaces';

export default class YelpPlacesLookup extends LightningElement {

    @track message = {};
    @api recordId;

    connectedCallback(){
        this.loadPlaces();
    }

    loadPlaces(){
        yelpPlaces({ PlaceType: 'Restaurant', recordId : this.recordId })
        .then(data => {
            this.message = JSON.parse(data);
        });
    }
}