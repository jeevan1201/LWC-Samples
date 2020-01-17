import { LightningElement, api, wire } from 'lwc';
import getOptyLines from '@salesforce/apex/QueryProductList.getOptyLines';
import OPTY_OBJECT from '@salesforce/schema/Opportunity';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import CLOSEDDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import ACCOUNT_FIELD from '@salesforce/schema/Opportunity.AccountId';

export default class DisplayOptySummary extends LightningElement {
    @api optyId;
    optyLineItems = [];
    optyObject = OPTY_OBJECT;
    nameField = NAME_FIELD;
    closeDateField = CLOSEDDATE_FIELD;
    amountField = AMOUNT_FIELD;
    stageField = STAGE_FIELD;
    accountField = ACCOUNT_FIELD;

    @wire(getOptyLines, {optyId : '$optyId'})
    optyLineItems;
}