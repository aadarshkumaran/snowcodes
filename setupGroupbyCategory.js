function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
       return;
    }
 
    //Type appropriate comment here, and begin script below
    var operationCategory = g_form.getValue('u_operation_category_1');
     if(operationCategory == '1'){
         g_form.setValue('assignment_group','8a5055c9c61122780043563ef53438e3');
     }
     else{
         g_form.setValue('assignment_group','8a4dde73c6112278017a6a4baf547aa7');
     }
 }

 //client scripts