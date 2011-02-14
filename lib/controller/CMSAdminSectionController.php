<?php

class CMSAdminSectionController extends AdminComponent {

  public $module_name = "sections";												
  public $model_class = 'CmsSection';
	public $model_name = "cms_section";													
	public $display_name = "Site Sections";
	public $scaffold_columns = array(
    "title"   =>array("link"=>"edit"),
		"url" =>  array()
  );
  public $filter_columns = array("title");
	public $order_by_columns = array("title","url");
	public $allowed_default_page = false;
	public static $permissions = array("create","edit","delete");
	/**
	* create the tree structure used for the drop down section selection
	**/
	public function controller_global() {
	  $this->model = $this->current_user->allowed_sections_model;
	}

	/**
	 * index page - list of all sections
	 */	
	public function index() {
		Session::set("list_refer".$this->module_name, $_SERVER['REQUEST_URI']);
		$this->set_order();
		$this->display_action_name = 'List Items';
		$this->all_rows = $this->model->tree();
		if(!$this->all_rows) $this->all_rows = array();
	}

  
  public function form() {
    $this->use_view="form";
    $model = $this->current_user->allowed_sections_model;
    $this->possible_parents = array("None");
		foreach($model->tree() as $section){ //all sections
			$tmp = str_pad("", $section->get_level(), "*", STR_PAD_LEFT);
			$tmp = str_replace("*", "&nbsp;&nbsp;", $tmp);
			$this->possible_parents[$section->id] = $tmp.$section->title;
		}
    $this->form = new WaxForm($this->model);
		if($_POST['cancel']) $this->redirect_to(Session::get("list_refer"));
		elseif($res = $this->form->save()) {
		  Session::add_message($this->display_name." Successfully Saved");
		  if(Session::get("list_refer")) $this->redirect_to(Session::get("list_refer"));
		  else $this->redirect_to("/admin/".$this->module_name."/");
		}
  }

	/**
	 * ajax filter function - takes the incoming string, matches against columns 
	 * and outputs view of the matching data
	 */	
	public function filters() {
	  $this->use_layout = false;
	  $sect = new $this->model_class;
	  if($filter = Request::param('filter')) $sect->filter("title",'%'.$filter.'%', "LIKE");
  	$this->all_sections = $sect->tree();
  	$this->use_view = "_section_list";
	}

}

?>