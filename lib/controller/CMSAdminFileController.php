<?php
/**
* Class giving an admin interface to manipulate files
* @package PHP-WAX CMS
*/

class CMSAdminFileController extends CMSAdminComponent {
	public $module_name = "files";												
  public $model;
	public $model_class="WildfireFile";
	public $display_name = "Files";
	public $scaffold_columns = array(
    "filename"   =>array(),
    "type" => array()
  );
	public $filter_columns = array("filename", "caption");
	public $order_by_columns = array("filename","type");
	public $allow_crops=false;

	
	public function controller_global(){
		parent::controller_global();
		$this->sub_links = array();
	}
	
	
	public function fs() {
	  $this->use_layout=false;
	  $this->use_view=false;
	  if(!$action = $_POST["relay"]) $action = $_GET["relay"];
	  $fs = new CmsFilesystem;
	  $fs->dispatch($action, array_merge($_GET, $_POST));
	}
	
	public function synchronise() {
	  if($_POST && $_POST['sync']=="go") {
	    $fs = new CmsFilesystem;
	    $scan = File::get_folders($fs->defaultFileStore.$fs->relativepath);
	    foreach($scan as $folder) {
	      $rel = str_replace($fs->defaultFileStore, "", $folder['path']);
	      $fs->databaseSync($folder['path'], $rel);
	    }
	    exit;
	  }
	}
	
	
	
	public function show_image() {
	  $options = WaxUrl::get_params();
	  $img_id = WaxUrl::get("id");
	  $img_size = $options["params"][0];
  	$this->use_view=false;
		$this->use_layout=false;
  	if(!$size = $img_size) $size=110;
	  $size = str_replace(".jpg", "", $size);
	  $size = str_replace(".gif", "", $size);
	  $size = str_replace(".png", "", $size);

  	$img = new WildfireFile($img_id);
		/* CHANGED - allows for relative paths in db */
    $source = PUBLIC_DIR. $img->rpath."/".$img->filename;    
    
		$file = CACHE_DIR.$img_id."_".$img_size;
		$source=preg_replace("/[\s]/", "\ ", $source);
		if(!File::is_image($source)){
			if(!is_file($file) || !is_readable($file)) {
				$icon_type = File::get_extension($img->filename);
				$icon = PLUGIN_DIR."cms/resources/public/images/cms/"."cms-generic-icon-".strtolower($icon_type).".gif";
				if(!is_readable($icon) || $icon_file !=file_get_contents($icon)) {
					$icon_file = PLUGIN_DIR."cms/resources/public/images/cms/"."cms-generic-icon.png";
					$source = CACHE_DIR."cms-generic-icon.gif";
				}
				else $source = CACHE_DIR."cms-generic-icon-{$icon_type}.gif";
				file_put_contents($source, $icon_file);
			}
		}
    if(!is_file($file) || !is_readable($file)) {
      File::resize_image($source, $file, $size);
    }
		if($this->image = File::display_image($file) ) {
			return true;
		} return false;
  }
	
	public function download_file() {
	  $this->use_layout=false;
	  $this->get_file = new $this->model_class(url("id"));
	  File::stream_file($this->get_file->path.$this->get_file->filename);
	}
	
	public function create() {
		$this->model = new $this->model_class;
		/* CHANGED - REMOVE PUBLIC AS THATS THE NEW BASE DIR */
		$this->model->file_base = "public/".$_POST['cms_file']['folder']."/";	
		$this->save($this->model);
	}
	
	public function edit() {
		$this->existing = true;
		parent::edit();
	}
	
	public function upload() {
   
	}
	public function quickupload() {
    $this->use_layout=false;
    $this->use_view="upload";
	}
	
	
	public function browse_images() {
		$this->use_layout=false;
	  $model = new WildfireFile;
	  $fs = new CmsFilesystem;
	  $folder = $fs->relativePath;
		if(!$folder) $folder ="files";
	  $this->all_images = $model->filter(array("rpath"=>$folder))->order("filename ASC")->all();
  	if($_POST['filterfolder']) {
  	  $this->all_images = $model->clear()->filter(array("rpath"=>$_POST['filterfolder']))->order("filename ASC")->all();
  	}
    $this->all_images_partial = $this->render_partial("list_all_images");  
	}
	
	public function image_filter() {
	  if(strlen($_POST['filter'])<1) {
	    $this->route_array[0] = "1";
	    $this->browse_images();
	  } else {
      $this->use_layout=false;
      $this->all_images = ($image = new WildfireFile) ? $image->find_filter_images($_POST['filter'], "30"): array();
      $this->all_images_partial = $this->render_partial("list_all_images");
    }
  }
  
  public function preview() {
    $this->image = new $this->model_class(url('id'));
  }
  
  public function port_ids() {
    $file = new CmsFile;
    $files = $file->find_all();
    foreach($files as $file) {
      $new = new WildfireFile;
      $s_path = rtrim(str_replace("public/files/", "", $file->path), "/" );
      $new_file = $new->filter("filename = '{$file->filename}' AND rpath LIKE '%{$s_path}%'" )->first();
      if($new_file->id)  {
        $new_file->oldid = $file->id;
        $new_file->description = $file->caption;
        $new_file->save();
      }
    }
    exit;
  }
  
   
  
  public function port_content() {
    $content = new CmsContent;
    $articles = $content->find_all(array("order"=>"id ASC"));
    $new = new WildfireFile;
    foreach($articles as $article) {
      $oldimgs = $new->sql("SELECT * FROM cms_content_cms_file WHERE cms_content_id = $article->id")->all();
   	  foreach($oldimgs as $img) {
   	    $newimg = $new->clear()->filter("oldid=".$img->cms_file_id)->first();
   	    $newfile = new WildfireFile($newimg->id);
   	    if($newfile->id) $article->images = $newfile;
   	  }
    }

  }

	/**
	* Save
	* @param string $model 
	* @return boolean or redirect on success, sets message on success
	*/
	protected function save($model, $redirect_to=false, $success = "Successfully Saved") {
		if( $model->is_posted() ) {
		  $id = $model->id;
			if(!$model->author_id && !$_POST[$this->model_name]['author_id']) $model->author_id = $this->current_user->id;			
			if($model->update_attributes($_POST[$this->model_name]) ) {
				//clear cache - rely on filename format of $id_
				foreach(File::scandir(CACHE_DIR) as $file){
					if(($pos = strpos($file, $model->id.'_')) == 0 && $pos !== false) unlink(CACHE_DIR.$file);
				}
			  if($redirect_to =="edit") $redirect_to = "edit/".$id;
			  elseif($this->allow_crops) $redirect_to="crop/".$id;
			  elseif(!$redirect_to) $redirect_to="index";
      	Session::add_message($this->display_name." ".$success);
      	$this->redirect_to($redirect_to);
			}
    }
 		return false;
	}
	

}
?>