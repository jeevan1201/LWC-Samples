public class QueryProductList {
    private static String priceBookId;
    static {
        priceBookId = [select Id from Pricebook2 where Name = 'Demo Price Book'].Id;
        System.debug('priceBookId: '+ priceBookId);
    }

    @AuraEnabled(cacheable=true)
    public static List<PricebookEntry> getProducts(String searchKey){
        List<PricebookEntry> prodList = new List<PricebookEntry>();
        System.debug('Inside Function priceBookId: '+ priceBookId);
        if(searchKey == ''){
            prodList = [select Id, UnitPrice, Product2Id, ProductCode, Product2.Id, Product2.Name, Pricebook2Id from PricebookEntry 
            where IsActive = true and Pricebook2Id = :priceBookId];
        }
        else{
            searchKey = '%'+ searchKey +'%';
            System.debug('Inside Search Key: '+ searchKey);
            prodList = [select Id, UnitPrice, Product2Id, ProductCode, Product2.Id, Product2.Name, Pricebook2Id from PricebookEntry 
            where IsActive = true and ProductCode like :searchKey and Pricebook2Id = :priceBookId];
        }
        System.debug('prodList Returned: '+ prodList.size());
        return prodList;
    }

    @AuraEnabled
    public static string createOptyLine(String optyId, String priceBookEntryId, Decimal unitPrice){
        System.debug('Opty Id: '+ optyId +' Price Book Entry Id: '+ priceBookEntryId +' Unit Price: '+ unitPrice);
        OpportunityLineItem oli = new OpportunityLineItem();
        oli.OpportunityId = optyId;
        oli.PricebookEntryId = priceBookEntryId;
        oli.UnitPrice = unitPrice;
        oli.Quantity = 1;
        insert oli;
        return oli.Id;
    }

    @AuraEnabled(cacheable=true)
    public static List<OpportunityLineItem> getOptyLines(String optyId){
        List<OpportunityLineItem> items = [select Id, ProductCode, PricebookEntryId, Quantity, UnitPrice from OpportunityLineItem where OpportunityId = :optyId];
        System.debug('Items Size: '+ items.size());
        return items;
    }   
}