(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
    // Scripted REST APIs
    //set relative path : /createChildIncident/{number} - HTTP method : POST
    
    //var ga = new GlideRecord('incident');
    var data = request.body.data;
    var pare = request.pathParams;
	
    var pa = pare.number;
    //gs.log('chari'+pa);
    var outputJSON = {};
    var validate = mandatoryChildValidation();
    if (validate == true) {
        var inc = new GlideRecord('incident');
         inc.get('number', pa);
		var sys =inc.sys_id;
		//gs.log('sysid chari'+ sys);
        inc.query();
		//gs.log('sysid chari'+sys);
        if (inc.next()) {
            var gr = new GlideRecord('u_child');
            gr.initialize();
            gr.u_node = data.Node;
            gr.u_port = data.Port;
            gr.u_link_name = data.Link_Name;
            //var s = ga.get('number',pa);
            
            gr.u_reference_to_parent = sys;
			//gs.log('nun'+nim);
             gr.insert();
			//var sys =gr.sys_id;
			//gs.log('sysid'+sys);
            outputJSON.Result = "Child Incident Created";
            outputJSON.sys_id = gr.sys_id;
            outputJSON.Number = gr.number;
            response.setStatus(201);
        }
    } else {
        outputJSON.Result = validate;
        response.setStatus(405);
    }
    response.setBody(outputJSON);

    function mandatoryChildValidation() {
        if (pa)
            return true;
        else
            return 'Parent Incident cannot be blank';
    }

})(request, response);