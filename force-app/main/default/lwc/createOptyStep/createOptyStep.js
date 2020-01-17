/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { LightningElement, api } from 'lwc';
import OPTY_OBJECT from '@salesforce/schema/Opportunity';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import CLOSEDDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import ACCOUNT_FIELD from '@salesforce/schema/Opportunity.AccountId';

export default class CreateOptyStep extends LightningElement {
    @api optyId;
    optyObject = OPTY_OBJECT;
    nameField = NAME_FIELD;
    closeDateField = CLOSEDDATE_FIELD;
    amountField = AMOUNT_FIELD;
    stageField = STAGE_FIELD;
    accountField = ACCOUNT_FIELD;

    get OptyExists(){
        if(this.optyId === ''){
            return true;
        }
        return false;
    }

    handleOptyCreated(e){
        console.log(e.detail.id);
        const optyCreated = new CustomEvent('optycreated', {detail : {optyId : e.detail.id, nextStep : '2'}});
        this.dispatchEvent(optyCreated);
    }
}