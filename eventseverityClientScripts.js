function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }
    //Type appropriate comment here, and begin script below
    var eventSeverity = g_form.getValue('u_event_severity');
    if (eventSeverity == '0') {
        g_form.setValue('impact', 3);
        g_form.setValue('urgency', 3);
        g_form.setDisabled('impact', 'true');
        g_form.setDisabled('urgency', 'true');
    } else
    if (eventSeverity == '1') {
        g_form.setValue('impact', 2);
        g_form.setValue('urgency', 3);
        g_form.setDisabled('impact', 'true');
        g_form.setDisabled('urgency', 'true');
    } else
    if (eventSeverity == '2') {
        g_form.setValue('impact', 2);
        g_form.setValue('urgency', 2);
        g_form.setDisabled('impact', 'true');
        g_form.setDisabled('urgency', 'true');
    } else
    if (eventSeverity == '3') {
        g_form.setValue('impact', 3);
        g_form.setValue('urgency', 2);
        g_form.setDisabled('impact', 'true');
        g_form.setDisabled('urgency', 'true');
    } else
    if (eventSeverity == '4') {
        g_form.setValue('impact', 2);
        g_form.setValue('urgency', 1);
        g_form.setDisabled('impact', 'true');
        g_form.setDisabled('urgency', 'true');
    } else
    if (eventSeverity == '5') {
        g_form.setValue('impact', 1);
        g_form.setValue('urgency', 1);
        g_form.setDisabled('impact', 'true');
        g_form.setDisabled('urgency', 'true');
    } else {
        g_form.setValue('impact', 3);
        g_form.setValue('urgency', 3);
        g_form.setDisabled('impact', 'false');
        g_form.setDisabled('urgency', 'false');
    }
}