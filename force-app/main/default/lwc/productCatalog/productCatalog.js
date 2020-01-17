import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import getProducts from '@salesforce/apex/QueryProductList.getProducts';

const DELAY = 300;

export default class ProductCatalog extends NavigationMixin(LightningElement) {
    searchKey = '';
    @wire(CurrentPageReference) pageRef;
    @wire(getProducts, {searchKey: '$searchKey'})
    products;

    handleChange(event){
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, DELAY);
    }

    navigateToDetail(event){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                actionName: "view",
                recordId: event.currentTarget.dataset.id,
                objectApiName: "Product2"
            }
        });
    }

    addToCart(event){
        // eslint-disable-next-line no-console
        console.log('Button Clicked: '+ event.currentTarget.dataset.id);
        const prodId = event.currentTarget.dataset.id;
        const product = this.products.data.find( obj => obj.Id === prodId);
        
        let productObj = {
            productId : product.Product2.Id,
            quantity: 1,
            price : product.UnitPrice,
            productName : product.Product2.Name,
            pricebookentryid : product.Id,
            pricebookid : product.Pricebook2Id
        };
        fireEvent(this.pageRef, 'addToCart', productObj);
    }
}