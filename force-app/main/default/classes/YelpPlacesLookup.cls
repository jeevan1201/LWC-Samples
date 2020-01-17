public class YelpPlacesLookup {
    private static string sAPI = 'fSJSIh1n1hDD-N08hp3oRasXy9ZQC2JNJEEFkJKOaMLjMuLfN8yxlaBk7eCrsbjzr73vBSQ9mUadBBOa_RSJ1A60NUfse9KKEHxzZvNJUZY04QaYJCkt6pXkC44gXnYx';
    
    @AuraEnabled
    public static string LookupPlaces(String PlaceType, String Location){
        String sEndPoint = 'https://api.yelp.com/v3/businesses/search?term='+ 
                            PlaceType +'&location='+ Location +'&sort_by=rating';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setHeader('Authorization', 'Bearer ' + sAPI);
        request.setMethod('GET');
        request.setEndpoint('callout:YelpPlaces'+ '?term='+ 
                            PlaceType +'&location='+ Location +'&sort_by=rating');

        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
            System.debug(response.getBody());
            YelpResponse resp = (YelpResponse) System.JSON.deserialize(response.getBody(), YelpResponse.class);
            return JSON.serialize(resp);
        }
        else{
            return 'Error Processing the Request.';
        }
    }
}
