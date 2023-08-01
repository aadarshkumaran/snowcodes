(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    var upda = new GlideRecord('u_child');
    upda.addQuery('u_reference_to_parent', current.u_reference_to_parent);
    upda.addQuery('u_state', '!=', '1');
    upda.query();
    if (!upda.next()) {
        var gt = new GlideRecord('incident');
        gt.addQuery('sys_id', current.u_reference_to_parent);
        gt.query();
        if(gt.next()) {
			gt.state = '6';
		}
		gt.update();
    }

})(current, previous);

// business rule for child table (u_child) : 
// if all child incidents are resolved, the parent incident is resolved
// if any of the child is resolved , the parent incident should not get resolved.
