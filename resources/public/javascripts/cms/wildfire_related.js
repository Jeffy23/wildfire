jQuery(document).ready(function(){
  var related_delete_ajax = function(){
    var del_button = jQuery(this);
    jQuery.ajax({
      url: del_button.attr("href") + "?ajax=1",
      global: false,
      success: function(response){
        del_button.closest(".related_list").html(response).find(".delete_button a").click(related_delete_ajax);
				order_related_links();
      }
    });
    return false;
  }
  
  jQuery(".related_list .delete_button a").click(related_delete_ajax);
  
  jQuery(".add_related").click(function(){
    var add_button = jQuery(this);
    jQuery.ajax({
      url: add_button.attr("href"),
      data: add_button.closest(".related_holder").find("input").serialize() + "&ajax=1",
      type: "POST",
      global: false,
      success: function(response){
        add_button.closest(".related_holder").find(".related_list").html(response).find(".delete_button a").click(related_delete_ajax);
				add_button.closest(".related_holder").find("input.input_field").val("");
				order_related_links();
      }
    });
    return false;
  });
  
  jQuery(".related_holder input[name='cms_related[title]'], .related_holder input[name='cms_related[url]']").keyup(function() {
    var search_field = jQuery(this);
    if(typeof(t) != "undefined" ) clearTimeout(t);
    if(jQuery(this).attr("id") == "cms_related_url") jQuery("#cms_related_dest_model, #cms_related_dest_id").val("");
    if(search_field.val().length)
      t = setTimeout(function(){live_search(search_field.val());}, 400);
  });
  
  jQuery(".live_search_results").hover(function(){}, function(){
    s = setTimeout(live_search_close, 800);
  });
  
  var live_search = function(filter) {
    jQuery.ajax({type: "post", url: "/admin/home/search", data: "button_text=Link&input="+filter,
      complete: function(response){
        if(typeof(t) != "undefined" ) clearTimeout(t);
        jQuery(".related_holder .live_search_results").html(response.responseText).show().find("a").click(function(){
          var clicked_a = jQuery(this);
          jQuery("#cms_related_dest_model").val(clicked_a.attr("data-model"));
          jQuery("#cms_related_dest_id").val(clicked_a.attr("data-id"));
          jQuery("#cms_related_title").val(clicked_a.attr("data-title"));
          jQuery("#cms_related_url").val(clicked_a.attr("data-url"));
          live_search_close();
          return false;
        });
      }
    });
  }
  
  var live_search_close = function() {
    if(typeof(s) != "undefined" ) clearTimeout(s);
    jQuery(".live_search_results").empty();
    jQuery(".live_search_results").hide();
  }
  
  var order_related_links = function(){
    if(jQuery(".related_list").length){
      jQuery(".related_list #list_rows").sortable({items:"> tr",
      update: function(event, ui) {
        jQuery.post("/admin/related/sort/", {sort: [jQuery(event.target).sortable("serialize")], source_model: model_string, source_id: content_page_id});
      }
      });
    }
  };
  
  order_related_links();
  
});