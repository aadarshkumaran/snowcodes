(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
    // Scripted REST APIs
    //set relative path : /editChildIncident/{sysid} - HTTP method : PUT
    var data = request.body.data;
    var pare = request.pathParams;
    var pa = pare.sysid;
    var num = pare.sysid;
    var outputJSON = {};
    var validate = mandatoryChildValidation();
    if (validate == true) {
        var gr = new GlideRecord('u_child');
        gr.addQuery('sys_id', num);
        gr.query();

        if (gr.next()) {
            gr.resolved_at = data.ResolvedAt;
            gr.close_code = data.CloseCode;
            gr.resolved_by = data.ResolvedBy;
            gr.close_notes = data.CloseNotes;
            gr.update();
            outputJSON.Result = "Child Incident Cleared Successfully!";
            outputJSON.sys_id = gr.sys_id;
            outputJSON.Number = gr.number;
            response.setStatus(200);
        }
    } else {
        outputJSON.Result = validate;
        response.setStatus(405);
    }
    response.setBody(outputJSON);

    function mandatoryChildValidation() {
        if (data.ResolvedAt)
            return true;
        else
            return 'Child Incident Unable To Clear!';
    }

})(request, response);