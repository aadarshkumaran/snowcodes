(function executeRule(current, previous /*null when async*/ ) {

    //When to run : async and insert
    // servicenow to jira integration and creation of issue (business rule code)
    // Add your code here
    try {
        var r = new sn_ws.RESTMessageV2('JiraIntegrationEndpoint2', 'create jira ticket');
        r.setStringParameterNoEscape('short_description', current.short_description);

        //override authentication profile 
        //authentication type ='basic'/ 'oauth2'
        //r.setAuthenticationProfile(authentication type, profile name);

        //set a MID server name if one wants to run the message on MID
        //r.setMIDServer('MY_MID_SERVER');

        //if the message is configured to communicate through ECC queue, either
        //by setting a MID server or calling executeAsync, one needs to set skip_sensor
        //to true. Otherwise, one may get an intermittent error that the response body is null
        //r.setEccParameter('skip_sensor', true);

        var response = r.execute();
        var responseBody = response.getBody();
        var httpStatus = response.getStatusCode();
    } catch (ex) {
        var message = ex.message;
    }

})(current, previous);