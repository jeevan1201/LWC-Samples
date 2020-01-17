public class QueryRecordsList {
    @AuraEnabled(cacheable=true)
    public static String GetFieldsList(String sObjectName){
        return [SELECT Id, Fields_List__c FROM List_Settings__mdt where DeveloperName= :sObjectName].Fields_List__c;
    }

    @AuraEnabled(cacheable=true)    
    public static List<sObject> QueryData(String sObjectName){
        String sFields = [SELECT Id, Fields_List__c FROM List_Settings__mdt where DeveloperName= :sObjectName].Fields_List__c;
  
        string query = 'SELECT Id, '+ sFields +' FROM '+ sObjectName +' limit 1000';
        List<sObject> data = Database.query(query);
        system.debug(data);
		return data;
    }
}