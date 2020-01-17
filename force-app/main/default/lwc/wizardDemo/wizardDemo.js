/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable vars-on-top */
/* eslint-disable no-console */
import { track, LightningElement } from 'lwc';

export default class WizardDemo extends LightningElement {
    @track currentStep = '1';
    @track createClaim = false;
    @track optyId = '0062E00001GUILqQAP';

    quickCreate(e){
        this.createClaim = true;
    }

    createNewOpty(e){
        console.log('Handle new OPty Event');
        this.createClaim = true;
        this.currentStep = '1';
        this.optyId = '';
    }

    moveNextStep(e){
        const details = e.detail;
        this.optyId = details.optyId;
        this.currentStep = details.nextStep;
        console.log(this.currentStep);
    }

    handleNavigation(e){
        console.log('Handle Navigation'+ this.currentStep);
        console.log('e.detail.move'+ e.detail.move);
        if(e.detail.move === 'prev' && this.currentStep !== '1'){
            const moveBack = parseInt(this.currentStep) - 1;
            this.currentStep = moveBack.toString();
        }
        if(e.detail.move === 'next' && this.currentStep !== '3'){
            const moveForward = parseInt(this.currentStep) + 1;
            this.currentStep = moveForward.toString();
        }
        console.log('Navigate');
    }

    get isCurrentState1(){
        return this.currentStep === '1';
    }
    get isCurrentState2(){
        return this.currentStep === '2';
    }
    get isCurrentState3(){
        return this.currentStep === '3';
    }

    selectStep(event){
        console.log(event.detail.index);
        this.currentStep = (event.detail.index + 1).toString();
    }
}