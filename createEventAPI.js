(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
    //Creating incident using Scripted REST API
    //set relative path : /createEvent - HTTP method : POST
    var data = request.body.data;
    var outputJSON = {};
    var validate = mandatoryValidation();
    if (validate == true) {
        var gr = new GlideRecord('em_event');
        gr.initialize();
        gr.source = data.Source;
        gr.node = data.Node;
        gr.type = data.Type;
        gr.resource = data.Resource;
        gr.metric_name = data.Metric_Name;
        gr.event_class = data.Event_Class;
        gr.message_key = data.Message_Key;
        gr.severity = data.Severity;
        gr.resolution_state = data.Resolution_State;
        gr.alert = data.Alert;
        gr.description = data.description;
        gr.additional_info = data.Additional_Info;
		gr.processing_notes = data.Processing_Notes;
        gr.insert();
        outputJSON.Result = "Event Created";
        outputJSON.sys_id = gr.sys_id;
        outputJSON.Created_On = gr.sys_created_on;
        response.setStatus(201);
    } else {
        outputJSON.Result = validate;
        response.setStatus(405);
    }
    response.setBody(outputJSON);

    function mandatoryValidation() {
        return true;
    }


})(request, response);