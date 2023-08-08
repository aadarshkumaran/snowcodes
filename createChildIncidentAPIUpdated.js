(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
    //var ga = new GlideRecord('incident');
    //Create Child Incident using Scripted REST API
    //set relative path : /createChildIncident/{sysid} - HTTP method : POST
    //if I send CI create again, the Parent tt should return from Resolved to In Progress direclty
    //and if parent TT was already Closed, and if I send CI create again then SNOW should throw custom error 
    //saying "Parent TT is closed, No operation allowed on Parent/ Child"
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
			if(inc.state == 6){
				inc.state = 2;
				inc.update();
			}
			if(inc.state == 7){
				outputJSON.Result = "Parent Incident is closed, No operation allowed on Parent/ Child";
				response.setStatus(400);
				response.setBody(outputJSON);
				return;
			}
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