<?php
/**
* CMSAdminPageController - version controlled
* @package wxFramework
* @subpackage CMSPlugin
* @author WebXpress <john@webxpress.com>
* @version 1.0
*/

class CMSAdminPageController extends CMSAdminComponent{
	public $model_class = 'CmsPage';
	public $model_name = "cms_page";													
	public $display_name = "Pages";
	public $is_allowed = array('url'=>30,'published'=>30);
	public $scaffold_columns = array(
    "title"   =>array(),
    "page_status" => array()
  );
  public $filter_columns = array("title");
  

	public function image_browser() {
		$this->use_layout=false;
		$this->images = ($image = new CmsFile) ? $image->find_all_images() : array();
	}
	
}
?>