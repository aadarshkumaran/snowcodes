(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
    //Create Child Incident using Scripted REST API
    //set relative path : /createChildIncident/{sysid} - HTTP method : POST
	//var ga = new GlideRecord('incident');
    var data = request.body.data;
	var pare =request.pathParams;
	var pa =pare.sysid;
	//gs.log('chari'+pa);
    var outputJSON = {};
    var validate = mandatoryChildValidation();
    if (validate == true) { 
		
        var gr = new GlideRecord('u_child');
        gr.initialize();
        gr.u_node = data.Node;
        gr.u_port = data.Port;
        gr.u_link_name = data.Link_Name;
		//var s = ga.get('number',pa);
        gr.u_reference_to_parent = pa;
        gr.insert();
        outputJSON.Result = "Child Incident Created";
        outputJSON.sys_id = gr.sys_id;
        outputJSON.Number = gr.number;
        response.setStatus(201);
    } else {
        outputJSON.Result = validate;
        response.setStatus(405);
    }
	response.setBody(outputJSON);
	
	function mandatoryChildValidation(){
		if(pa)
			return true;
		else
			return 'Parent Incident cannot be blank';
	}

})(request, response);