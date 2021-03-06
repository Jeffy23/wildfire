/* JS Table initialisation for index.html */
jQuery(document).ready(function() {
  if(jQuery("#item_list_container") && jQuery.isFunction(jQuery.tablesorter)) {
    jQuery("#item_list_container").tablesorter({dateFormat: 'dd/mm/yyyy', highlightClass: 'highlight_col',
      stripingRowClass: ['item_row1','item_row0'],stripeRowsOnStartUp: true});
  }
  if(jQuery(".form_datepicker")) jQuery(".form_datepicker").datepicker({changeMonth: true, changeYear: true, dateFormat: 'dd-MM-yy'});
  jQuery("input.disable_enter").bind("keypress", function(e) {
    return e.keyCode == 13 ? false : true;
  });
  jQuery("#item_list_container .list_button a").live("click", function(){jQuery(this).parent().next().toggle();return false;});
  
});


jQuery(document).ready(function() {
	inline_status_change();	
});




function inline_status_change(){
	if(jQuery('.status_change')){	
		jQuery('.status_change').live("click", function(){
		  if(!confirm("Are you sure you want to change the publish status?")) return false;
			current_status = jQuery(this).attr('rel');
			dest = jQuery(this).attr('href');
			dest = dest.replace('?status=0', '').replace('?status=1', '');
			replace = "#"+this.id;
			jQuery.get(dest, {status: current_status, ajax:'yes'}, function(response){				
				jQuery(replace).replaceWith(response);
			});
			return false;
		});
	}
}


jQuery.fn.centerScreen = function(loaded) { 
  var obj = this; 
  if(!loaded) { 
    obj.css('top', jQuery(window).height()/2-this.height()/2); 
    obj.css('left', jQuery(window).width()/2-this.width()/2); 
    jQuery(window).resize(function() { obj.centerScreen(!loaded); }); 
  } else { 
    obj.stop(); 
    obj.animate({ 
      top: jQuery(window).height()/2-this.height()/2, 
      left: jQuery(window).width()/2-this.width()/2}, 200, 'linear'); 
  } 
};


/**** Toggles for User Permissions *******/
jQuery(document).ready(function() {
  jQuery(".group_permission_check .group_toggle").change(function(){
    if($(this).is(":checked")) $(this).parent().find(".permission_check input").attr("checked", true);
    else $(this).parent().find(".permission_check input").removeAttr("checked");
  });
  
  
});

jQuery(document).ready(function(){
  var left_col = jQuery("#header-container");
  var orig_height = left_col.outerHeight() + 90; //90 since somehow it doesn't register even though this is after a .ready, don't ask me.
	jQuery(window).resize(function(){
    var new_height = jQuery(window).height();
    if(new_height < orig_height) new_height = orig_height;
    left_col.css("height", new_height);
  });
  jQuery(window).trigger("resize");
});
