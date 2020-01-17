/* eslint-disable no-console */
import { LightningElement, wire, api, track } from 'lwc';
import getProducts from '@salesforce/apex/QueryProductList.getProducts';
import createOptyItem from '@salesforce/apex/QueryProductList.createOptyLine';
const columns = [
    { label: 'Product Code', fieldName: 'ProductCode' },
    { label: 'Unit Price', fieldName: 'UnitPrice', type: 'currency', cellAttributes: { alignment: 'left' } },
    {
        label: 'Action',
        type: 'button-icon', typeAttributes: {
            iconName: 'utility:add',
            name: 'Add',
            title: 'Add',
            disabled: false
        }
    }

];
const DELAY = 300;

export default class DisplayProductList extends LightningElement {
    @track key = '';
    @track columns = columns;
    @api optyId;

    @wire(getProducts, { searchKey: '$key' })
    products;

    handleKeyChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.key = searchKey;
        }, DELAY);
    }

    handleAddClick(e){
        console.log('Button Clicked '+ e.detail.action.name);
        const priceBookEntryId = e.detail.row.Id;
        const unitPrice = e.detail.row.UnitPrice;
        createOptyItem({optyId : this.optyId, priceBookEntryId : priceBookEntryId, unitPrice : unitPrice})
        .then(result => {
            console.log('Success creating line item: '+ result);
            const itemAdded = new CustomEvent('itemadded');
            this.dispatchEvent(itemAdded);
        })
        .catch(error => {
            console.log('Error creating line item: '+ JSON.stringify(error));
        });

    }
}