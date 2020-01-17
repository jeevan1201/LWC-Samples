import { LightningElement, wire, api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import optyItems from '@salesforce/apex/QueryProductList.getOptyLines';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    { label: 'Product Code', fieldName: 'ProductCode' },
    { label: 'Unit Price', fieldName: 'UnitPrice', type: 'currency', cellAttributes: { alignment: 'left' } },
    {
        label: 'Action',
        type: 'button-icon', typeAttributes: {
            iconName: 'utility:delete',
            name: 'Add',
            title: 'Add',
            disabled: false
        }
    }

];

export default class OpportunityItems extends LightningElement {
    @api optyId;
    columns = columns;

    @wire(optyItems, {optyId : '$optyId'})
    items;

    get datafromServer(){
        return JSON.stringify(this.items);
    }

    @api
    optyItemAdded(){
        return refreshApex(this.items);
    }

    handleDeleteClick(e){
        const Id = e.detail.row.Id;
        deleteRecord(Id)
        .then(() =>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Success',
                    message : 'Opportunity Item Deleted.',
                    variant : 'success'
                })
            );
            refreshApex(this.items);
        });
    }

}