(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
    //Creating incident using Scripted REST API
    //set relative path : /createIncident - HTTP method : POST
    var data = request.body.data;
    var outputJSON = {};
    var validate = mandatoryValidation();
    if (validate == true) {
        var gr = new GlideRecord('incident');
        gr.initialize();
        gr.u_user = data.U_User;
        gr.short_description = data.Short_Description;
        gr.description = data.Description;
        gr.u_operation_category_1 = data.Operation_Category_1;
        gr.u_operation_category_2 = data.Operation_Category_2;
        gr.u_operation_category_3 = data.Operation_Category_3;
        gr.u_event_time = data.Event_Time;
        gr.u_event_severity = data.Event_Severity;
        gr.u_site_name = data.Site_Name;
        gr.assignment_group = data.Department;
        gr.u_data_serial = data.Data_Serial;
        gr.u_data_server = data.Data_Server;
        gr.insert();
        outputJSON.Result = "Incident Created";
        outputJSON.sys_id = gr.sys_id;
        outputJSON.Number = gr.number;
        response.setStatus(201);
    } else {
        outputJSON.Result = validate;
        response.setStatus(405);
    }
    response.setBody(outputJSON);

    function mandatoryValidation() {
        if (data.U_User) {
            if (data.Short_Description)
                return true;
            else 
                return 'Short Description cannot be blank';
        } else {
            return 'User cannot be blank';
        }
    }


})(request, response);